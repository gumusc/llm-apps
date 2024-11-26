import { ChatGroq } from "@langchain/groq"
import { AIMessage, HumanMessage } from "@langchain/core/messages"
import { StringOutputParser } from "@langchain/core/output_parsers"
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts"
import { config } from "@/app/config"

const model = new ChatGroq(config.models.groq)

const chatHistory = [
  new HumanMessage(`My favorite drink is tea.`),
  new HumanMessage(`My favorite car make is BMW.`),
  new HumanMessage(`My favorite book is "The Hobbit".`),
  new HumanMessage(`My favorite film is "Forrest Gump".`),
  new HumanMessage(`My favorite Tv series is "The Expanse".`),
]

const makeFact = async (subject: string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chatHistory"),
    ["human", "{question}"],
  ])
  const outputParser = new StringOutputParser()
  const chain = prompt.pipe(model).pipe(outputParser)
  const question = `Tell me a new fact about ${subject}.`
  chatHistory.push(new HumanMessage(question))
  const fact = await chain.invoke({
    question,
    chatHistory,
  })
  chatHistory.push(new AIMessage(fact))

  return fact
}

export async function POST(req: Request) {
  const { subject } = await req.json()
  const fact = await makeFact(subject)

  return Response.json({ fact })
}
