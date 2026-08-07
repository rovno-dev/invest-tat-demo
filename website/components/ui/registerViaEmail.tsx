import {Input} from "@/components/ui/input"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {$fetch} from "@/lib/api/fetch"
import {Spinner} from "@/components/ui/spinner"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

export default function RegisterViaEmail() {

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const router = useRouter()

    async function handleSubmit() {

        setErrors(null)
        setIsLoading(true)

        const response = await $fetch("/register/email", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            onLoadingChange: setIsLoading
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        if (response?.response?.ok) {
            toast.success("Вы успешно зарегистрировались")
            router.push("/")
        }

    }

    const isValid = email && password

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

            <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                error={errors?.email}
            />

            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="At least 8 characters"
                onChange={(e) => setPassword(e.target.value)}
                error={errors?.password}
                setIsOpen={setIsShowPassword}
                isOpen={isShowPassword}

            />

            <Button
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className="w-full mt-6"
                variant="filled"
                size="large"
            >
                {isLoading ? <Spinner/> : 'Create account'}
            </Button>

        </form>
    )
}