import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PruebaConexion from './componentes/desarrollo/PruebaConexion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PruebaConexion />
    </>
  )
}

export default App
