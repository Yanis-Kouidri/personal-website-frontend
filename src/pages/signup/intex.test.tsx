import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import Signup from './index'

// Mock the apiRequest helper
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

describe('Signup Component', () => {
  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields and the submit button', () => {
    render(<Signup />)

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/sign-up key/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /s'inscrire/i }),
    ).toBeInTheDocument()
  })

  it('shows an error message if fields are empty on submission', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i })
    await user.click(submitButton)

    expect(screen.getByText(/tous les champs sont requis/i)).toBeInTheDocument()
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('shows an error message if the password is too short', async () => {
    const user = userEvent.setup()
    render(<Signup />)

    await user.type(screen.getByPlaceholderText(/username/i), 'testuser')
    await user.type(screen.getByPlaceholderText(/^password$/i), '1234567')
    await user.type(screen.getByPlaceholderText(/sign-up key/i), 'secret-key')

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i })
    await user.click(submitButton)

    expect(
      screen.getByText(/le mot de passe doit contenir au moins 8 caractères/i),
    ).toBeInTheDocument()
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('handles successful signup', async () => {
    const user = userEvent.setup()
    const successMsg = 'Inscription réussie !'

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: successMsg })
    })

    render(<Signup />)

    await user.type(screen.getByPlaceholderText(/username/i), 'newuser')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'password123')
    await user.type(screen.getByPlaceholderText(/sign-up key/i), 'valid-key')

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i })
    await user.click(submitButton)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/auth/signup',
        method: 'POST',
        data: {
          username: 'newuser',
          password: 'password123',
          signupKey: 'valid-key',
        },
      }),
    )

    await waitFor(() => {
      expect(screen.getByText(successMsg)).toBeInTheDocument()
    })
    expect(
      screen.queryByText(/tous les champs sont requis/i),
    ).not.toBeInTheDocument()
  })

  it('handles API errors during signup', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Clé d’inscription invalide'

    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.(errorMsg)
    })

    render(<Signup />)

    await user.type(screen.getByPlaceholderText(/username/i), 'newuser')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'password123')
    await user.type(screen.getByPlaceholderText(/sign-up key/i), 'wrong-key')

    await user.click(screen.getByRole('button', { name: /s'inscrire/i }))

    await waitFor(() => {
      expect(screen.getByText(errorMsg)).toBeInTheDocument()
    })
    expect(screen.queryByText(/inscription réussie/i)).not.toBeInTheDocument()
  })

  it('disables the submit button and shows loading text while fetching', async () => {
    const user = userEvent.setup()

    // Simulate a request that stays in progress
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(<Signup />)

    await user.type(screen.getByPlaceholderText(/username/i), 'user')
    await user.type(screen.getByPlaceholderText(/^password$/i), 'password')
    await user.type(screen.getByPlaceholderText(/sign-up key/i), 'key')

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/chargement\.\.\./i)
  })
})
