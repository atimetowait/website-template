export interface Book {
  slug: string
  title: string
  author: string
  year: number
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
  content: string
}

export const books: Book[] = [
  {
    "slug": "houseofleaves",
    "title": "House of Leaves",
    "author": "Mark Z. Danielewski",
    "year": 2000,
    "lastUpdated": "10-29-2025",
    "hasNotes": true,
    "isReading": true,
    "content": "<ul><li>My all-time favorite book — House of Leaves, holds the dearest place in my heart.  </li></ul>\n<p>I first read it at 15, as a confused shell of myself.  It forever changed the course of not only how I view literature, but how I view my life.   Even what I want my own art to breathe towards, one day.</p>\n<ul><li>I wanted to change the world with my art since the first stumblings I ever had, I wanted to know that I could be as important alongside it.</li></ul>\n<blockquote>THIS HAS ALWAYS BEEN WHAT I WANTED.</blockquote>"
  },
  {
    "slug": "timewar",
    "title": "This Is How You Lose the Time War",
    "author": "Amal El-Mohtar & Max Gladstone",
    "year": 2019,
    "hasNotes": true,
    "isReading": true,
    "content": "<ul><li>A book that makes me think about the ebb, and flow of conversation. The growth of our nature, and the fallbacks of our own — time &amp; time again.</li></ul>\n<p>Still actively appreciating my read through, one I have to backtrack from time to time on. Keeping up on the subtleties.</p>"
  }
]
