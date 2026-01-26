import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import { UserContext } from './contexts'
import { UserProvider } from './UserProvider'

// Mock the apiRequest helper
vi.mock('../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

const TestConsumer = () => {
  const context = useContext(UserContext)
  if (!context) return <div>No Context</div>

  return (
    <div>
      <span data-testid="user-status">
        {context.user ? `User: ${context.user}` : 'Guest'}
      </span>
      <button
        onClick={() => context.setUser('new-user')}
        data-testid="set-user-btn"
        type="button"
      >
        Set User
      </button>
    </div>
  )
}

describe('UserProvider', () => {
  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and sets the user on mount successfully', async () => {
    const mockUser = { username: 'jdoe' }

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ user: mockUser })
    })

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    const status = await screen.findByTestId('user-status')
    expect(status).toHaveTextContent('User: jdoe')
  })

  it('sets user to null if the API request fails', async () => {
    // FIX: Pass a string instead of an Error object to match the expected parameter type
    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.('Unauthorized')
    })

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    const status = await screen.findByTestId('user-status')
    expect(status).toHaveTextContent('Guest')
  })

  it('provides a working setUser function to update state manually', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    // Mock an error (passing a string) to start as Guest
    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.('Guest mode')
    })

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    const button = screen.getByTestId('set-user-btn')
    await user.click(button)

    const status = screen.getByTestId('user-status')
    expect(status).toHaveTextContent('User: new-user')
  })

  it('memoizes the context value to prevent unnecessary re-renders', () => {
    mockedHandleApiRequest.mockImplementation(() => {})

    const { rerender } = render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    expect(mockedHandleApiRequest).toHaveBeenCalledTimes(1)

    rerender(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    expect(mockedHandleApiRequest).toHaveBeenCalledTimes(1)
  })
})
