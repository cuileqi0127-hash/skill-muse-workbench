import { useAuth } from "@/contexts/AuthContext";
import { LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "@/components/LoginModal";

export function UserBadge() {
  const { isLoggedIn, username, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-3 z-50 flex items-center gap-2.5" style={{ right: "calc(18rem + 1.5rem)" }}>
        {isLoggedIn ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition-colors">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Logged In
            </span>
            <span className="text-sm text-muted-foreground">{username}</span>
            <button
              onClick={logout}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
        )}
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
