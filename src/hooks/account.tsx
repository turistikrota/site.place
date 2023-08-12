import { useTranslation } from 'next-i18next'
import { createContext, useContext, useEffect, useState } from 'react'
import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/http/client'

enum AccountStorage {
  CurrentAccount = 'currentAccount',
}

export type AccountListItem = {
  avatarUrl: string
  completedRate: number
  createdAt: string
  description: string
  fullName: string
  isActive: boolean
  isVerified: boolean
  userCode: string
  userName: string
}

export function isAccountListItem(response: any): response is AccountListItem {
  return (
    response &&
    response.avatarUrl !== undefined &&
    response.completedRate !== undefined &&
    response.createdAt !== undefined &&
    response.description !== undefined &&
    response.fullName !== undefined &&
    response.isActive !== undefined &&
    response.isVerified !== undefined &&
    response.userName !== undefined
  )
}

type AccountContext = {
  loading: boolean
  current?: AccountListItem
}

type ProviderProps = {
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

const AccountContext = createContext<AccountContext>({
  loading: false,
})

export const useAccount = () => useContext(AccountContext)

export const AccountProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  accessTokenIsExists,
  isAccountCookieExists,
}) => {
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState<AccountListItem | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const item = localStorage.getItem(AccountStorage.CurrentAccount)
    if (accessTokenIsExists && (!isAccountCookieExists || !!item)) return
    setLoading(true)
    httpClient
      .get(apiUrl(Services.Account, '/selected'))
      .then((res) => {
        if (isAccountListItem(res.data)) {
          setCurrent(res.data)
        }
      })
      .catch((err) => {
        /*
        if (err && err.response && err.response.status === 401) {
          return openLoginWithRedirect(i18n.language)
        }
        */
        localStorage.removeItem(AccountStorage.CurrentAccount)
        setCurrent(undefined)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isAccountCookieExists])

  return (
    <AccountContext.Provider
      value={{
        loading,
        current,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
