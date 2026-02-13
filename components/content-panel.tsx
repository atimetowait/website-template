import { X } from "lucide-react"
import type React from "react"

interface ContentPanelProps {
  onClose: () => void
  children: React.ReactNode
}

export function ContentPanel({ onClose, children }: ContentPanelProps) {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex justify-center">
      <div className="w-full max-w-3xl p-6 md:p-16 max-md:pt-20">
        <div className="absolute top-4 right-4 md:right-16">
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close reading panel"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        {children}
      </div>
    </main>
  )
}