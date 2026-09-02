"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail } from "../lib/validation";
import { requestPasswordReset } from "../lib/auth-storage";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailError = validateEmail(email);
    setError(emailError);
    if (emailError) return;

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        <p className="text-sm text-foreground">
          If an account exists for <strong>{email}</strong>, a reset link has been sent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && (
        <p role="alert" className="rounded-md bg-error/10 px-3.5 py-2.5 text-sm text-error">
          {formError}
        </p>
      )}

      <p className="text-sm text-muted-foreground">
        Enter the email associated with your account and we&apos;ll send a link to reset your password.
      </p>

      <FormField label="Email" error={error}>
        {(id, describedBy) => (
          <Input
            id={id}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            aria-describedby={describedBy}
            disabled={isSubmitting}
          />
        )}
      </FormField>

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Send Reset Link
      </Button>
    </form>
  );
}
