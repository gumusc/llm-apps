"use client"

import { ChainValues } from "@langchain/core/utils/types"
import {
  BotMessageSquare,
  MessageSquare,
  MessageSquareCode,
} from "lucide-react"
import { useState } from "react"
import { IconText } from "@/components/IconText"

interface FormElements extends HTMLFormControlsCollection {
  subject: HTMLInputElement
}
interface AgentFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function AgentForm() {
  const [data, setData] = useState<ChainValues | null>(null)

  const onSubmitHandler = async (event: React.FormEvent<AgentFormElement>) => {
    event.preventDefault()
    const subject = event.currentTarget.elements.subject.value
    const response = await fetch("agent/api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })
    const { answer } = await response.json()
    setData(answer)
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Your question:
          </label>
          <input
            name="subject"
            placeholder="question..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
          />{" "}
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Ask the agent
          </button>
        </div>
      </form>
      {data && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="font-bold">
            <IconText text="Your question" Icon={MessageSquare} />
          </div>
          <div>{data.input}</div>
          <div className="font-bold">
            <IconText text="Answer" Icon={BotMessageSquare} />
          </div>
          <div>{data.output}</div>
          <div className="font-bold">
            <IconText text="Tools" Icon={MessageSquareCode} />
          </div>
          <ul>
            {data.intermediateSteps.map(
              (step: { action: { tool: string } }, i: number) => (
                <li key={i}>{step.action.tool}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
