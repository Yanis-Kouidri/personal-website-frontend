import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import DeleteFileButton from './DeleteFileButton'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('lucide-react', () => ({
  // biome-ignore lint/style/useNamingConvention: <Normal here>
  Trash2: () => <div data-testid="trash-icon" />,
}))

describe('DeleteFileButton', () => {
  const mockProps = {
    filePath: 'folder/document.pdf',
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
    refreshDocs: vi.fn(),
  }

  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock globalThis.confirm
    vi.stubGlobal('confirm', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('does nothing if the user cancels the confirmation dialog', async () => {
    const user = userEvent.setup()
    vi.mocked(globalThis.confirm).mockReturnValue(false)

    render(<DeleteFileButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(globalThis.confirm).toHaveBeenCalledWith(
      expect.stringContaining(mockProps.filePath),
    )
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('triggers file deletion when the user confirms', async () => {
    const user = userEvent.setup()
    vi.mocked(globalThis.confirm).mockReturnValue(true)

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: 'Success' })
    })

    render(<DeleteFileButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/docs',
        method: 'DELETE',
        data: { path: mockProps.filePath },
        credentials: true,
      }),
    )

    expect(mockProps.refreshDocs).toHaveBeenCalled()
    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('File deleted !')
  })

  it('handles API errors during deletion', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Permission denied'
    vi.mocked(globalThis.confirm).mockReturnValue(true)

    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.(errorMsg)
    })

    render(<DeleteFileButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('')
    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(errorMsg)
  })

  it('displays loading state and disables button during deletion', async () => {
    const user = userEvent.setup()
    vi.mocked(globalThis.confirm).mockReturnValue(true)

    // Simulate persistent loading state
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(<DeleteFileButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('...')
    expect(screen.queryByTestId('trash-icon')).not.toBeInTheDocument()
  })
})
