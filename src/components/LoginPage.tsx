import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("请输入用户名");
      return;
    }
    if (!password.trim()) {
      setError("请输入密码");
      return;
    }
    const ok = login(username, password);
    if (!ok) setError("登录失败，请重试");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-[0_4px_24px_-6px_hsl(var(--foreground)/0.1)]">
        <h1 className="text-2xl font-bold text-foreground">登录到 Skill Workbench</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">认证状态：未登录</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="请输入用户名"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="请输入密码"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            登录
          </button>

          <p className="text-center text-xs text-muted-foreground">
            说明：本轮为前端 UI 演示，未调用真实后端接口。
          </p>
        </form>
      </div>
    </div>
  );
}
