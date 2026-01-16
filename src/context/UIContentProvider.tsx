import type { ReactNode } from 'react'
import { createContext, use, useEffect, useState } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import config from '../utils/config'

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

interface ApiResponse {
  data: {
    footer: FooterData
    header: HeaderData
  }
}

interface UIContentContextType {
  footerData: FooterData | null
  headerData: HeaderData | null
  loading: boolean
  error: string | null
}

export const UIContentContext = createContext<UIContentContextType | undefined>(
  undefined,
)

export function UIContentProvider({
  children,
}: {
  readonly children: ReactNode
}) {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [headerData, setHeaderData] = useState<HeaderData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isIgnore = false

    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint: '/api/global?populate=*',
      method: 'GET',
      credentials: false,
      setIsFetching: setLoading,
      onSuccess: (response: ApiResponse) => {
        if (!isIgnore) {
          setFooterData(response.data.footer)
          setHeaderData(response.data.header)
          setError(null)
        }
      },
      onError: (errorMessage: string) => {
        if (!isIgnore) {
          setError(errorMessage)
        }
      },
    })

    return () => {
      isIgnore = true
    }
  }, [])

  return (
    <UIContentContext value={{ footerData, headerData, loading, error }}>
      {children}
    </UIContentContext>
  )
}

/**
 * Custom hook to consume UI Content with React 19 'use' pattern
 * Ensures the context is used within its provider and handles TS nullability
 */
export function useUIContent() {
  const context = use(UIContentContext)
  if (!context) {
    throw new Error('useUIContent must be used within a UIContentProvider')
  }
  return context
}
