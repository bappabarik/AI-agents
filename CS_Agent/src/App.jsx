import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import ChatInterface from './components/ChatInterface'
import FAQSection from './components/FAQSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FAQSection />
      <ChatInterface />
    </>
  )
}

export default App
