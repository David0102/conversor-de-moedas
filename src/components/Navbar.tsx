import LanguageIcon from '@mui/icons-material/Language'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../constants/translations'

export default function Navbar() {
    const { language, setLanguage } = useLanguage()

    return (
        <nav className="shadow-lg" style={{ backgroundColor: '#020828' }}>
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-white">
                            {translations[language].appTitle}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        <LanguageIcon className="text-white" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'pt' | 'en')}
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