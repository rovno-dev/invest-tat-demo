import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useMemo} from "react"

export interface StepItem {
    name: string;
    param: string;
    children: React.ReactNode;
}

export function useStepNavigation(parts: StepItem[]) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const rawStepParam = searchParams.get("step")

    const activeIndex = useMemo(() => {
        const index = parts.findIndex(part => part.param === rawStepParam)
        return index !== -1 ? index : 0
    }, [rawStepParam, parts])

    const activeStep = parts[activeIndex]

    const handleStepChange = (param: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("step", param)
        router.push(`${pathname}?${params.toString()}`)
    }

    return {
        activeStep,
        activeIndex,
        handleStepChange,
        currentStepParam: rawStepParam ?? (parts[0]?.param || "")
    }
}