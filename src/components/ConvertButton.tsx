interface ConvertButtonProps {
    onClick: () => void
    isLoading: boolean
    loadingText: string
    text: string
    className?: string
}

// Botão de conversão com estado de loading
export default function ConvertButton({
    onClick,
    isLoading,
    loadingText,
    text,
    className = ""
}: ConvertButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 text-base rounded-lg transition-colors flex items-center gap-2 mx-auto ${className}`}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isLoading ? loadingText : text}
        </button>
    )
}
