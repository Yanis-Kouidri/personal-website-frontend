import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useUser } from '../../context/contexts'
import { useUIContent } from '../../context/UIContentProvider'
import { handleApiRequest } from '../../hooks/apiRequest'
import Header from './index'

// Mock dependencies
vi.mock('../../context/UIContentProvider', () => ({
  useUIContent: vi.fn(),
}))

vi.mock('../../context/contexts', () => ({
  useUser: vi.fn(),
}))

vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

describe('Header Component', () => {
  const mockedUseUIContent = vi.mocked(useUIContent)
  const mockedUseUser = vi.mocked(useUser)
  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  const mockHeaderData = {
    home: 'Accueil',
    projects: 'Projets',
    documentations: 'Docs',
    about: 'A propos',
    login: 'Connexion',
    signup: 'Inscription',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state when UI content is fetching', () => {
    mockedUseUIContent.mockReturnValue({
      headerData: null,
      loading: true,
      error: null,
      footerData: null,
    })
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('renders error state when UI content fetch fails', () => {
    mockedUseUIContent.mockReturnValue({
      headerData: null,
      loading: false,
      error: 'Failed to load',
      footerData: null,
    })
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument()
  })

  it('renders navigation links and auth buttons for guest users', () => {
    mockedUseUIContent.mockReturnValue({
      headerData: mockHeaderData,
      loading: false,
      error: null,
      footerData: null,
    })
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    // Verify navigation links from Strapi
    expect(screen.getByText('Accueil')).toHaveAttribute('href', '/')
    expect(screen.getByText('Projets')).toHaveAttribute('href', '/projects')

    // Verify Auth buttons
    expect(screen.getByText('Connexion')).toHaveAttribute('href', '/login')
    expect(screen.getByText('Inscription')).toHaveAttribute('href', '/sign-up')
  })

  it('renders user welcome message and logout button when authenticated', () => {
    mockedUseUIContent.mockReturnValue({
      headerData: mockHeaderData,
      loading: false,
      error: null,
      footerData: null,
    })
    mockedUseUser.mockReturnValue({ user: 'Yanis', setUser: vi.fn() })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText('Bonjour Yanis')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /deconnexion/i }),
    ).toBeInTheDocument()

    // Login/Signup should not be visible
    expect(screen.queryByText('Connexion')).not.toBeInTheDocument()
  })

  it('handles logout successfully', async () => {
    const setUserMock = vi.fn()
    mockedUseUIContent.mockReturnValue({
      headerData: mockHeaderData,
      loading: false,
      error: null,
      footerData: null,
    })
    mockedUseUser.mockReturnValue({ user: 'Yanis', setUser: setUserMock })

    // Simulate successful API logout
    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: 'Logged out' })
    })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const logoutButton = screen.getByRole('button', { name: /deconnexion/i })
    fireEvent.click(logoutButton)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/auth/logout',
        method: 'POST',
      }),
    )

    await waitFor(() => {
      expect(setUserMock).toHaveBeenCalledWith(null)
    })
  })
})
