import { FileSearch2, Home } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import DocChatForm from "./doc-chat-form"
import { IconText } from "@/components/IconText"

export const metadata: Metadata = {
  title: "Document Chat",
  description: "Document chat app",
}

export default function DocChat() {
  return (
    <main className="p-4">
      <div className="flex gap-4 justify-between mb-4">
        <h1 className="bold text-3xl">
          <IconText text="Document Chat" Icon={FileSearch2} />
        </h1>
        <div>
          <Link href="/">
            <IconText text="Home" Icon={Home} />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <em>This app uses a GPT Model to chat with a document.</em>
      </div>

      <DocChatForm />
    </main>
  )
}
