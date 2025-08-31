import { useState, useRef, useEffect } from 'react'

interface InputProps {
    label: string
    type?: 'text' | 'number' | 'email' | 'password'
    value: string
    onChange: (value: string) => void
    placeholder?: string
    options?: { value: string; label: string; flag?: string }[]
    className?: string
}

export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    options,
    className = ""
}: InputProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Fechar dropdown ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm('')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options?.find(option => option.value === value)
    const filteredOptions = options?.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-xs sm:text-sm font-normal text-gray-500">
                {label}
            </label>
            {options ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-3 cursor-pointer sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors outline-none text-left flex items-center gap-2"
                    >
                        {selectedOption?.flag && (
                            <span className={`fi fi-${selectedOption.flag}`}></span>
                        )}
                        <span>{selectedOption?.label || 'Selecione uma moeda'}</span>
                        <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                            <div className="p-2 border-b border-gray-100">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar moeda..."
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <div className="max-h-48 overflow-auto">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                onChange(option.value)
                                                setIsOpen(false)
                                                setSearchTerm('')
                                            }}
                                            className="w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-left hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            {option.flag && (
                                                <span className={`fi fi-${option.flag}`}></span>
                                            )}
                                            <span>{option.label}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                        Nenhuma moeda encontrada
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors outline-none"
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}
