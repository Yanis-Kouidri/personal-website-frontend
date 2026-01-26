import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApiRequest } from '../../hooks/apiRequest'
import AddFileButton from './AddFileButton'

// Mock dependencies
vi.mock('../../hooks/apiRequest', () => ({
  handleApiRequest: vi.fn(),
}))

// Mock lucide-react with quoted keys to satisfy Biome
vi.mock('lucide-react', () => ({
  // biome-ignore lint/style/useNamingConvention: <It's normal here>
  FilePlus: () => <div data-testid="file-plus-icon" />,
}))

describe('AddFileButton', () => {
  const mockProps = {
    folderPath: 'test-folder',
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
    refreshDocs: vi.fn(),
  }

  const mockedHandleApiRequest = vi.mocked(handleApiRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('triggers the hidden file input when the button is clicked', async () => {
    const user = userEvent.setup()
    // We destructure container to query the hidden input directly
    const { container } = render(<AddFileButton {...mockProps} />)

    const button = screen.getByRole('button')
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement

    // Create a spy on the click method
    const clickSpy = vi.spyOn(fileInput, 'click')

    await user.click(button)

    expect(clickSpy).toHaveBeenCalled()
  })

  it('handles successful file upload', async () => {
    const user = userEvent.setup()
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    mockedHandleApiRequest.mockImplementation(
      ({ onSuccess, setIsFetching }) => {
        setIsFetching?.(true)
        setIsFetching?.(false)
        onSuccess?.({ message: 'Success' })
      },
    )

    const { container } = render(<AddFileButton {...mockProps} />)
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement

    // Select file using user-event upload
    await user.upload(fileInput, file)

    expect(mockedHandleApiRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        apiEndPoint: `/api/docs?path=${encodeURIComponent('test-folder')}`,
        method: 'POST',
        data: expect.any(FormData),
      }),
    )

    const formData = mockedHandleApiRequest.mock.calls[0][0].data as FormData
    expect(formData.get('file')).toBe(file)
    expect(mockProps.refreshDocs).toHaveBeenCalled()
    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('File upload !')
  })

  it('handles API error correctly', async () => {
    const user = userEvent.setup()
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const errorMsg = 'Upload failed'

    mockedHandleApiRequest.mockImplementation(({ onError, setIsFetching }) => {
      setIsFetching?.(false)
      onError?.(errorMsg)
    })

    const { container } = render(<AddFileButton {...mockProps} />)
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement

    await user.upload(fileInput, file)

    expect(mockProps.setSuccessMessage).toHaveBeenCalledWith('')
    expect(mockProps.setErrorMessage).toHaveBeenCalledWith(errorMsg)
  })

  it('displays loading state and disables button during upload', async () => {
    mockedHandleApiRequest.mockImplementation(({ setIsFetching }) => {
      setIsFetching?.(true)
    })

    const user = userEvent.setup()
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    const { container } = render(<AddFileButton {...mockProps} />)
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement

    await user.upload(fileInput, file)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('...')
    expect(screen.queryByTestId('file-plus-icon')).not.toBeInTheDocument()
  })
})
