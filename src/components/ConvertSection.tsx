import { useState } from 'react'
import Card from './Card'
import Input from './Input'
import CurrencySelect from './CurrencySelect'
import SwapButton from './SwapButton'
import ResultDisplay from './ResultDisplay'
import ConvertButton from './ConvertButton'
import SectionHeader from './SectionHeader'
import { currencies } from '../constants/currencies'
import currencyService from '../services/currencyService'
import toast from 'react-hot-toast'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../constants/translations'

export default function ConvertSection() {
    const { language } = useLanguage()
    const [amount, setAmount] = useState('')
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('BRL')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState('')

    // Converte string em número válido
    const parseAmount = (value: string): number => {
        if (!value || value === '') return 0
        const normalizedValue = value.replace(',', '.')
        const parsed = parseFloat(normalizedValue)
        if (isNaN(parsed) || parsed < 0) return 0
        return parsed
    }

    // Opções de moedas formatadas
    const currencyOptions = currencies.map(currency => ({
        value: currency.currencyAcronym,
        label: currency.currencyAcronym,
        flag: currency.currencyFlag
    }))

    // Realiza a conversão de moedas
    const handleConvert = async () => {
        const numericAmount = parseAmount(amount)

        if (numericAmount === 0) {
            setResult('')
            return
        }

        if (fromCurrency === toCurrency) {
            setResult(amount)
            return
        }

        try {
            setIsLoading(true)
            setResult('')
            const response = await currencyService.convertCurrency(fromCurrency, toCurrency, numericAmount)
            setResult(response)
        } catch (error) {
            console.error(`Erro ao converter moeda: ${error}`)
            toast.error(translations[language].errorConverting)
        } finally {
            setIsLoading(false)
        }
    }

    // Troca as moedas de origem e destino
    const handleSwap = () => {
        const temp = fromCurrency
        setFromCurrency(toCurrency)
        setToCurrency(temp)
        setAmount('')
        setResult('')
    }

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={translations[language].currencyConverter}
                    description={translations[language].convertDescription}
                />

                <Card>
                    <div className="space-y-6">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <CurrencySelect
                                    label={translations[language].from}
                                    value={fromCurrency}
                                    onChange={setFromCurrency}
                                    options={currencyOptions}
                                />
                            </div>

                            <SwapButton onClick={handleSwap} />

                            <div className="flex-1">
                                <CurrencySelect
                                    label={translations[language].to}
                                    value={toCurrency}
                                    onChange={setToCurrency}
                                    options={currencyOptions}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label={translations[language].value}
                                type="number"
                                value={amount}
                                onChange={setAmount}
                                placeholder={translations[language].enterValue}
                            />

                            <ResultDisplay
                                result={result}
                                toCurrency={toCurrency}
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <ConvertButton
                            onClick={handleConvert}
                            isLoading={isLoading}
                            loadingText={translations[language].converting}
                            text={translations[language].convert}
                        />
                    </div>
                </Card>
            </div>
        </section>
    )
}
