"use client"

import { IconText } from "@/components/IconText"
import {
  Amphora,
  BookOpen,
  BrainCircuit,
  FileSearch2,
  ShieldQuestion,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-4">
      <h1 className="bold text-3xl">
        <IconText text="LLM Apps" Icon={BrainCircuit} />
      </h1>

      <div className="flex gap-4 items-left flex-col">
        <Link href="/story-maker">
          <IconText text="Story Maker" Icon={BookOpen} />
        </Link>
        <Link href="/trivia">
          <IconText text="Trivia" Icon={ShieldQuestion} />
        </Link>
        <Link href="/facts">
          <IconText text="Facts" Icon={Amphora} />
        </Link>
        <Link href="/doc-chat">
          <IconText text="Document Chat" Icon={FileSearch2} />
        </Link>
      </div>
    </main>
  )
}
