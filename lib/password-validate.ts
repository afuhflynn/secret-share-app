// ------ Password validation helpers ------
export const rules = [
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
