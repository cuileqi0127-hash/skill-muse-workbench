import { useState } from "react";
import { Search, Folder, FileText, ChevronRight, FolderPlus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockFiles } from "@/data/skills";

interface FileItem {
  name: string;
  type: "folder" | "file";
  modified: string;
}

interface FilesPanelProps {
  onOpenFile?: (file: FileItem) => void;
}

export function FilesPanel({ onOpenFile }: FilesPanelProps) {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

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
    <div className="flex h-full w-72 flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Files</h2>
        <button
          onClick={() => setCreatingFolder(true)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="New folder"
        >
          <FolderPlus className="h-4 w-4" />
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-border/60 px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
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
        <div className="border-b border-border/60 px-3 py-2">
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
            className="w-full rounded-lg border border-primary/30 bg-muted px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}

      {/* File list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map((file) => (
          <div
            key={file.name}
            className="group flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
          >
            <button
              onClick={() => file.type === "file" && onOpenFile?.(file)}
              className="flex flex-1 items-center gap-2.5 min-w-0"
            >
              {file.type === "folder" ? (
                <Folder className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className="flex-1 truncate text-xs text-foreground">{file.name}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">{file.modified}</span>
            </button>
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
            <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-xs text-muted-foreground">No files found</p>
        )}
      </div>
    </div>
  );
}
