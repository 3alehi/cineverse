"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../providers/auth-provider";
import { validateEmail } from "../lib/validation";
import { useToast } from "@/components/feedback/toast-provider";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
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
    const passwordError = password ? undefined : "Password is required.";
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast("Welcome back!");
      router.push("/profile");
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

      <FormField label="Password" error={errors.password}>
        {(id, describedBy) => (
          <PasswordInput
            id={id}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </FormField>

      <div className="flex justify-end">
        <a href="/forgot-password" className="text-xs font-medium text-accent hover:text-accent-hover">
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Sign In
      </Button>
    </form>
  );
}
