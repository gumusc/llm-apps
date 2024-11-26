import { Home, ShieldQuestion } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import TriviaForm from "./trivia-form"
import { IconText } from "@/components/IconText"

export const metadata: Metadata = {
  title: "Trivia",
  description: "Trivia question maker app",
}

export default function Trivia() {
  return (
    <main className="p-4">
      <div className="flex gap-4 justify-between mb-4">
        <h1 className="bold text-3xl">
          <IconText text="Trivia" Icon={ShieldQuestion} />
        </h1>
        <div>
          <Link href="/">
            <IconText text="Home" Icon={Home} />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <em>This app uses a GPT Model to generate trivia questions.</em>
      </div>

      <TriviaForm />
    </main>
  )
}
