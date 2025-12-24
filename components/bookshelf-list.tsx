import Link from "next/link"
import { books } from "@/content/books"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"

interface BookshelfListProps {
  selectedBook: string | null
  onSelectBook: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

export function BookshelfList({ selectedBook, onSelectBook, width, isDragging, onMouseDown }: BookshelfListProps) {
  return (
    <div
      style={{ width: `${width}px` }}
      className={cn(
        "relative overflow-y-auto shrink-0 border-r border-border",
        selectedBook && "max-md:hidden",
      )}
    >
      <div className="px-8 md:px-11 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full">
        <div>
          <h1 className="text-3x1 font-mono mb-7">Books & Assorted Texts</h1>

          <div className="space-y-8">
          <div>
            <h2 className=" text-xs uppercase tracking-widest text-muted-foreground mb-4">Favorites:</h2>
            <ol className="space-y-0">
              {books
                .filter((book) => book.isReading)
                .map((book, index, filteredBooks) => (
                  <li key={book.slug} className="text-foreground">
                    <div className="inline-block align-top" style={{ width: "calc(100% - 1.5em)" }}>
                      {book.hasNotes ? (
                        <Link
                          href={`/bookshelf/${book.slug}`}
                          onClick={() => onSelectBook(book.slug)}
                          className="w-full text-left space-y-1.5 py-3 transition-colors group block cursor-pointer"
                        >
                          <div className="flex items-baseline gap-2">
                            <div className="text-base font-medium text-foreground">{book.title}</div>
                            <span className="text-muted-foreground text-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          </div>
                          <div className="text-sm text-muted-foreground break-words">
                            {book.author}, {book.year}
                          </div>
                        </Link>
                      ) : (
                        <div className="w-full text-left space-y-1.5 py-3 cursor-default">
                          <div className="flex items-baseline gap-2">
                            <div className="text-base font-medium text-foreground">{book.title}</div>
                          </div>
                          <div className="text-sm text-muted-foreground break-words">
                            {book.author}, {book.year}
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </div>

          <div>
            <h2 className=" text-xs uppercase tracking-widest text-muted-foreground mb-4">To read:</h2>
            <ol className="space-y-0">
              {books
                .filter((book) => !book.isReading)
                .map((book, index, filteredBooks) => (
                  <li key={book.slug} className="text-foreground">
                    <div className="inline-block align-top" style={{ width: "calc(100% - 1.5em)" }}>
                      {book.hasNotes ? (
                        <Link
                          href={`/bookshelf/${book.slug}`}
                          onClick={() => onSelectBook(book.slug)}
                          className="w-full text-left space-y-1.5 py-3 transition-colors group block cursor-pointer"
                        >
                          <div className="flex items-baseline gap-2">
                            <div className="text-base font-medium text-foreground group-hover:underline">{book.title}</div>
                            <span className="text-muted-foreground text-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {book.author}, {book.year}
                          </div>
                        </Link>
                      ) : (
                        <div className="w-full text-left space-y-1.5 py-3 cursor-default">
                          <div className="flex items-baseline gap-2">
                            <div className="text-base font-medium text-foreground">{book.title}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {book.author}, {book.year}
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
