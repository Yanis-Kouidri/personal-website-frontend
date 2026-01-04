import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from './components/error/Error'
import Footer from './components/footer'

/* Components */
import Header from './components/header'
import PublicPgpKey from './components/pgp/PublicPgpKey'
/* Providers */
import { FooterContentProvider } from './context/FooterContentProvider'
import { UserProvider } from './context/UserProvider'
/* Pages */
import About from './pages/about'
import Docs from './pages/docs'
import Home from './pages/home'
import Login from './pages/login'
import Projects from './pages/projects'
import Signup from './pages/signup'
import GlobalStyle from './utils/style/GlobalStyle'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
`

export default function App() {
  return (
    <UserProvider>
      <FooterContentProvider>
        <GlobalStyle />
        <AppContainer>
          <Header />
          <MainContent>
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
          </MainContent>
          <Footer />
        </AppContainer>
      </FooterContentProvider>
    </UserProvider>
  )
}
