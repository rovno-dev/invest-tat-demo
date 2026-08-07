"use client"

import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react"
import {fetchMe} from "@/lib/user/api/fetchMe"
import {safeLocalStorage} from "@/lib/safeLocalStorage"
import {getTokenExpiration} from "@/lib/GetTokenExpiration"
import {$fetch} from "@/lib/api/fetch"

interface UserContextType {
    user: any
    setUser: (user: any) => void
    token: string | null
    setToken: (token: string | null) => void
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    logout: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    // Оборачиваем в useCallback, чтобы функция не пересоздавалась
    const getUser = useCallback(async () => {
        setIsLoading(true)
        const user_ = await fetchMe()
        setUser(user_)

        setIsLoading(false)
    }, [])

    async function init() {
        const refresh_token = safeLocalStorage.getItem("refresh_token")
        const access_token = safeLocalStorage.getItem("access_token")

        if (!refresh_token || !access_token) {
            setIsLoading(false)
            return
        }

        const expTime = getTokenExpiration(access_token)
        const isExpired = expTime ? Date.now() >= expTime : true;

        if (isExpired) {
            const response = await $fetch("/refresh", {
                method: "POST",
                body: JSON.stringify({
                    refresh_token: refresh_token
                })
            })

            const new_access_token = response?.json?.access_token

            if (new_access_token) {
                safeLocalStorage.setItem("access_token", new_access_token)
                setToken(new_access_token)
            }
        } else {
            setToken(access_token)
        }
    }

    useEffect(() => {
        init()
    }, [])

    function ClearAuth() {
        safeLocalStorage.removeItem("access_token")
        safeLocalStorage.removeItem("refresh_token")
        setToken(null)
        setUser(null)
        setIsLoading(false)
    }

    useEffect(() => {
        if (token) {
            safeLocalStorage.setItem("access_token", token)
            getUser()
        } else if (token === null && !isLoading) {
            ClearAuth()
        }
    }, [token, getUser])

    async function logout() {

        const refresh_token = safeLocalStorage.getItem("refresh_token")

        const response = await $fetch("/logout", {
            method: "POST",
            body: JSON.stringify({
                refresh_token: refresh_token
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })

        ClearAuth()
    }

    return (
        <UserContext.Provider value={{user, setUser, token, setToken, isLoading, setIsLoading, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}