import { useIsMobile } from '@turistikrota/ui/cjs/hooks/dom'
import ImagePreview from '@turistikrota/ui/cjs/image/preview'
import StickySection from '@turistikrota/ui/cjs/section/sticky'
import { getMdContent } from '@turistikrota/ui/cjs/utils/md'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import MarkdownContent from '~/components/MarkdownContent'
import PlaceDetailContentCard from '~/components/card/PlaceDetailContentCard'
import PlaceImagePreview from '~/components/card/PlaceImagePreview'
import PlaceDetailSeo from '~/components/seo/PlaceDetailSeo'
import { Services, apiUrl } from '~/config/services'
import { FullTranslation, PlaceDetail, getTranslations } from '~/features/place.types'
import { httpClient } from '~/http/client'
import DefaultLayout from '~/layouts/DefaultLayout'
import { mapAndSortImages } from '~/utils/image'

type Props = {
  response: PlaceDetail
  md: string
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

const PlaceDetailMapCard = dynamic(() => import('~/components/card/PlaceDetailMapCard'), { ssr: false })

export default function PlaceDetail({ response, md, accessTokenIsExists, isAccountCookieExists }: Props) {
  const { t, i18n } = useTranslation('place')
  const images = mapAndSortImages(response?.images)
  const isMobile = useIsMobile()
  const translations = getTranslations<FullTranslation>(response.translations, i18n.language, {
    title: '',
    slug: '',
    description: '',
    markdownUrl: '',
    seo: {
      description: '',
      keywords: '',
      title: '',
    },
  })

  return (
    <DefaultLayout accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
      <PlaceDetailSeo coordinates={response.coordinates} images={images} seoData={translations} />
      <ImagePreview altPrefix={translations.title} list={images}>
        <section className='max-w-7xl p-4 xl:px-0 mx-auto lg:h-full grow grid grid-cols-12 gap-4'>
          <div className='col-span-12 md:col-span-8'>
            <PlaceImagePreview title={translations.title} images={images} />

            {isMobile && (
              <section className='mt-4'>
                <PlaceDetailContentCard
                  coordinates={response.coordinates}
                  features={response.features}
                  isPayed={response.isPayed}
                  review={response.review}
                  timeSpent={response.averageTimeSpent}
                  translations={translations}
                  type={response.type}
                  updatedAt={response.updatedAt}
                />
              </section>
            )}
            <section className='mt-4'>
              <MarkdownContent content={md} />
            </section>
            <section className='mt-4'>
              <h3 className='text-lg font-bold'>{t('detail.map.title')}</h3>
              <p className='text-sm text-gray-500 mb-2'>{t('detail.map.description')}</p>
              <PlaceDetailMapCard coordinates={response.coordinates} />
            </section>
            <div className='pb-20 md:pb-10'></div>
          </div>
          {!isMobile && (
            <StickySection customWidth='w-96' innerClassName=''>
              <PlaceDetailContentCard
                coordinates={response.coordinates}
                features={response.features}
                isPayed={response.isPayed}
                review={response.review}
                timeSpent={response.averageTimeSpent}
                translations={translations}
                type={response.type}
                updatedAt={response.updatedAt}
              />
            </StickySection>
          )}
        </section>
      </ImagePreview>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx: any) {
  const slug = ctx.query.slug
  if (!slug) {
    return {
      notFound: true,
    }
  }
  const locale = ctx.locale ?? 'tr'
  const res = await httpClient.get(apiUrl(Services.Place, `/${slug}`)).catch((_err) => {
    return { data: undefined, status: 500 }
  })
  if (res.status === 404) {
    return {
      notFound: true,
    }
  }
  const md = await getMdContent(res.data.translations[locale].markdownUrl)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'filter', 'sort', 'place'])),
      response: res.data ? res.data : null,
      md,
      accessTokenIsExists: !!ctx.req.cookies.accessToken,
      isAccountCookieExists: !!ctx.req.cookies.isAccount,
    },
  }
}
