import type { ReactNode } from 'react'
import { createContext, use, useEffect, useState } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import config from '../utils/config'

interface ApiResponse {
  data: FooterData
}

interface FooterData {
  description: string
  acknowledgments: string
}

interface UIContentContextType {
  footerData: FooterData | null
  loading: boolean
  error: string | null
}

const UIContentContext = createContext<UIContentContextType | undefined>(
  undefined,
)

export function UIContentProvider({ children }: { children: ReactNode }) {
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint: '/api/footer?populate=*',
      method: 'GET',
      credentials: false,
      setIsFetching: setLoading,
      onSuccess: (response: ApiResponse) => {
        //console.log(response.data)
        const fetchedFooterData: FooterData = response.data
        setFooterData(fetchedFooterData)
        setError(null)
      },
      onError: (errorMessage: string) => {
        setError(errorMessage)
      },
    })
  }, [])

  return (
    <UIContentContext value={{ footerData, loading, error }}>
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
