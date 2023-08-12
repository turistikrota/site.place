import { getStaticRoute } from '~/static/page'

export const openLoginWithRedirect = (lang: string) => {
  const currentUrl = window.location.href
  window.open(getStaticRoute(lang).auth.default + '?redirect=' + currentUrl, '_self')
}

export const openLogin = (lang: string) => {
  window.open(getStaticRoute(lang).auth.default, '_self')
}
