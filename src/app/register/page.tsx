import type { Metadata } from "next";
import { AuthCard } from "@/features/authentication/components/auth-card";
import { RegisterForm } from "@/features/authentication/components/register-form";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Track, save, and discover what to watch next"
      footer={{ text: "Already have an account?", linkLabel: "Sign in", href: "/login" }}
    >
      <RegisterForm />
    </AuthCard>
  );
}
