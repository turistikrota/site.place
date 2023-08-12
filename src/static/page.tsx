import { SiteUrls } from './site'

export type RouteType = {
  account: {
    details: string
    select: string
  }
  auth: {
    default: string
  }
}

export type Locales = 'en' | 'tr'

const Routes: Record<Locales, RouteType> = {
  tr: {
    account: {
      details: `${SiteUrls.account.tr}/detay/menu`,
      select: SiteUrls.account.tr,
    },
    auth: {
      default: SiteUrls.auth.tr,
    },
  },
  en: {
    account: {
      details: `${SiteUrls.account.en}/detail/menu`,
      select: SiteUrls.account.en,
    },
    auth: {
      default: SiteUrls.auth.en,
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
