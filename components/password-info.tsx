import { useEffect, useMemo, useState } from "react";
import { User as AuthUser } from "@prisma/client";
import { useUserStore } from "@/store/user.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import { devLog } from "@/utils/devLog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { privateAxios } from "@/utils/axios.config";
import { toast } from "@/hooks/use-toast";
import {
  getStrengthPercent,
  rules,
  validatePassword,
} from "@/lib/password-validate";

export const PasswordInfo = () => {
  const { setUser } = useUserStore();
  const [securityFormData, setSecurityFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);

  // derive newPassword strength
  const pwdResults = useMemo(
    () => validatePassword(securityFormData.newPassword),
    [securityFormData.newPassword]
  );
  const strength = useMemo(() => getStrengthPercent(pwdResults), [pwdResults]);
  const passwordsMatch =
    securityFormData.newPassword === securityFormData.confirmPassword;
  const allGood = strength === 100 && passwordsMatch;

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdatingPassword(true);
    setIsSubmitted(false);
    setMessage(null);
    setError(null);
    if (!passwordsMatch) {
      setError("Passwords do not match");
      setIsUpdatingPassword(false);
      return;
    }
    if (strength < 100) {
      setError("New password is not strong enough");
      setIsUpdatingPassword(false);
      return;
    }
    try {
      const res = await privateAxios.put<{ user: AuthUser; message: string }>(
        "/api/v1/user/update-password",
        {
          currentPassword: securityFormData.currentPassword,
          password: securityFormData.newPassword,
        }
      );
      setUser(res.data.user);
      setMessage(res.data.message);
      setIsSubmitted(true);
    } catch (err: Error | any) {
      if (err.response.data) {
        setError(err.response.data.message || "Unexpected error");
      } else {
        setError(err.message || "Unexpected error");
      }
      devLog(err);
      setIsSubmitted(true);
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  useEffect(() => {
    if (message && !error && isSubmitted) {
      toast({ title: "Success", description: message });
    }
    if (!message && error && isSubmitted) {
      toast({
        title: "Error updating password",
        description: error,
        variant: "destructive",
      });
    }
  }, [message, error, isSubmitted]);

  const handleSecurityChange = (name: string, value: string) =>
    setSecurityFormData({ ...securityFormData, [name]: value });

  return (
    <Card id="password">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password.</CardDescription>
      </CardHeader>
      <form onSubmit={handleUpdatePassword}>
        <CardContent className="space-y-2 flex flex-col">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={securityFormData.currentPassword}
              onChange={(e) =>
                handleSecurityChange(e.target.id, e.target.value)
              }
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute inset-y-0 right-2"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={securityFormData.newPassword}
              onChange={(e) =>
                handleSecurityChange(e.target.id, e.target.value)
              }
              required
              className={`pr-10 ${
                securityFormData.newPassword.length > 0 ? "mb-3" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute inset-y-0 right-2"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {!allGood && (
            <>
              {securityFormData.newPassword.length > 0 && (
                <div className="w-full bg-gray-200 h-1 rounded mt-2 overflow-hidden">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${strength}%`,
                      backgroundColor: strength >= 80 ? "#10b981" : "#f59e0b",
                    }}
                  />
                </div>
              )}
              {securityFormData.newPassword.length > 0 && (
                <ul className="my-2 space-y-1 text-sm mb-4">
                  {rules.map((item) => {
                    const ok = pwdResults[item.key];
                    return (
                      <li key={item.key} className="flex items-center">
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
                          {item.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}

          <Label htmlFor="confirmPassword" className="pt-4">
            Confirm New Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={securityFormData.confirmPassword}
            onChange={(e) => handleSecurityChange(e.target.id, e.target.value)}
            required
            className="pr-10"
          />
          {!passwordsMatch && securityFormData.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
          )}
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isUpdatingPassword}>
            {isUpdatingPassword ? "Changing..." : "Change Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
