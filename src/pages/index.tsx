import { ListResponse } from '@turistikrota/ui/cjs/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContentSwitcher from '~/components/contents/ContentSwitcher'
import { Services, apiUrl } from '~/config/services'
import { getQueryByKeyBindings, placeQueryToURL } from '~/features/place.filter'
import { PlaceListItem } from '~/features/place.types'
import { PlaceFilterProvider } from '~/hooks/place.filter'
import { httpClient } from '~/http/client'
import MapLayout from '~/layouts/MapLayout'
import { isApiError } from '~/types/error'

type Props = {
  response?: ListResponse<PlaceListItem>
  error?: any
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

export default function Home({ response, error, accessTokenIsExists, isAccountCookieExists }: Props) {
  return (
    <MapLayout accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
      <PlaceFilterProvider>
        <ContentSwitcher response={response} error={error} />
      </PlaceFilterProvider>
    </MapLayout>
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
      accessTokenIsExists: !!ctx.req.cookies.accessToken,
      isAccountCookieExists: !!ctx.req.cookies.isAccount,
    },
  }
}
