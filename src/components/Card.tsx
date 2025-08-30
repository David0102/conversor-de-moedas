interface CardProps {
    children: React.ReactNode
    className?: string
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white rounded-2xl p-10 shadow-lg border border-gray-100 ${className}`}>
            {children}
        </div>
    )
}
