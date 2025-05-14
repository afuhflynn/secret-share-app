"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/ui/loading";
import { devLog } from "@/utils/devLog";
import { BackButton } from "@/components/back-button";
import Logo from "@/components/logo";

// ------ Password validation helpers ------
const rules = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (pw: string) => pw.length >= 8,
  },
  {
    key: "upper",
    label: "One uppercase letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    key: "lower",
    label: "One lowercase letter",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  { key: "number", label: "One number", test: (pw: string) => /\d/.test(pw) },
  {
    key: "symbol",
    label: "One special character (!@#$%^&*)",
    test: (pw: string) => /[!@#\$%\^&\*]/.test(pw),
  },
];

export function validatePassword(pw: string) {
  return rules.reduce((acc, rule) => {
    acc[rule.key] = rule.test(pw);
    return acc;
  }, {} as Record<string, boolean>);
}

export function getStrengthPercent(results: Record<string, boolean>) {
  const passed = Object.values(results).filter(Boolean).length;
  return Math.floor((passed / rules.length) * 100);
}

// ------ SignUpForm Component ------
export const SignUpForm = () => {
  const router = useRouter();
  const { signUp, loading, error, setError, setMessage, message } =
    useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [setError, setMessage]);

  const pwdResults = useMemo(
    () => validatePassword(formData.password),
    [formData.password]
  );
  const strength = useMemo(() => getStrengthPercent(pwdResults), [pwdResults]);
  const passwordsMatch = formData.password === formData.confirmPassword;
  const allGood = strength === 100 && passwordsMatch;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) return setError("Name is required");
    if (!formData.email.trim()) return setError("Email is required");
    if (!passwordsMatch) return setError("Passwords do not match");
    if (strength < 100) return setError("Password is not strong enough");
    setIsSubmitted(false);
    try {
      await signUp(formData);
      setIsSubmitted(true);
    } catch (err) {
      devLog(err);
    }
  }

  useEffect(() => {
    if (message && !error && isSubmitted) {
      toast({
        title: "Account created",
        description: "Welcome to SecretShare!",
      });
      router.push("/auth/verify-email");
    } else if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [message, error, isSubmitted, router]);

  const handleInputChange = (key: string, val: string) =>
    setFormData({ ...formData, [key]: val });

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        {/* Name & Email fields... */}
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        <Label htmlFor="email" className="mt-4">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />

        {/* Password Field + Strength */}
        <Label htmlFor="password" className="mt-4">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!allGood && (
          <>
            <div className="w-full bg-gray-200 h-2 rounded mt-2 overflow-hidden">
              <div
                className="h-2 rounded"
                style={{
                  width: `${strength}%`,
                  backgroundColor: strength >= 80 ? "#10b981" : "#f59e0b",
                }}
              />
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {rules.map((r) => {
                const ok = pwdResults[r.key];
                return (
                  <li key={r.key} className="flex items-center">
                    {ok ? (
                      <CheckCircle size={14} className="text-green-500 mr-1" />
                    ) : (
                      <XCircle size={14} className="text-red-500 mr-1" />
                    )}
                    <span className={ok ? "text-green-600" : "text-red-600"}>
                      {r.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {/* Confirm Password */}
        <Label htmlFor="confirmPassword" className="mt-4">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute inset-y-0 right-2"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!passwordsMatch && formData.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
        )}
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Sign Up"}
        </Button>
      </CardFooter>
    </form>
  );
};

// ------ ResetPasswordPage Component ------
export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  const { resetPassword, loading, error, message, setError, setMessage } =
    useUserStore();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [setError, setMessage]);

  const pwdResults = useMemo(
    () => validatePassword(formData.password),
    [formData.password]
  );
  const strength = useMemo(() => getStrengthPercent(pwdResults), [pwdResults]);
  const passwordsMatch = formData.password === formData.confirmPassword;
  const allGood = strength === 100 && passwordsMatch;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!passwordsMatch) return setError("Passwords do not match");
    if (strength < 100) return setError("Password is not strong enough");
    setIsSubmitted(false);
    try {
      resetPassword(formData.password, token as string);
      setIsSubmitted(true);
    } catch (err) {
      devLog(err);
    }
  }

  useEffect(() => {
    if (message && !error && isSubmitted) {
      toast({
        title: "Password Reset",
        description: "Your password has been updated.",
      });
      router.push("/auth/log-in");
    } else if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [message, error, isSubmitted, router]);

  const handleInputChange = (k: string, v: string) =>
    setFormData({ ...formData, [k]: v });

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <BackButton />

      <div className="flex flex-col space-y-2 text-center mb-3">
        <Logo hideText />
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password!
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the fields below to create a new unique password.
        </p>
      </div>
      <Card className="pt-5">
        <CardContent>
          <form onSubmit={onSubmit}>
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {!allGood && (
              <>
                <div className="w-full bg-gray-200 h-1 mt-4 rounded overflow-hidden">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${strength}%`,
                      backgroundColor: strength >= 80 ? "#10b981" : "#f59e0b",
                    }}
                  />
                </div>
                <ul className="mt-2 space-y-1 text-sm mb-3">
                  {rules.map((r) => {
                    const ok = pwdResults[r.key];
                    return (
                      <li key={r.key} className="flex items-center">
                        {ok ? (
                          <CheckCircle
                            size={14}
                            className="text-green-500 mr-1"
                          />
                        ) : (
                          <XCircle size={14} className="text-red-500 mr-1" />
                        )}
                        <span
                          className={ok ? "text-green-600" : "text-red-600"}
                        >
                          {r.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <Label htmlFor="confirmPassword" className="mt-4">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              required
              className="pr-10"
            />
            {!passwordsMatch && formData.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                Passwords do not match
              </p>
            )}
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? <Loader /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
