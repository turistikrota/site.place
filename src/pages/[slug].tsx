import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import ImagePreview from '@turistikrota/ui/image/preview'
import ErrorPage from '@turistikrota/ui/pages/error'
import StickySection from '@turistikrota/ui/section/sticky'
import { getMdContent } from '@turistikrota/ui/utils/md'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import MarkdownContent from '~/components/MarkdownContent'
import PlaceDetailContentCard from '~/components/card/PlaceDetailContentCard'
import PlaceImagePreview from '~/components/card/PlaceImagePreview'
import PlaceRestorationCard from '~/components/card/PlaceRestorationCard'
import PlaceDetailSeo from '~/components/seo/PlaceDetailSeo'
import { Services, apiUrl } from '~/config/services'
import { FullTranslation, PlaceDetail, getTranslations } from '~/features/place.types'
import { httpClient } from '~/http/client'
import DefaultLayout from '~/layouts/DefaultLayout'
import { mapAndSortImages } from '~/utils/image'
import { makeHtmlTitle, renderHtmlTitle } from '~/utils/seo'

type Props = {
  response: PlaceDetail
  md: string
  accessTokenIsExists: boolean
  accountCookie: string
}

const PlaceDetailMapCard = dynamic(() => import('~/components/card/PlaceDetailMapCard'), { ssr: false })

export default function PlaceDetail({ response, md, accessTokenIsExists, accountCookie }: Props) {
  const { t, i18n } = useTranslation('place')
  const images = mapAndSortImages(response?.images ?? [])
  const isDesktop = useIsDesktop()
  const translations = getTranslations<FullTranslation>(response?.translations ?? {}, i18n.language, {
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
  if (response === null) {
    renderHtmlTitle(makeHtmlTitle(t('notFound.title')))
    return (
      <ErrorPage
        title={t('notFound.title')}
        subtitle={t('notFound.description')}
        button={
          <Link
            href={'/'}
            className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-2'
          >
            {t('notFound.backHome')}
          </Link>
        }
      />
    )
  }

  return (
    <DefaultLayout accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <PlaceDetailSeo coordinates={response?.coordinates} images={images} seoData={translations} />
      <ImagePreview altPrefix={translations.title} list={images}>
        <section className='max-w-7xl p-2 xl:px-0 mx-auto lg:h-full lg:flex grow grid grid-cols-12'>
          <div className={'col-span-12 w-full'}>
            <PlaceRestorationCard restorations={response?.restorations ?? []} />
            <PlaceImagePreview title={translations.title} images={images} />

            {!isDesktop && (
              <section className='mt-2'>
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
            <section className='mt-2'>
              <MarkdownContent content={md} />
            </section>
            <section className='mt-2'>
              <h3 className='text-lg font-bold'>{t('detail.map.title')}</h3>
              <p className='text-sm text-gray-500 mb-2'>{t('detail.map.description')}</p>
              <PlaceDetailMapCard coordinates={response?.coordinates} type={response?.type} />
            </section>
            <div className='pb-20 md:pb-10'></div>
          </div>
          {isDesktop && (
            <StickySection customWidth='w-128 xl:w-144' innerClassName='px-2'>
              <PlaceDetailContentCard
                coordinates={response?.coordinates}
                features={response?.features}
                isPayed={response?.isPayed}
                review={response?.review}
                timeSpent={response?.averageTimeSpent}
                translations={translations}
                type={response?.type}
                updatedAt={response?.updatedAt}
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
  const res = await httpClient
    .get(apiUrl(Services.Place, `/${slug}`), {
      headers: {
        'Accept-Language': locale,
      },
    })
    .catch((_err) => {
      return { data: undefined, status: 500 }
    })
  if (res.status === 404) {
    return {
      notFound: true,
    }
  }
  let md = ''
  if (res.data && res.data.translations && !!res.data.translations[locale]) {
    md = await getMdContent(res.data.translations[locale].markdownUrl)
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'filter', 'sort', 'place'])),
      response: res.data ? res.data : null,
      md,
      accessTokenIsExists: !!ctx.req.cookies.accessToken,
      accountCookie: ctx.req.cookies['.s.a.u'],
    },
  }
}
