import { useState } from 'react'
import LanguageIcon from '@mui/icons-material/Language'

export default function Navbar() {
    const [language, setLanguage] = useState('pt')

    return (
        <nav className="shadow-lg" style={{ backgroundColor: '#020828' }}>
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-white">
                            {language === 'pt' ? 'Convert Coin' : 'Convert Coin'}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        <LanguageIcon className="text-white" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-gray-700 text-white cursor-pointer px-3 py-1 rounded-lg text-sm font-medium border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="pt">PT</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    )
}