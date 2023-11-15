import { SiteUrls } from './site'

export type RouteType = {
  account: {
    details: string
    select: string
  }
  auth: {
    default: string
  }
  aboutUs: string
  base: string
}

export type Locales = 'en' | 'tr'

const Routes: Record<Locales, RouteType> = {
  tr: {
    account: {
      details: `${SiteUrls.account.tr}/menu`,
      select: `${SiteUrls.account.tr}/sec`,
    },
    auth: {
      default: SiteUrls.auth.tr,
    },
    base: SiteUrls.root.tr,
    aboutUs: `${SiteUrls.root.tr}/hakkimizda`,
  },
  en: {
    account: {
      details: `${SiteUrls.account.en}/menu`,
      select: `${SiteUrls.account.en}/select`,
    },
    auth: {
      default: SiteUrls.auth.en,
    },
    base: SiteUrls.root.en,
    aboutUs: `${SiteUrls.root.en}/about-us`,
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
