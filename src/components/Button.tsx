import { FC } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({children, ...props}: ButtonProps) => {
    return <button className="button" {...props}>{children}</button>
}