interface ButtonProps extends  React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type: 'button' | 'submit'
}
export function Button({ children, type, ...rest}: ButtonProps) {
    return (
        <button type={type} className="btn text-white rounded-sm" {...rest}>
            <span className="text-white flex gap-2">{children}</span>
        </button>
    )
}