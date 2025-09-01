interface SectionHeaderProps {
    title: string
    description?: string
    note?: string
    className?: string
}

// Cabeçalho reutilizável para seções da aplicação
export default function SectionHeader({ title, description, note, className = "" }: SectionHeaderProps) {
    return (
        <div className={`text-center mb-12 ${className}`}>
            <h2 className="text-4xl font-bold text-white mb-4">
                {title}
            </h2>
            {description && (
                <p className="text-xl text-gray-200 mb-2">
                    {description}
                </p>
            )}
            {note && (
                <p className="text-sm text-gray-300 italic">
                    {note}
                </p>
            )}
        </div>
    )
}
