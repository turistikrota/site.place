import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

export default function MarkdownContent({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className='text-2xl font-bold text-center mb-3'>{children}</h1>,
        h2: ({ children }) => (
          <h2
            className='text-xl font-bold text-gray-900 dark:text-gray-200 my-3
            '
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => <h3 className='text-lg font-bold text-gray-800 dark:text-gray-300 mb-1'>{children}</h3>,
        h4: ({ children }) => <h4 className='text-base font-bold'>{children}</h4>,
        h5: ({ children }) => <h5 className='text-base font-bold'>{children}</h5>,
        h6: ({ children }) => <h6 className='text-base font-bold'>{children}</h6>,
        p: ({ children }) => <p className='text-base text-gray-700 dark:text-gray-400'>{children}</p>,
        a: ({ children, href }) => (
          <a className='text-base' href={href}>
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className='text-base'>{children}</ul>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
