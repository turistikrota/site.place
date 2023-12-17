import Button from '@turistikrota/ui/cjs/button'
import PerfectImage from '@turistikrota/ui/cjs/image/perfect'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

type ImageProps = {
  src: string
  alt: string
}

const ImageLoader: React.FC<ImageProps> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true)
  return (
    <span className={`${loading ? 'relative min-h-full md:h-128 h-72 z-10 my-4 w-full flex rounded-md' : ''}`}>
      <PerfectImage
        imgClassName='h-auto object-cover my-4 z-10 mx-auto rounded-md'
        loadingClassName='rounded-md'
        src={src}
        alt={alt}
        onImageLoaded={() => setLoading(false)}
      />
    </span>
  )
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
        h3: ({ children }) => (
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-300 mt-2 mb-1'>{children}</h3>
        ),
        h4: ({ children }) => <h4 className='text-base font-bold'>{children}</h4>,
        h5: ({ children }) => <h5 className='text-base font-bold'>{children}</h5>,
        h6: ({ children }) => <h6 className='text-base font-bold'>{children}</h6>,
        p: ({ children }) => <p className='text-base text-gray-700 dark:text-gray-400'>{children}</p>,
        a: ({ children, href }) => (
          <a href={href} target='_blank' rel='noreferrer'>
            <Button className='mt-2 flex justify-center items-center gap-2' block={false}>
              <i className='bx text-lg bx-link-external'></i>
              {children}
            </Button>
          </a>
        ),
        ul: ({ children }) => <ul className='text-base list-disc list-inside'>{children}</ul>,
        li: ({ children }) => <li className='text-base text-gray-700 dark:text-gray-400'>{children}</li>,
        strong: ({ children }) => (
          <strong className='text-base font-bold text-gray-800 dark:text-gray-300'>{children}</strong>
        ),
        hr: ({ children }) => <hr className='my-2'>{children}</hr>,
        b: ({ children }) => <b className='text-base font-bold text-gray-800 dark:text-gray-300'>{children}</b>,
        img: ({ src, alt }) => src && alt && <ImageLoader src={src} alt={alt} />,
        em: ({ children }) => <em className='text-base italic'>{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
