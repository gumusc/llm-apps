import { Amphora, Home } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import FactsForm from "./facts-form"
import { IconText } from "@/components/IconText"

export const metadata: Metadata = {
  title: "Facts",
  description: "Facts generator app",
}

export default function Facts() {
  return (
    <main className="p-4">
      <div className="flex gap-4 justify-between mb-4">
        <h1 className="bold text-3xl">
          <IconText text="Facts" Icon={Amphora} />
        </h1>
        <div>
          <Link href="/">
            <IconText text="Home" Icon={Home} />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <em>This app uses a GPT Model to generate facts about a topic.</em>
      </div>

      <FactsForm />
    </main>
  )
}
