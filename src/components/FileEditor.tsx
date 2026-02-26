import { useState } from "react";
import { X, Save, Edit3 } from "lucide-react";

interface FileEditorProps {
  fileName: string;
  initialContent: string;
  onClose: () => void;
  onSave: (content: string) => void;
}

export function FileEditor({ fileName, initialContent, onClose, onSave }: FileEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(content);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-1 flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{fileName}</span>
          {saved && (
            <span className="text-xs text-green-600">已保存</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Edit3 className="h-3.5 w-3.5" />
              编辑
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Save className="h-3.5 w-3.5" />
              保存
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {editing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full w-full resize-none rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            style={{ minHeight: "300px" }}
          />
        ) : (
          <pre className="whitespace-pre-wrap rounded-xl bg-muted p-4 font-mono text-sm leading-relaxed text-foreground">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
