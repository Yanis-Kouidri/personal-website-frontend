import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/home"
import Header from "./components/header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
