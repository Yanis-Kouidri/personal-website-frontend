import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import AddFolderButton from './AddFolderButton'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('lucide-react', () => ({
  // biome-ignore lint/style/useNamingConvention: <Normal here>
  FolderPlus: () => <div data-testid="folder-plus-icon" />,
}))

describe('AddFolderButton', () => {
  const mockProps = {
    folderPath: 'root/documents',
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
    refreshDocs: vi.fn(),
  }

  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.prompt
    vi.stubGlobal('prompt', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('does nothing if the prompt is cancelled or empty', async () => {
    const user = userEvent.setup()
    vi.mocked(window.prompt).mockReturnValue(null) // User clicked cancel

    render(<AddFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('triggers folder creation when a valid name is provided', async () => {
    const user = userEvent.setup()
    const newFolderName = 'New Project'
    vi.mocked(window.prompt).mockReturnValue(newFolderName)

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: 'Success' })
    })

    render(<AddFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/docs/folder',
        method: 'POST',
        data: { folderName: newFolderName, folderPath: 'root/documents' },
      }),
    )

    expect(mockProps.refreshDocs).toHaveBeenCalled()
    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('Folder created !')
  })

  it('handles API errors during folder creation', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Folder already exists'
    vi.mocked(window.prompt).mockReturnValue('Duplicate Folder')

    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.(errorMsg)
    })

    render(<AddFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('')
    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(errorMsg)
  })

  it('displays loading state and disables button during API call', async () => {
    const user = userEvent.setup()
    vi.mocked(window.prompt).mockReturnValue('Loading Folder')

    // Simulate persistent loading
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(<AddFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('...')
    expect(screen.queryByTestId('folder-plus-icon')).not.toBeInTheDocument()
  })
})
