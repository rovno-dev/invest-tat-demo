"use client"

import { cn } from "@/lib/utils"
import React, { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, useEffect, useRef, useState, forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import Eye from "@/components/ui/eye"
import { Label } from "@/components/ui/label"

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    isOpen?: boolean
    setIsOpen?: (isOpen: boolean) => void
    type_?: string
    value?: string;
    label?: string | null;
    error?: string | null;
    selected?: boolean;
    mask?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    leftAdditional?: ReactNode;
    additionalGap?: number;
    Button?: ReactNode
    inputClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
       isOpen,
       setIsOpen,
       type,
       type_,
       label,
       error,
       selected,
       className,
       inputClassName,
       style,
       mask,
       onChange,
       leftAdditional,
       additionalGap,
       value,
       defaultValue,
       Button,
       ...props
   }, ref) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const leftAdditionalRef = useRef<HTMLDivElement>(null)

    const dynamicInputStyle = {
        borderColor: error ? '#ef4444' : undefined,
        paddingLeft: isMounted && leftAdditional ? (leftAdditionalRef?.current?.offsetWidth ?? 0) + (additionalGap ?? 24) : "1rem",
        paddingRight: "1.25rem",
        ...style,
    }

    const toggle = () => setIsOpen(prev => !prev)

    const isPassword = type === "password" || type_ === "password";

    let computedButton = Button;
    if (isPassword) {
        computedButton = <Eye isOpen={isOpen} className="cursor-pointer w-4" onClick={toggle} />;
    }

    const inputType = isPassword ? (isOpen ? "text" : "password") : (type || props.type);

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <Label>
                    {label}
                </Label>
            )}

            <div className="relative group">
                {leftAdditional && (
                    <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                        ref={leftAdditionalRef}
                    >
                        <div
                            className={`flex items-center gap-2 transition-colors duration-200 ${error ? 'text-red-500' : 'text-text-muted group-focus-within:text-brand'}`}>
                            {leftAdditional}
                        </div>
                    </div>
                )}

                <IMaskInput
                    inputRef={ref}
                    className={`
                        ${
                            cn(
                                "h-8 w-full min-w-0 rounded-lg border border-(--outline) bg-(--bg) px-2.5 py-1 text-base text-(--on-bg-high) transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-(--on-bg-high) placeholder:text-(--on-bg-low) focus-visible:border-(--primary) focus-visible:ring-3 focus-visible:ring-(--primary)/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--error) aria-invalid:ring-3 aria-invalid:ring-(--error)/20 md:text-sm"
                            )
                        } 
                        ${inputClassName}
                        ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50'}
                    `}
                    style={dynamicInputStyle}
                    prepare={(str: string) => str.replace(/\D/g, '')}
                    type={inputType}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    mask={mask || ""}
                    unmask={false}
                    {...props}
                />


                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {computedButton}
                </div>

                {!computedButton && error && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                )}
            </div>

            {error && (
                <div className="min-h-[20px] ml-1">
                    <span className="text-red-500 text-[12px] font-medium leading-none transition-all">
                        {error}
                    </span>
                </div>
            )}
        </div>
    )
})

Input.displayName = "Input"