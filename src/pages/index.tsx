import MapLayout from '~/layouts/MapLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return <MapLayout>buraya content switcher lütfen</MapLayout>
}

export async function getServerSideProps({ locale }: any) {
  console.log('locale::', locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, [])),
    },
  }
}
