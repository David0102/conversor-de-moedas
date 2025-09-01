import { useState, useEffect } from 'react'
import ExchangeRateCard from './ExchangeRateCard'
import currencyService from '../services/currencyService'
import type { Rate } from '../types/rate'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../constants/translations'

export default function ExchangeRateSection() {
    const { language } = useLanguage()
    const [rates, setRates] = useState<Rate[]>([])
    const [loading, setLoading] = useState(true)

    // Carrega as taxas de câmbio
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const data = await currencyService.getExchangeRates()
                setRates(data)
            } catch (error) {
                console.error('Erro ao carregar taxas:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRates()
    }, [])

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        {translations[language].exchangeRates}
                    </h2>
                    <p className="text-xl text-gray-200 mb-2">
                        {translations[language].exchangeRatesDescription}
                    </p>
                    <p className="text-sm text-gray-300 italic">
                        {translations[language].exchangeRatesNote}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                        {rates.map((rate) => (
                            <ExchangeRateCard
                                key={rate.currency}
                                currency={rate.currency}
                                rate={rate.rate}
                                flag={rate.flag}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
