import { redirect } from "next/navigation"

interface NotesSlugPageProps {
  params: {
    slug: string
  }
}

export default function NotesSlugRedirectPage({ params }: NotesSlugPageProps) {
  redirect(`/musings/${params.slug}`)
}
