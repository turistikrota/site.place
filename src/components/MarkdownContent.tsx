import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export default function MarkdownContent({ content }: Props) {
  return <ReactMarkdown>{content}</ReactMarkdown>
}
