import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ErrorPage from './Error'

describe('ErrorPage', () => {
  it('renders the 404 error code and correct text messages', () => {
    // Arrange & Act
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    )

    // Assert
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page introuvable')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Désolé, la page que vous recherchez n'existe pas ou a été déplacée\./i,
      ),
    ).toBeInTheDocument()
  })

  it('renders a link that redirects back to the home page', () => {
    // Arrange & Act
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    )

    // Assert
    const link = screen.getByRole('link', { name: /retour à l'accueil/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
