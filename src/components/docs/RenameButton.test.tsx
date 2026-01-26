import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import RenameButton from './RenameButton'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

vi.mock('lucide-react', () => ({
  // biome-ignore lint/style/useNamingConvention: <Normal here>
  TextCursorInput: () => <div data-testid="rename-icon" />,
}))

describe('RenameButton', () => {
  const mockProps = {
    itemPath: 'folder/old-name.txt',
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

  it('sets an error message if the prompt is cancelled or empty', async () => {
    const user = userEvent.setup()
    // Simulate clicking cancel or entering nothing
    vi.mocked(window.prompt).mockReturnValue(null)

    render(<RenameButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(
      'You must fill a name',
    )
    expect(mockedHandleApiRequest).not.toHaveBeenCalled()
  })

  it('triggers the rename API request with a trimmed name', async () => {
    const user = userEvent.setup()
    const newNameInput = '  new-name.txt  '
    vi.mocked(window.prompt).mockReturnValue(newNameInput)

    mockedHandleApiRequest.mockImplementation(({ onSuccess }) => {
      onSuccess?.({ message: 'Success' })
    })

    render(<RenameButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: '/api/docs/rename',
        method: 'PATCH',
        data: { itemPath: 'folder/old-name.txt', newName: 'new-name.txt' },
        credentials: true,
      }),
    )

    expect(mockProps.refreshDocs).toHaveBeenCalled()
    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('Item renamed !')
  })

  it('handles API errors during renaming', async () => {
    const user = userEvent.setup()
    const errorMsg = 'Access Denied'
    vi.mocked(window.prompt).mockReturnValue('valid-name')

    mockedHandleApiRequest.mockImplementation(({ onError }) => {
      onError?.(errorMsg)
    })

    render(<RenameButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('')
    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(errorMsg)
  })

  it('displays loading state and disables the button during the request', async () => {
    const user = userEvent.setup()
    vi.mocked(window.prompt).mockReturnValue('loading-test')

    // Simulate persistent loading state
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    render(<RenameButton {...mockProps} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('...')
    expect(screen.queryByTestId('rename-icon')).not.toBeInTheDocument()
  })
})
