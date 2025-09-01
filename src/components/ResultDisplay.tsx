interface ResultDisplayProps {
    result: string
    toCurrency: string
    className?: string
}

// Exibe o resultado da conversão de moedas
export default function ResultDisplay({ result, toCurrency, className = "" }: ResultDisplayProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-normal text-gray-500">
                Result
            </label>
            <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-lg font-semibold text-blue-600">
                {result ? `${Number(result).toFixed(2)} ${toCurrency}` : '0.00'}
            </div>
        </div>
    )
}
