import { ChatGroq } from "@langchain/groq"
import { PromptTemplate } from "@langchain/core/prompts"
import { NextResponse } from "next/server"
import { config } from "@/app/config"

const makeStoryTitle = async (subject: string) => {
  const model = new ChatGroq(config.models.groq)
  const prompt = new PromptTemplate({
    inputVariables: ["subject"],
    template: "Tell me a story title about {subject}",
  })
  const chain = prompt.pipe(model)

  return chain.invoke({ subject })
}

const streamStory = async (storyTitle: string) => {
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const model = new ChatGroq({
    ...config.models.groq,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: async (token) => {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        handleLLMEnd: async () => {
          await writer.ready
          await writer.close()
        },
      },
    ],
  })
  const prompt = new PromptTemplate({
    inputVariables: ["storyTitle"],
    template: "Tell me a story titled {storyTitle}",
  })
  const chain = prompt.pipe(model)
  chain.invoke({ storyTitle })

  return new NextResponse(stream.readable, {
    headers: { "content-type": "text/event-stream" },
  })
}

export async function POST(req: Request) {
  const { subject, storyTitle } = await req.json()

  // if the request has a storyTitle then return the stream
  if (storyTitle) {
    return streamStory(storyTitle)
  }

  const gptResponse = await makeStoryTitle(subject)
  const parts = gptResponse.text.split("\n")

  return Response.json({ title: parts[0], summaryArray: parts.slice(1) })
}
