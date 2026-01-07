import axios from 'axios'
import { handleApiRequest } from './apiRequest'

// Mock axios globally for this test suite
vi.mock('axios')

// Mock config to bypass environment variable validation
vi.mock('../utils/config', () => ({
  default: {
    backendUrl: 'https://api-test.com',
  },
}))

describe('handleApiRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call onSuccess with data and manage fetching state lifecycle', async () => {
    const mockData = { name: 'John Doe' }
    vi.mocked(axios).mockResolvedValue({ data: mockData })

    const onSuccess = vi.fn()
    const setIsFetching = vi.fn()

    handleApiRequest({
      apiEndPoint: '/profile',
      method: 'GET',
      credentials: true,
      onSuccess,
      setIsFetching,
    })

    // Wait for the async operation to complete and verify the sequence
    await vi.waitFor(() => {
      expect(setIsFetching).toHaveBeenCalledWith(true)
      expect(onSuccess).toHaveBeenCalledWith(mockData)
      expect(setIsFetching).toHaveBeenCalledWith(false)
    })
  })

  it('should extract the specific backend error message on failure', async () => {
    const errorMessage = 'Invalid credentials'
    vi.mocked(axios).mockRejectedValue({
      response: { data: { message: errorMessage } },
    })

    const onError = vi.fn()

    handleApiRequest({
      apiEndPoint: '/login',
      method: 'POST',
      credentials: true,
      onError,
    })

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledWith(errorMessage)
    })
  })

  it('should fallback to default axios error message if backend message is missing', async () => {
    const fallbackMessage = 'Network Error'
    vi.mocked(axios).mockRejectedValue({
      message: fallbackMessage,
    })

    const onError = vi.fn()

    handleApiRequest({
      apiEndPoint: '/data',
      method: 'GET',
      credentials: false,
      onError,
    })

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledWith(fallbackMessage)
    })
  })
})
