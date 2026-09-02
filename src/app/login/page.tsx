import type { Metadata } from "next";
import { AuthCard } from "@/features/authentication/components/auth-card";
import { LoginForm } from "@/features/authentication/components/login-form";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to CineVerse"
      footer={{ text: "Don't have an account?", linkLabel: "Create one", href: "/register" }}
    >
      <LoginForm />
    </AuthCard>
  );
}
