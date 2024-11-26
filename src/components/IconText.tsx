import { LucideProps } from "lucide-react"

type ContentType = {
  Icon: React.ComponentType<LucideProps>
  text: string
}

export const IconText = ({ text, Icon }: ContentType) => {
  return (
    <div className="flex items-center space-x-2">
      {Icon && <Icon className="min-h-4 min-w-4" />}
      <span>{text}</span>
    </div>
  )
}
