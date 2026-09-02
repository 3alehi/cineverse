import { readStorage, writeStorage } from "@/lib/storage";
import type { User } from "@/types/app";

interface StoredAccount {
  user: User;
  passwordHash: string;
}

const ACCOUNTS_KEY = "cineverse-accounts";
const SESSION_KEY = "cineverse-session";

/**
 * Client-only demo auth. This is NOT real security — passwords are hashed
 * with a trivial digest purely to avoid storing plaintext in localStorage,
 * not to resist attack. It exists so the auth UI has something real to
 * drive, and can be swapped for a real backend later without touching
 * components (see AuthProvider, which is the only consumer of this module).
 */
async function hash(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getAccounts(): StoredAccount[] {
  return readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
}

function saveAccounts(accounts: StoredAccount[]): void {
  writeStorage(ACCOUNTS_KEY, accounts);
}

export async function registerAccount(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const accounts = getAccounts();
  if (accounts.some((a) => a.user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  };
  const passwordHash = await hash(password);
  saveAccounts([...accounts, { user, passwordHash }]);
  writeStorage(SESSION_KEY, user.id);
  return user;
}

export async function loginAccount(email: string, password: string): Promise<User> {
  const accounts = getAccounts();
  const account = accounts.find(
    (a) => a.user.email.toLowerCase() === email.toLowerCase()
  );
  if (!account) throw new Error("No account found with this email.");
  const passwordHash = await hash(password);
  if (passwordHash !== account.passwordHash) {
    throw new Error("Incorrect password.");
  }
  writeStorage(SESSION_KEY, account.user.id);
  return account.user;
}

export function logoutAccount(): void {
  writeStorage(SESSION_KEY, null);
}

export function getSessionUser(): User | null {
  const sessionId = readStorage<string | null>(SESSION_KEY, null);
  if (!sessionId) return null;
  const account = getAccounts().find((a) => a.user.id === sessionId);
  return account?.user ?? null;
}

export async function requestPasswordReset(email: string): Promise<void> {
  const accounts = getAccounts();
  if (!accounts.some((a) => a.user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("No account found with this email.");
  }
}

export async function resetPassword(email: string, newPassword: string): Promise<void> {
  const accounts = getAccounts();
  const index = accounts.findIndex(
    (a) => a.user.email.toLowerCase() === email.toLowerCase()
  );
  if (index === -1) throw new Error("No account found with this email.");
  accounts[index] = {
    ...accounts[index],
    passwordHash: await hash(newPassword),
  };
  saveAccounts(accounts);
}
