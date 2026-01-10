import { render, screen, waitFor } from '@testing-library/react'
import { handleApiRequest } from '../hooks/apiRequest'
import { UIContentProvider, useUIContent } from './UIContentProvider'

vi.mock('../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('../utils/config', () => ({
  default: {
    strapiUrl: 'http://mock-api.com',
  },
}))

const TestConsumer = () => {
  const { headerData, footerData, loading, error } = useUIContent()

  if (loading) return <output>Loading...</output>
  if (error) return <div role="alert">{error}</div>

  return (
    <div>
      <header>{headerData?.home}</header>
      <footer>{footerData?.description}</footer>
    </div>
  )
}

describe('UIContentProvider', () => {
  const mockResponse = {
    data: {
      header: {
        home: 'Home',
        projects: 'Projects',
        documentations: 'Docs',
        about: 'About',
        login: 'Login',
        signup: 'Signup',
      },
      footer: {
        description: 'Footer Description',
        acknowledgments: 'Thanks to contributors',
      },
    },
  }

  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provides fetched content to children on success', async () => {
    // Fixed: Use optional chaining for onSuccess and setIsFetching
    mockedHandleApiRequest.mockImplementation(
      ({ onSuccess, setIsFetching }) => {
        setIsFetching?.(false)
        onSuccess?.(mockResponse)
      },
    )

    render(
      <UIContentProvider>
        <TestConsumer />
      </UIContentProvider>,
    )

    await waitFor(() => {
      expect(screen.getByRole('banner')).toHaveTextContent('Home')
      expect(screen.getByRole('contentinfo')).toHaveTextContent(
        'Footer Description',
      )
    })
  })

  it('displays error message when API request fails', async () => {
    const errorMessage = 'Failed to fetch content'

    // Fixed: Use optional chaining for onError and setIsFetching
    mockedHandleApiRequest.mockImplementation(({ onError, setIsFetching }) => {
      setIsFetching?.(false)
      onError?.(errorMessage)
    })

    render(
      <UIContentProvider>
        <TestConsumer />
      </UIContentProvider>,
    )

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
    })
  })

  it('throws an error when useUIContent is used outside of its provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestConsumer />)).toThrow(
      'useFooterContent must be used within FooterContentProvider',
    )

    consoleSpy.mockRestore()
  })
})
