"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { validateEmail, validatePassword } from "../lib/validation";
import { resetPassword } from "../lib/auth-storage";
import { useToast } from "@/components/feedback/toast-provider";

export function ResetPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setIsSubmitting(true);
    try {
      await resetPassword(email, password);
      showToast("Password updated — sign in with your new password.");
      router.push("/login");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <p role="alert" className="rounded-md bg-error/10 px-3.5 py-2.5 text-sm text-error">
          {formError}
        </p>
      )}

      <FormField label="Email" error={errors.email}>
        {(id, describedBy) => (
          <Input
            id={id}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </FormField>

      <FormField label="New Password" error={errors.password}>
        {(id, describedBy) => (
          <PasswordInput
            id={id}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </FormField>

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Reset Password
      </Button>
    </form>
  );
}
