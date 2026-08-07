"use client"

import { $fetch } from "@/lib/api/fetch";
import {safeLocalStorage} from "@/lib/safeLocalStorage"

export const fetchMe = async () => {

    const access_token = safeLocalStorage.getItem("access_token")
    if (!access_token) return null

    const response = await $fetch("/me", { isToast: false });
    return response?.json || null;
}