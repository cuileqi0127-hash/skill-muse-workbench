import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

export function UserBadge() {
  const { isLoggedIn, username, logout } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <div className="fixed right-4 top-4 z-40 flex items-center gap-2.5">
      <span className="inline-flex items-center gap-2 rounded-full border border-chip-active-border bg-chip-active px-4 py-1.5 text-sm font-medium text-chip-active-foreground">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        已登录
      </span>
      <span className="text-sm text-muted-foreground">{username}</span>
      <button
        onClick={logout}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="退出登录"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
