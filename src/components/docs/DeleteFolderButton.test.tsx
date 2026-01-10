import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import DeleteFolderButton from './DeleteFolderButton'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('lucide-react', () => ({
  // biome-ignore lint/style/useNamingConvention: <Normal here>
  Trash2: () => <div data-testid="trash-icon" />,
}))

describe('DeleteFolderButton', () => {
  const mockProps = {
    folderPath: 'projects/2024',
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
    refreshDocs: vi.fn(),
  }

  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock global confirm dialog
    vi.stubGlobal('confirm', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('does nothing if the user cancels the confirmation', async () => {
    const user = userEvent.setup()
    vi.mocked(window.confirm).mockReturnValue(false)

    render(<DeleteFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining(mockProps.folderPath),
    )
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('triggers folder deletion when user confirms', async () => {
    const user = userEvent.setup()
    vi.mocked(window.confirm).mockReturnValue(true)

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: 'Success' })
    })

    render(<DeleteFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/docs',
        method: 'DELETE',
        data: { path: mockProps.folderPath },
        credentials: true,
      }),
    )

    expect(mockProps.refreshDocs).toHaveBeenCalled()
    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('Folder deleted !')
  })

  it('handles API error correctly', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Folder is not empty'
    vi.mocked(window.confirm).mockReturnValue(true)

    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.(errorMsg)
    })

    render(<DeleteFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('')
    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(errorMsg)
  })

  it('disables the button while deletion is in progress', async () => {
    const user = userEvent.setup()
    vi.mocked(window.confirm).mockReturnValue(true)

    // Simulate persistent loading state
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(<DeleteFolderButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toBeDisabled()
  })
})
