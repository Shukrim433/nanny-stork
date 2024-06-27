import React from "react"
import { Outlet } from 'react-router-dom'
import "./styles/App.css"

function App() {
  return (
<main>
  <Outlet />
</main>
  );
}

export default App