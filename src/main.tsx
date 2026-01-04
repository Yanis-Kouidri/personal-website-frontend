import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from './components/error/Error'
import Footer from './components/footer'
import Header from './components/header'
import PublicPgpKey from './components/pgp/PublicPgpKey'
import { FooterContentProvider } from './context/FooterContentProvider'
import { UserProvider } from './context/UserProvider'
import About from './pages/about'
import Docs from './pages/docs'
import Home from './pages/home'
import Login from './pages/login'
import Projects from './pages/projects'
import Signup from './pages/signup'
import GlobalStyle from './utils/style/GlobalStyle'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
`

const basename: string = import.meta.env.VITE_BASENAME || ''

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <UserProvider>
      <FooterContentProvider>
        <Router basename={basename}>
          <GlobalStyle />
          <Container>
            <Content>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/pgp" element={<PublicPgpKey />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Content>
            <Footer />
          </Container>
        </Router>
      </FooterContentProvider>
    </UserProvider>
  </React.StrictMode>,
)
