import { render, screen } from '@testing-library/react'
import { useUIContent } from '../../context/UIContentProvider'
import Footer from './index'

vi.mock('../../context/UIContentProvider', () => ({
  useUIContent: vi.fn(),
}))

describe('Footer', () => {
  const mockedUseUIContent = vi.mocked(useUIContent)

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-10'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the loading state correctly', () => {
    mockedUseUIContent.mockReturnValue({
      footerData: null,
      headerData: null,
      loading: true,
      error: null,
    })

    render(<Footer />)
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  it('renders the error state correctly', () => {
    const errorMessage = 'Failed to fetch footer'
    mockedUseUIContent.mockReturnValue({
      footerData: null,
      headerData: null,
      loading: false,
      error: errorMessage,
    })

    render(<Footer />)
    expect(
      screen.getByText(new RegExp(`error: ${errorMessage}`, 'i')),
    ).toBeInTheDocument()
  })

  it('renders the copyright with the current year and dynamic data', () => {
    const mockFooterData = {
      description: 'A portfolio built with React 19',
      acknowledgments: 'Special thanks to Strapi and Vitest',
    }
    mockedUseUIContent.mockReturnValue({
      footerData: mockFooterData,
      headerData: null,
      loading: false,
      error: null,
    })

    render(<Footer />)

    // Match the copyright year logic
    expect(screen.getByText(/© 2026 Yanis Kouidri/i)).toBeInTheDocument()

    // FIX: Use Regex matchers to find text even if it's broken by <br />
    // This ignores exact matching and finds the substring within the element
    expect(
      screen.getByText(new RegExp(mockFooterData.description, 'i')),
    ).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(mockFooterData.acknowledgments, 'i')),
    ).toBeInTheDocument()
  })

  it('renders empty strings if data is missing but not loading/error', () => {
    mockedUseUIContent.mockReturnValue({
      footerData: null,
      headerData: null,
      loading: false,
      error: null,
    })

    render(<Footer />)

    expect(screen.getByText(/© 2026/i)).toBeInTheDocument()

    // Ensure the footer wrapper still renders even without dynamic text
    const paragraphs = screen.queryAllByRole('paragraph')
    expect(paragraphs.length).toBeGreaterThan(0)
  })
})
