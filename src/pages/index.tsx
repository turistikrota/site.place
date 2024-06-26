import { ListResponse } from '@turistikrota/ui/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSwitcher from '~/components/contents/ContentSwitcher'
import { Config } from '~/config'
import { Services, apiUrl } from '~/config/services'
import { getQueryByKeyBindings, placeQueryToURL } from '~/features/place.filter'
import { PlaceListItem } from '~/features/place.types'
import { PlaceFilterProvider } from '~/hooks/place.filter'
import { httpClient } from '~/http/client'
import AnalyticLayout from '~/layouts/AnalyticLayout'
import MapLayout from '~/layouts/MapLayout'
import { isApiError } from '~/types/error'

type Props = {
  response?: ListResponse<PlaceListItem>
  error?: any
  accessTokenIsExists: boolean
  accountCookie: string
}

export default function Home({ response, error, accessTokenIsExists, accountCookie }: Props) {
  return (
    <AnalyticLayout>
      <MapLayout accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
        <PlaceFilterProvider>
          <ContentSwitcher response={response} error={error} />
        </PlaceFilterProvider>
      </MapLayout>
    </AnalyticLayout>
  )
}

export async function getServerSideProps(ctx: any) {
  const urlSearchParams = new URLSearchParams(ctx.query)
  const query = getQueryByKeyBindings(urlSearchParams)
  let err: any
  const res = await httpClient
    .post(apiUrl(Services.Place, `/?${placeQueryToURL(query)}`), query.filter)
    .catch((_err) => {
      err = _err
      return { data: undefined }
    })
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'filter', 'sort', 'place'])),
      response: res.data
        ? res.data
        : {
            list: [],
          },
      error: !!err && isApiError(err) ? err.response.data : null,
      accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
      accountCookie: !!ctx.req.cookies[Config.cookies.accountName],
    },
  }
}
