interface StetProps extends React.HTMLAttributes<HTMLDivElement>  {
    title: string
    value: number | string
}
export function Stet({ title, value, ...rest}: StetProps) {
    return (
        <div className="stats shadow rounded-lg" {...rest}>
            <div className="stat">
                <div className="stat-title text-white text-2xl ">{title}</div>
                <div className="stat-value text-white">{value}</div>
            </div>
        
        </div>
    )
}