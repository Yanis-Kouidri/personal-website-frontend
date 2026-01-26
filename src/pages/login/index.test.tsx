import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { useUser } from '../../context/contexts'
import { handleApiRequest } from '../../hooks/apiRequest'
import Login from './index'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('../../context/contexts', () => ({
  useUser: vi.fn(),
}))

// Mock navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mocking Loader to avoid a11y role issues seen in previous components
vi.mock('../../utils/style/CommonStyles', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../utils/style/CommonStyles')>()
  return {
    ...actual,
    // biome-ignore lint/style/useNamingConvention: <Normal here>
    Loader: () => <output data-testid="loading-spinner">Chargement...</output>,
  }
})

describe('Login Component', () => {
  const mockedHandleApiRequest = vi.mocked(handleApiRequest)
  const mockedUseUser = vi.mocked(useUser)
  const setUserMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseUser.mockReturnValue({ setUser: setUserMock, user: null })
  })

  it('renders login form fields and submit button', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /se connecter/i }),
    ).toBeInTheDocument()
  })

  it('displays validation error if fields are empty', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    const submitButton = screen.getByRole('button', { name: /se connecter/i })
    await user.click(submitButton)

    expect(
      screen.getByText(/le nom d'utilisateur est requis/i),
    ).toBeInTheDocument()
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('handles successful login and redirects to home', async () => {
    const user = userEvent.setup()
    const mockResponse = {
      message: 'Welcome back!',
      user: { username: 'testuser' },
    }

    mockedHandleApiRequest.mockImplementation(
      ({ onSuccess, setIsFetching }) => {
        setIsFetching?.(false)
        onSuccess?.(mockResponse)
      },
    )

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText(/username/i), 'testuser')
    await user.type(screen.getByPlaceholderText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /se connecter/i }))

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/auth/login',
        method: 'POST',
        data: { username: 'testuser', password: 'password123' },
      }),
    )

    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument()
    expect(setUserMock).toHaveBeenCalledWith('testuser')

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('handles login API error correctly', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Identifiants invalides'

    mockedHandleApiRequest.mockImplementation(({ onError, setIsFetching }) => {
      setIsFetching?.(false)
      onError?.(errorMsg)
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText(/username/i), 'wronguser')
    await user.type(screen.getByPlaceholderText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /se connecter/i }))

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
    })
    expect(setUserMock).not.toHaveBeenCalled()
  })

  it('shows loading state during API request', async () => {
    const user = userEvent.setup()

    // Simulate persistent loading
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText(/username/i), 'user')
    await user.type(screen.getByPlaceholderText(/password/i), 'pass')
    await user.click(screen.getByRole('button', { name: /se connecter/i }))

    const submitButton = screen.getByRole('button')
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/chargement\.\.\./i)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
