import { useState } from 'react'
import Card from './Card'
import Input from './Input'
import { currencies } from '../constants/currencies'
import currencyService from '../services/currencyService'
import toast from 'react-hot-toast'

export default function ConvertSection() {
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
        if (isNaN(parsed)) return 0
        if (parsed < 0) return 0
        return parsed
    }

    // Opções de moedas
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
            toast.error('Erro ao converter moeda')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Conversor de Moedas
                    </h2>
                    <p className="text-xl text-gray-200">
                        Converta valores entre diferentes moedas
                    </p>
                </div>

                <Card>
                    <div className="space-y-6">
                        <div className="flex items-end gap-4">
                            <div className="flex-1">
                                <Input
                                    label="De"
                                    value={fromCurrency}
                                    onChange={setFromCurrency}
                                    options={currencyOptions}
                                />
                            </div>

                            <button
                                onClick={() => {
                                    const temp = fromCurrency
                                    setFromCurrency(toCurrency)
                                    setToCurrency(temp)
                                    setAmount('')
                                    setResult('')
                                }}
                                className="p-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </button>

                            <div className="flex-1">
                                <Input
                                    label="Para"
                                    value={toCurrency}
                                    onChange={setToCurrency}
                                    options={currencyOptions}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Valor"
                                type="number"
                                value={amount}
                                onChange={setAmount}
                                placeholder="Digite o valor"
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-normal text-gray-500">
                                    Resultado
                                </label>
                                <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-lg font-semibold text-blue-600">
                                    {result ? `${Number(result).toFixed(2)} ${toCurrency}` : '0.00'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleConvert}
                            disabled={isLoading}
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 text-base rounded-lg transition-colors flex items-center gap-2 mx-auto"
                        >
                            {isLoading && (
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isLoading ? 'Convertendo...' : 'Converter'}
                        </button>
                    </div>
                </Card>
            </div>
        </section>
    )
}
