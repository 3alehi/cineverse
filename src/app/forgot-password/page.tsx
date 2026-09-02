import type { Metadata } from "next";
import { AuthCard } from "@/features/authentication/components/auth-card";
import { ForgotPasswordForm } from "@/features/authentication/components/forgot-password-form";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      footer={{ text: "Remembered it?", linkLabel: "Back to sign in", href: "/login" }}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
