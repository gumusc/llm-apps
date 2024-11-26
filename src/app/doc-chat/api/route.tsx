import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { createRetrievalChain } from "langchain/chains/retrieval"
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { config } from "@/app/config"
import { Document } from "langchain/document"
import { Runnable } from "@langchain/core/runnables"

const model = new ChatOpenAI({
  ...config.models.openAI,
  temperature: 0,
})

const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question from the following context:
  {context}
  Question: {question}`
)

let retrievalChain: Runnable
let splitDocs: Document[]

async function loadDocumentsFromUrl(url: string) {
  const loader = new CheerioWebBaseLoader(url)
  const docs = await loader.load()

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  })

  splitDocs = await splitter.splitDocuments(docs)
  const embeddings = new OpenAIEmbeddings()
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  )
  const retriever = vectorStore.asRetriever()
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  })
  retrievalChain = await createRetrievalChain({
    combineDocsChain: chain,
    retriever,
  })
}

const makeAnswer = async (question: string) => {
  return retrievalChain.invoke({
    question,
    context: splitDocs,
  })
}

export async function POST(req: Request) {
  const { subject, url } = await req.json()

  if (url) {
    await loadDocumentsFromUrl(url)
    return Response.json({ loaded: true })
  }

  const data = await makeAnswer(subject)
  return Response.json({ data: data.answer })
}
