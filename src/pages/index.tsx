import MapLayout from '~/layouts/MapLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSwitcher from '~/components/contents/ContentSwitcher'

export default function Home() {
  return (
    <MapLayout>
      <ContentSwitcher />
    </MapLayout>
  )
}

export async function getServerSideProps({ locale }: any) {
  console.log('locale::', locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'filter', 'sort'])),
    },
  }
}
