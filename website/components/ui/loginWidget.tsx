"use client"

import {Container} from '@/components/ui/container'
import Link from 'next/link'
import {useStepNavigation} from "@/hooks/use-step-navigation"
import LoginViaEmail from "@/components/ui/loginViaEmail"
import LoginViaPhone from "@/components/ui/LoginViaPhone"

export function LoginWidget() {

    const PARTS = [
        {
            name: "email",
            param: "email",
            children:
                <LoginViaEmail />
        },
        {
            name: "phone",
            param: "phone",
            children:
                <LoginViaPhone />
        },
    ]

    const { activeStep, handleStepChange, currentStepParam } = useStepNavigation(PARTS);

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <Container className="max-w-md">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h1 className="text-display-3 font-heading mb-6">Sign IN</h1>

                    <div className="flex border-b border-border mb-6">
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${currentStepParam === 'email'
                                ? 'border-b-2 border-primary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => handleStepChange('email')}
                        >
                            Email
                        </button>
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${currentStepParam === 'phone'
                                ? 'border-b-2 border-primary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => handleStepChange('phone')}
                        >
                            SMS
                        </button>
                    </div>

                    {activeStep?.children}

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </Container>
        </div>
    )
}