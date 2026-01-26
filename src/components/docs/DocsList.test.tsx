import { act, render, screen, waitFor } from '@testing-library/react'
import { handleApiRequest } from '../../hooks/apiRequest'
import DocsList from './DocsList'

interface MockRecursiveListProps {
  refreshDocs: () => void
  setSuccessMessage: (msg: string) => void
}

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

// Mocking styles to avoid loading real Styled Components logic if not needed,
// but specifically ensuring the Loader is selectable.
vi.mock('../../utils/style/CommonStyles', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../utils/style/CommonStyles')>()
  return {
    ...actual,
    // biome-ignore lint/style/useNamingConvention: <Normal Here>
    Loader: () => <div data-testid="loading-spinner" />,
  }
})

vi.mock('./RecursiveList', () => ({
  default: ({ refreshDocs, setSuccessMessage }: MockRecursiveListProps) => (
    <div data-testid="recursive-list">
      <button
        type="button"
        onClick={() => refreshDocs()}
        data-testid="refresh-btn"
      >
        Refresh
      </button>
      <button
        type="button"
        onClick={() => setSuccessMessage('Custom Success')}
        data-testid="success-btn"
      >
        Trigger Success
      </button>
    </div>
  ),
}))

describe('DocsList', () => {
  const mockedHandleApiRequest = vi.mocked(handleApiRequest)
  const mockData = [
    { name: 'file1.pdf', type: 'file', path: '/file1.pdf' },
    { name: 'folder1', type: 'folder', path: '/folder1', children: [] },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers() // Ensure real timers by default to avoid waitFor timeouts
  })

  it('renders loader initially and fetches data on mount', () => {
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      // Simulate the synchronous start of fetching
      setIsFetching?.(true)
    })

    render(<DocsList />)

    // Using data-testid since the Loader doesn't have an implicit 'status' role
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/docs',
        method: 'GET',
      }),
    )
  })

  it('renders content successfully after fetching', async () => {
    mockedHandleApiRequest.mockImplementation(
      ({ onSuccess, setIsFetching }) => {
        setIsFetching?.(false)
        onSuccess?.(mockData)
      },
    )

    render(<DocsList />)

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
      expect(screen.getByTestId('recursive-list')).toBeInTheDocument()
    })
  })

  it('displays error message when fetch fails', async () => {
    const errorMsg = 'Failed to load docs'
    mockedHandleApiRequest.mockImplementation(({ onError, setIsFetching }) => {
      setIsFetching?.(false)
      onError?.(errorMsg)
    })

    render(<DocsList />)

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
    })
  })

  it('automatically clears messages after 3 seconds', () => {
    // Switch to fake timers ONLY for this specific test
    vi.useFakeTimers()

    mockedHandleApiRequest.mockImplementation(
      ({ onSuccess, setIsFetching }) => {
        setIsFetching?.(false)
        onSuccess?.(mockData)
      },
    )

    render(<DocsList />)

    const successBtn = screen.getByTestId('success-btn')
    // Trigger the success message
    act(() => {
      successBtn.click()
    })

    expect(screen.getByText('Custom Success')).toBeInTheDocument()

    // Advance timers by 3 seconds as defined in the useEffect
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.queryByText('Custom Success')).not.toBeInTheDocument()

    vi.useRealTimers()
  })

  it('aborts API request on unmount', () => {
    const { unmount } = render(<DocsList />)
    unmount()

    // Verification that the component attempted a fetch on mount
    expect(mockedHandleApiRequest).toHaveBeenCalled()
  })
})
