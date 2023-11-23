import Head from 'next/head'
import { Coordinates, Type } from '~/features/place.types'
import { useListSeo } from '~/hooks/seo'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  coordinates?: Coordinates
  type?: Type[]
}

const PlaceListSeo: React.FC<SeoProps> = ({ coordinates, type }) => {
  const { title, description, keywords } = useListSeo({ coordinates, type })

  makeHtmlTitle(title)

  return (
    <Head>
      <BaseSeo />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
    </Head>
  )
}

export default PlaceListSeo
