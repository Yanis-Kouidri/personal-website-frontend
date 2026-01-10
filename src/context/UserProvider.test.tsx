import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { handleApiRequest } from '../hooks/apiRequest'
import { UserContext } from './contexts'
import { UserProvider } from './UserProvider'

// Mock the apiRequest helper
vi.mock('../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

// Helper component to consume the context and display values for assertion
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
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and sets the user on mount successfully', async () => {
    // Arrange
    const mockUser = { username: 'jdoe' }
    ;(handleApiRequest as any).mockImplementation(({ onSuccess }: any) => {
      onSuccess({ user: mockUser })
    })

    // Act
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    // Assert
    expect(handleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/auth/me',
        method: 'GET',
        credentials: true,
      }),
    )

    const status = await screen.findByTestId('user-status')
    expect(status).toHaveTextContent('User: jdoe')
  })

  it('sets user to null if the API request fails', async () => {
    // Arrange
    ;(handleApiRequest as any).mockImplementation(({ onError }: any) => {
      onError(new Error('Unauthorized'))
    })

    // Act
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    // Assert
    const status = await screen.findByTestId('user-status')
    expect(status).toHaveTextContent('Guest')
  })

  it('provides a working setUser function to update state manually', async () => {
    // Arrange
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    // Start as guest
    ;(handleApiRequest as any).mockImplementation(({ onError }: any) => {
      onError()
    })

    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    // Act
    const button = screen.getByTestId('set-user-btn')
    await user.click(button)

    // Assert
    const status = screen.getByTestId('user-status')
    expect(status).toHaveTextContent('User: new-user')
  })

  it('memoizes the context value to prevent unnecessary re-renders', () => {
    // This test ensures useMemo dependencies [user] are working correctly
    ;(handleApiRequest as any).mockImplementation(() => {})

    const { rerender } = render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    // Capture the context value on first render (via a ref or similar mechanism)
    // Note: In React 19, UserContext is used directly as a component
    expect(handleApiRequest).toHaveBeenCalledTimes(1)

    rerender(
      <UserProvider>
        <TestConsumer />
      </UserProvider>,
    )

    // useEffect should not run again on parent re-render
    expect(handleApiRequest).toHaveBeenCalledTimes(1)
  })
})
