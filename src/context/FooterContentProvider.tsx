import { createContext, use, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { handleApiRequest } from '../hooks/useApiRequest' // Ton hook
import config from '../utils/config'

interface ApiResponse {
  data: FooterData
}

interface FooterData {
  description: string
  acknowledgments: string
}

interface FooterContentContextType {
  footerData: FooterData | null
  loading: boolean
  error: string | null
}

const FooterContentContext = createContext<
  FooterContentContextType | undefined
>(undefined)

export function FooterContentProvider({ children }: { children: ReactNode }) {
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
    <FooterContentContext value={{ footerData, loading, error }}>
      {children}
    </FooterContentContext>
  )
}

export function useFooterContent() {
  const context = use(FooterContentContext)
  if (context === undefined) {
    throw new Error(
      'useFooterContent must be used within FooterContentProvider',
    )
  }
  return context
}
