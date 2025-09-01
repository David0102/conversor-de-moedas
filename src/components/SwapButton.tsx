interface SwapButtonProps {
    onClick: () => void
    className?: string
}

// Botão para trocar moedas de origem e destino
export default function SwapButton({ onClick, className = "" }: SwapButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition-colors ${className}`}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        </button>
    )
}
