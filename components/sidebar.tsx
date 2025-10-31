import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"

type Tab = "about" | "bookshelf" | "notes" | "Is this what you want?" | "Don't Blink!" | "I thought...I could run forever."

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
  mobileMenuOpen: boolean
}

export function Sidebar({ activeTab, onTabChange, width, isDragging, onMouseDown, mobileMenuOpen }: SidebarProps) {
  const tabs: Tab[] = ["about", "bookshelf", "notes", "Is this what you want?", "Don't Blink!", "I thought...I could run forever."]

  return (
    <aside
      style={{ width: `${width}px`, borderRight: '3px double var(--border)' }}
      className={cn(
        "relative shrink-0 bg-background",
        "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:shadow-lg",
        "max-md:transition-transform max-md:duration-150",
        mobileMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
      )}
    >
      {/* Ribbon Bookmark */}
      <div className="absolute top-0 left-8 w-8 h-40 z-10 group">
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, oklch(0.42 0.18 25), oklch(0.52 0.18 25) 50%, oklch(0.42 0.18 25))',
            border: '1px solid oklch(0.42 0.18 25)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(0,0,0,0.2)',
          }}
        >
        </div>
      </div>
      <style jsx>{`
        @keyframes sheen {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
      <nav className="flex flex-col gap-2 p-8 pt-54">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "text-left py-1 transition-colors uppercase tracking-widest text-xs",
              activeTab === tab ? "text-foreground" : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />
    </aside>
  )
}
