import { Bird, Home } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import AgentForm from "./agent-form"
import { IconText } from "@/components/IconText"

export const metadata: Metadata = {
  title: "AI Agent",
  description: "AI agent app",
}

export default function Agent() {
  return (
    <main className="p-4">
      <div className="flex gap-4 justify-between mb-4">
        <h1 className="bold text-3xl">
          <IconText text="Agent" Icon={Bird} />
        </h1>
        <div>
          <Link href="/">
            <IconText text="Home" Icon={Home} />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <em>This app uses a GPT Model to generate an AI agent.</em>
      </div>

      <AgentForm />
    </main>
  )
}
