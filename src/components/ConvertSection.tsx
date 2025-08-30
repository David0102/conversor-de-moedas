import { useState } from 'react'
import Card from './Card'
import Input from './Input'
import { currencies } from '../constants/currencies'

export default function ConvertSection() {
    const [amount, setAmount] = useState('')
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('BRL')
    const [result, setResult] = useState('')

    const currencyOptions = currencies.map(currency => ({
        value: currency.currencyAcronym,
        label: currency.currencyAcronym,
        flag: currency.currencyFlag
    }))

    const handleConvert = () => {
        const numAmount = parseFloat(amount)
        if (isNaN(numAmount)) return

        const rates: { [key: string]: number } = {
            USD: 1.00,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110.25,
            BRL: 5.20
        }

        const convertedAmount = (numAmount * rates[toCurrency]) / rates[fromCurrency]
        setResult(convertedAmount.toFixed(2))
    }

    return (
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #020828 0%, #0A146E 100%)' }}>
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
                                }}
                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
                                    {result ? `${result} ${toCurrency}` : '0.00'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleConvert}
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-8 text-base rounded-lg transition-colors"
                        >
                            Converter
                        </button>
                    </div>
                </Card>
            </div>
        </section>
    )
}
