import { thisBias } from "@/content/this-bias-is-beginning-to-show"

export function ThisBiasSection() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4x1 font-mono mb-2">{thisBias.title}</h1>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none text-foreground this-bias-content">
        <div dangerouslySetInnerHTML={{ __html: thisBias.content }} />
      </article>
    </div>
  )
}


