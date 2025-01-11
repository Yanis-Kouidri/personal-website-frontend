import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/home"
import Header from "./components/header"
import Footer from "./components/footer"
import Docs from "./pages/docs"
import Projects from "./pages/projects"
import About from "./pages/about"
import Login from "./pages/login"
import Signup from "./pages/signup"
import PublicPgpKey from "./components/pgp/PublicPgpKey"
import Error from "./components/error/Error"
import GlobalStyle from "./utils/style/GlobalStyle"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
`

const basename = process.env.REACT_APP_BASENAME || ""

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
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
            <Route path="*" element={<Error />} />
          </Routes>
        </Content>
        <Footer />
      </Container>
    </Router>
  </React.StrictMode>,
)
