import Navbar from "./components/Navbar"
import ConvertSection from "./components/ConvertSection"
import { Toaster } from 'react-hot-toast'
import ExchangeRateSection from "./components/ExchangeRateSection"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div style={{ background: 'linear-gradient(180deg, #020828 0%, #0A146E 100%)' }}>
        <ConvertSection />
        <ExchangeRateSection />
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
