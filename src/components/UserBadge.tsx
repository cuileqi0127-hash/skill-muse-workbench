import { useAuth } from "@/contexts/AuthContext";
import { LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";

export function UserBadge() {
  const { isLoggedIn, username, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <div className="fixed right-0 top-0 z-50 flex w-72 items-center justify-end gap-2.5 border-b border-border bg-background px-4 py-2">
        {isLoggedIn ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Logged In
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-[80px]">{username}</span>
            <button
              onClick={logout}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <LogIn className="h-3.5 w-3.5" />
            Login
          </button>
        )}
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
