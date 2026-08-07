import {Input} from "@/components/ui/input"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {$fetch} from "@/shared/lib/api/fetch"
import {Spinner} from "@/components/ui/spinner"
import {useRouter} from "next/navigation"
import {safeLocalStorage} from "@/shared/lib/safeLocalStorage"
import {useUser} from "@/entities/user/model/UserContext"

export default function LoginViaPhone() {

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const [phone, setPhone] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const router = useRouter()

    const {setToken} = useUser()

    async function handleSubmit(e) {

        e.preventDefault()

        setErrors(null)
        setIsLoading(true)

        const response = await $fetch("/login/phone-password", {
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

        const refresh_token = response?.json?.refresh_token
        const access_token = response?.json?.access_token

        if (!refresh_token || !access_token) return

        safeLocalStorage.setItem("refresh_token", refresh_token)
        safeLocalStorage.setItem("access_token", access_token)

        setToken(access_token)
        router.push("/profile")
    }

    const isValid = phone && password

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

            <Input
                type="phone"
                label="Phone"
                placeholder="+77777777777"
                mask="+00000000000"
                onChange={(e) => setPhone(e.target.value)}
                error={errors?.phone}
            />

            <Input
                id="password"
                type="password"
                label="Password"
                placeholder="your-password"
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
                {isLoading ? <Spinner/> : 'Sign IN'}
            </Button>

        </form>
    )
}