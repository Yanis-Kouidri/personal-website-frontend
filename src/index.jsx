import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/home"
import Header from "./components/header"
import Docs from "./pages/docs"
import Projects from "./pages/projects"
import About from "./pages/about"
import Error from "./components/error/Error"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
