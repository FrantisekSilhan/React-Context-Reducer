import { useContext } from 'react'
import './App.css'

import { ThemeContext } from "./providers/ThemeProvider"
import ShoppingCart from './components/ShoppingCart'

function App() {
  const data = useContext(ThemeContext);
  
  data.toggleTheme();

  data.theme

  return (
    <>
      <div style={
        {
          backgroundColor: data.theme === "Light" ? "white" : "black",
          color: data.theme === "Light" ? "black" : "white"
        }
      }>
        <button onClick={() => {data.toggleTheme()}}></button>
        <ShoppingCart />
      </div>
    </>
  )
}

export default App
