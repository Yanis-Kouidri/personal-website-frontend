import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./pages/home"
import Header from "./components/header"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Header />
    <Home />
  </React.StrictMode>,
)
