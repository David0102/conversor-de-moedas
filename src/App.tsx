import Navbar from "./components/Navbar"
import ConvertSection from "./components/ConvertSection"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ConvertSection />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
