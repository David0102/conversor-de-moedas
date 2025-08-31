interface ExchangeRateCardProps {
    currency: string
    rate: number
    flag: string
}

export default function ExchangeRateCard({ currency, rate, flag }: ExchangeRateCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100">
            <div className="text-center">
                <div className="w-12 h-8 mx-auto mb-3 rounded-lg overflow-hidden shadow-sm">
                    <img
                        src={`https://flagcdn.com/w80/${flag}.png`}
                        alt={`${currency} flag`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">
                    {currency}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                    {rate.toFixed(2)}
                </div>
            </div>
        </div>
    )
}
