import { cn } from "@/lib/utils"

type Tab = "formalities" | "musings" | "whats-your-name" | "bookshelf"

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
  mobileMenuOpen: boolean
}

export function Sidebar({ activeTab, onTabChange, width, isDragging, onMouseDown, mobileMenuOpen }: SidebarProps) {
  const tabs: Tab[] = ["formalities", "musings", "whats-your-name", "bookshelf"]

  const labels: Record<Tab, string> = {
    formalities: "Formalities",
    musings: "Musings",
    "whats-your-name": "what's your name?",
    bookshelf: "Bookshelf",
  }

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
            {labels[tab]}
          </button>
        ))}
      </nav>
    </aside>
  )
}
