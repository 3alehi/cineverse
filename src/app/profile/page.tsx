import type { Metadata } from "next";
import { ProfileContent } from "@/features/profile/components/profile-content";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your CineVerse profile and viewing statistics.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
      <ProfileContent />
    </div>
  );
}
