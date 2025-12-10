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
    "content": "<ul>\n<li>My all-time favorite book — House of Leaves, holds the dearest place in my heart. <br /></li>\n</ul>\n<blockquote>\n<p>I first read it at 15, as a confused shell of myself. \nIt forever changed the course of not only how I view literature, but how I view my life.<br>Even what I want my own art to breathe towards, one day.  </p>\n</blockquote>\n<h3><em>I wanted to change the world with my art since the first stumblings I ever had, I wanted to know that I could be as important alongside it.</em></h3>\n<blockquote>\n<p>THIS HAS ALWAYS BEEN WHAT I WANTED. </p>\n</blockquote>\n"
  },
  {
    "slug": "physical_based_rendering",
    "title": "Physically Based Rendering: From Theory To Implementation",
    "author": "Matt Pharr, Wenzel Jakob, and Greg Humphreys",
    "year": "2004-2023",
    "hasNotes": true,
    "isReading": false,
    "content": "<ul>\n<li>Physical based rendering has always been something I&#39;m interested in, <br /> \nhoping to one day make good on the promise to learn more about the subject matter.</li>\n</ul>\n"
  },
  {
    "slug": "timewar",
    "title": "This Is How You Lose the Time War",
    "author": "Amal El-Mohtar & Max Gladstone",
    "year": 2019,
    "hasNotes": true,
    "isReading": true,
    "content": "<ul>\n<li>A book that makes me think about the ebb, and flow of conversation. The growth of our nature, and the fallbacks of our own — time &amp; time again.</li>\n</ul>\n<p>Still actively appreciating my read through, one I have to backtrack from time to time on. Keeping up on the subtleties.</p>\n"
  }
]
