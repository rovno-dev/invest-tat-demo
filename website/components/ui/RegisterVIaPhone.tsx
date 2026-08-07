import {Input} from "@/components/ui/input"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {$fetch} from "@/lib/api/fetch"
import {Spinner} from "@/components/ui/spinner"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

export default function RegisterViaPhone() {

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const [phone, setPhone] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const router = useRouter()

    async function handleSubmit() {

        setErrors(null)
        setIsLoading(true)

        const response = await $fetch("/register/phone", {
            method: "POST",
            body: JSON.stringify({
                phone: phone,
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


    const isValid = phone && password

    return (
        <form className="space-y-4">

            <Input
                type="phone"
                label="Phone"
                placeholder="+77777777777"
                mask="+00000000000"
                onChange={(e) => setPhone(e.target.value)}
                error={errors?.phone}
            />

            <Input
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