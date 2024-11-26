import { ChatGroq } from "@langchain/groq"
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables"
import { z } from "zod"
import { config } from "@/app/config"

const model = new ChatGroq(config.models.groq)

const makeQuestionAndAnswers = async (subject: string) => {
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      question: z
        .string()
        .describe(`tell me a random trivia question about ${subject}`),
      answers: z.array(z.string()).describe(`
                give 4 possible answers, in a random order,
                out of which only one is true.`),
      correctIndex: z
        .number()
        .describe(`the number of the correct answer, zero indexed`),
    })
  )

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `Answer the user question as best as possible.\n
        {format_instructions}`
    ),
    model,
    parser,
  ])

  return chain.invoke({
    format_instructions: parser.getFormatInstructions(),
  })
}

export async function POST(req: Request) {
  const { subject } = await req.json()
  const data = await makeQuestionAndAnswers(subject)

  return Response.json({ data })
}
