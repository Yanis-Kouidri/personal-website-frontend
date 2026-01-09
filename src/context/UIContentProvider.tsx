import type { ReactNode } from 'react'
import { createContext, use, useEffect, useState } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import config from '../utils/config'

interface ApiResponse {
  data: {
    footer: FooterData
    header: HeaderData
  }
}

interface FooterData {
  description: string
  acknowledgments: string
}

interface HeaderData {
  home: string
  projects: string
  documentations: string
  about: string
  login: string
  signup: string
}

interface UIContentContextType {
  footerData: FooterData | null
  headerData: HeaderData | null
  loading: boolean
  error: string | null
}

const UIContentContext = createContext<UIContentContextType | undefined>(
  undefined,
)

export function UIContentProvider({ children }: { children: ReactNode }) {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [headerData, setHeaderData] = useState<HeaderData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint: '/api/global?populate=*',
      method: 'GET',
      credentials: false,
      setIsFetching: setLoading,
      onSuccess: (response: ApiResponse) => {
        //console.log(response.data)
        const fetchedFooterData: FooterData = response.data.footer
        const fetchedHeaderData: HeaderData = response.data.header
        //console.log(fetchedHeaderData)
        setFooterData(fetchedFooterData)
        setHeaderData(fetchedHeaderData)
        setError(null)
      },
      onError: (errorMessage: string) => {
        setError(errorMessage)
      },
    })
  }, [])

  return (
    <UIContentContext value={{ footerData, headerData, loading, error }}>
      {children}
    </UIContentContext>
  )
}

export function useUIContent() {
  const context = use(UIContentContext)
  if (context === undefined) {
    throw new Error(
      'useFooterContent must be used within FooterContentProvider',
    )
  }
  return context
}
