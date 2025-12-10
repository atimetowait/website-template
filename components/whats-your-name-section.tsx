import { whatsYourName } from "@/content/whats-your-name"

export function WhatsYourNameSection() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4x1 font-mono mb-2">{whatsYourName.title}</h1>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
        <div dangerouslySetInnerHTML={{ __html: whatsYourName.content }} />
      </article>
    </div>
  )
}


