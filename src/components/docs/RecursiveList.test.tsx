/** biome-ignore-all lint/style/useNamingConvention: <Normale here> */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useUser } from '../../context/contexts'
import type { FolderContent } from './RecursiveList'
import RecursiveList from './RecursiveList'

// Mock dependencies
vi.mock('../../context/contexts', () => ({
  useUser: vi.fn(),
}))

// Mock config to prevent the "Field backendUrl is empty" error
vi.mock('../../utils/config', () => ({
  default: {
    backendUrl: 'http://localhost:1337',
    docsRoute: '/uploads',
  },
}))

// Mock child components
vi.mock('./AddFileButton', () => ({
  default: () => <button type="button">Add File</button>,
}))
vi.mock('./AddFolderButton', () => ({
  default: () => <button type="button">Add Folder</button>,
}))
vi.mock('./DeleteFileButton', () => ({
  default: () => <button type="button">Delete File</button>,
}))
vi.mock('./DeleteFolderButton', () => ({
  default: () => <button type="button">Delete Folder</button>,
}))
vi.mock('./RenameButton', () => ({
  default: () => <button type="button">Rename</button>,
}))

// Mock icons
vi.mock('lucide-react', () => ({
  File: () => <div data-testid="file-icon" />,
  FolderClosed: () => <div data-testid="folder-closed-icon" />,
  FolderOpen: () => <div data-testid="folder-open-icon" />,
}))

describe('RecursiveList', () => {
  const mockProps = {
    folderContent: [
      { type: 'file', name: 'resume.pdf', path: 'resume.pdf' },
      {
        type: 'directory',
        name: 'Work',
        path: 'work',
        contents: [{ type: 'file', name: 'notes.txt', path: 'work/notes.txt' }],
      },
    ],
    setErrorMessage: vi.fn(),
    setSuccessMessage: vi.fn(),
    refreshDocs: vi.fn(),
    depth: 0,
  }

  const mockedUseUser = vi.mocked(useUser)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders files with correct href attributes', () => {
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(<RecursiveList {...mockProps} />)

    const fileLink = screen.getByRole('link', { name: /resume\.pdf/i })
    // Verify the URL construction: backendUrl + docsRoute + path
    expect(fileLink).toHaveAttribute(
      'href',
      'http://localhost:1337/uploads/resume.pdf',
    )
  })

  it('renders files and folders correctly for a guest user', () => {
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(<RecursiveList {...mockProps} />)

    expect(screen.getByText('resume.pdf')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()

    // Action buttons should NOT be present for guest
    expect(screen.queryByText('Rename')).not.toBeInTheDocument()
  })

  it('renders action buttons when a user is authenticated', () => {
    mockedUseUser.mockReturnValue({ user: 'admin', setUser: vi.fn() })

    render(<RecursiveList {...mockProps} />)

    // Buttons appear because user is truthy
    expect(screen.getAllByText('Rename').length).toBeGreaterThan(0)
    expect(screen.getByText('Add Folder')).toBeInTheDocument()
  })

  it('toggles folder expansion on click', async () => {
    const user = userEvent.setup()
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    render(<RecursiveList {...mockProps} />)

    // Child content should be hidden initially
    expect(screen.queryByText('notes.txt')).not.toBeInTheDocument()

    const folderItem = screen.getByText('Work')

    // Act: Expand
    await user.click(folderItem)
    expect(screen.getByText('notes.txt')).toBeInTheDocument()
    expect(screen.getByTestId('folder-open-icon')).toBeInTheDocument()

    // Act: Collapse
    await user.click(folderItem)
    expect(screen.queryByText('notes.txt')).not.toBeInTheDocument()
  })

  it('logs an error when an unknown item type is encountered', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedUseUser.mockReturnValue({ user: null, setUser: vi.fn() })

    // Define corrupted data as unknown first to satisfy Biome/TS
    const corruptedContent = [
      { type: 'invalid', name: 'bad', path: 'bad' },
    ] as unknown as FolderContent

    render(<RecursiveList {...mockProps} folderContent={corruptedContent} />)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown item type: invalid'),
    )
    consoleSpy.mockRestore()
  })
})
