import { useState } from "react";
import { Search, Folder, FileText, ChevronRight } from "lucide-react";
import { mockFiles } from "@/data/skills";

export function FilesPanel() {
  const [search, setSearch] = useState("");

  const filtered = mockFiles.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full w-72 flex-col border-l border-border bg-files">
      {/* Header */}
      <div className="border-b border-border bg-files-header px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Files</h2>
      </div>

      {/* Search */}
      <div className="border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files and folders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map((file) => (
          <button
            key={file.name}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-muted"
          >
            {file.type === "folder" ? (
              <Folder className="h-4 w-4 text-primary" />
            ) : (
              <FileText className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="flex-1 truncate text-xs text-foreground">{file.name}</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-xs text-muted-foreground">No files found</p>
        )}
      </div>
    </div>
  );
}
