import { useState } from "react";
import { Search, Folder, FileText, FolderPlus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockFiles } from "@/data/skills";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, LogIn } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";

interface FileItem {
  name: string;
  type: "folder" | "file";
  modified: string;
}

interface FilesPanelProps {
  onOpenFile?: (file: FileItem) => void;
}

export function FilesPanel({ onOpenFile }: FilesPanelProps) {
  const { isLoggedIn, username, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      setFiles(prev => [
        { name: newFolderName.trim(), type: "folder", modified: "Just now" },
        ...prev,
      ]);
    }
    setNewFolderName("");
    setCreatingFolder(false);
  };

  return (
    <>
      <div className="flex h-full w-72 flex-col border-l border-border/50 bg-background">
        {/* Login header */}
        <div className="flex h-14 shrink-0 items-center justify-end gap-2 border-b border-border/40 px-4">
          {isLoggedIn ? (
            <>
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground truncate max-w-[90px]">{username}</span>
              <button
                onClick={logout}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </button>
          )}
        </div>

        {/* Files title + new folder */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Files</h2>
          <button
            onClick={() => setCreatingFolder(true)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="New folder"
          >
            <FolderPlus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 rounded-md bg-muted/40 px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* New folder input */}
        {creatingFolder && (
          <div className="px-3 pb-2">
            <input
              autoFocus
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFolder();
                if (e.key === "Escape") setCreatingFolder(false);
              }}
              onBlur={handleCreateFolder}
              className="w-full rounded-md border border-border bg-muted/60 px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        )}

        {/* Divider */}
        <div className="mx-4 border-t border-border/30" />

        {/* File list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin py-1">
          {filtered.map((file) => {
            const isSelected = selectedFile === file.name;
            return (
              <div
                key={file.name}
                className={`group flex h-11 w-full items-center gap-2.5 px-4 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-muted/30"
                    : "hover:bg-muted/20"
                }`}
                onClick={() => {
                  setSelectedFile(file.name);
                  if (file.type === "file") onOpenFile?.(file);
                }}
              >
                {file.type === "folder" ? (
                  <Folder className="h-4 w-4 shrink-0 text-primary/70" />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className="flex-1 truncate text-xs text-foreground">{file.name}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{file.modified}</span>
                {file.type === "file" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: "Downloading...", description: file.name });
                      setTimeout(() => {
                        const blob = new Blob([""], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = file.name;
                        a.click();
                        URL.revokeObjectURL(url);
                        toast({ title: "Download complete", description: file.name });
                      }, 800);
                    }}
                    className="hidden group-hover:flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    title="Download"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-xs text-muted-foreground">No files found</p>
          )}
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
