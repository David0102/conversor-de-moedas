interface InputProps {
    label: string
    type?: 'text' | 'number' | 'email' | 'password'
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    className = ""
}: InputProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-xs sm:text-sm font-normal text-gray-500">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors outline-none"
                placeholder={placeholder}
            />
        </div>
    )
}
