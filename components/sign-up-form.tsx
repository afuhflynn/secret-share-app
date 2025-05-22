"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/ui/loading";
import { devLog } from "@/utils/devLog";
import { localStorageKey } from "@/lib/constants";
import {
  getStrengthPercent,
  rules,
  validatePassword,
} from "@/lib/password-validate";

// ------ SignUpForm Component ------
export const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { error, setError, setMessage, message, signUp, loading } =
    useUserStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [setMessage, setError]);

  // derive validation results and strength
  const pwdResults = useMemo(
    () => validatePassword(formData.password),
    [formData.password]
  );
  const strength = useMemo(() => getStrengthPercent(pwdResults), [pwdResults]);
  const passwordsMatch = formData.password === formData.confirmPassword;
  const allGood = strength === 100 && passwordsMatch;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }
    if (strength < 100) {
      setError("Password is not strong enough");
      return;
    }
    setIsSubmitted(false);
    try {
      signUp(formData);
      setIsSubmitted(true);
    } catch (err) {
      devLog(err);
    }
  }

  useEffect(() => {
    if (message && error === null && isSubmitted) {
      toast({
        title: "Account created",
        description: "Welcome to SecretShare!",
      });
      localStorage.setItem(localStorageKey, JSON.stringify(formData.email));
      router.push("/auth/verify-email");
    } else if (error && isSubmitted) {
      toast({
        title: "Error creating account",
        description: error,
        variant: "destructive",
      });
    }
  }, [message, error, isSubmitted, formData.email, router]);

  const handleInputChange = (name: string, value: string) =>
    setFormData({ ...formData, [name]: value });

  return (
    <form onSubmit={onSubmit}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 flex items-center"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!allGood && formData.password.trim() !== "" && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded h-1 mt-4 mb-2 overflow-hidden">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${strength}%`,
                      backgroundColor: strength >= 80 ? "#10b981" : "#f59e0b",
                    }}
                  />
                </div>
                <ul className="space-y-1 text-sm">
                  {rules.map((rule) => {
                    const ok = pwdResults[rule.key];
                    return (
                      <li key={rule.key} className="flex items-center">
                        {ok ? (
                          <CheckCircle
                            className="text-green-500 mr-1"
                            size={16}
                          />
                        ) : (
                          <XCircle className="text-red-500 mr-1" size={16} />
                        )}
                        <span
                          className={ok ? "text-green-600" : "text-red-600"}
                        >
                          {rule.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              required
              className="pr-10"
            />
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
              <p className="text-sm text-red-600 mt-2">
                Passwords do not match
              </p>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader /> : "Create account"}
        </Button>
      </CardFooter>
    </form>
  );
};
