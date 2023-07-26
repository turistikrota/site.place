import MapLayout from '~/layouts/MapLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSwitcher from '~/components/contents/ContentSwitcher'
import { ListResponse } from '@turistikrota/ui/cjs/types'
import { PlaceListItem } from '~/features/place.types'
import { getQueryByKeyBindings, placeQueryToURL, placeToQuery } from '~/features/place.filter'
import { httpClient } from '~/http/client'
import { Services, apiUrl } from '~/config/services'

type Props = {
  response?: ListResponse<PlaceListItem>
}

export default function Home({ response }: Props) {
  return (
    <MapLayout>
      <ContentSwitcher response={response} />
    </MapLayout>
  )
}

export async function getServerSideProps(ctx: any) {
  const urlSearchParams = new URLSearchParams(ctx.query)
  const query = getQueryByKeyBindings(urlSearchParams)
  const res = await httpClient
    .post(apiUrl(Services.Place, `/?${placeQueryToURL(query)}`), query.filter)
    .catch(() => ({ data: undefined }))
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'filter', 'sort'])),
      response: res.data,
    },
  }
}
