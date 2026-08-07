import { Eye as EyeIcon } from 'lucide-react'
import { EyeOff } from "lucide-react"

interface Props {
    isOpen?: boolean
    [key: string]: any
}

export default function Eye({isOpen, ...props}: Props) {
    return (
        isOpen ? <EyeIcon {...props}/> : <EyeOff {...props}/>
    )
}