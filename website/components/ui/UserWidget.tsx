"use client"

import {Card} from "@/components/ui/card"
import {useUser} from "@/lib/user/model/UserContext"
import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function UserWidget() {

    const {user} = useUser()

    return (
        <div>
            <h1 className="text-display-3 md:text-display-2 text-(--on-bg-high) mb-6">Profile</h1>
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-body-3 font-medium text-(--on-bg-medium)">User ID</h2>
                        <p className="text-body-2 text-(--on-bg-high)">{user?.id}</p>
                    </div>
                    {user?.email && (
                        <div>
                            <h2 className="text-body-3 font-medium text-(--on-bg-medium)">Email</h2>
                            <p className="text-body-2 text-(--on-bg-high)">{user?.email}</p>
                        </div>
                    )}
                    {user?.phone && (
                        <div>
                            <h2 className="text-body-3 font-medium text-(--on-bg-medium)">Phone</h2>
                            <p className="text-body-2 text-(--on-bg-high)">{user?.phone}</p>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Link href="/public">
                        <Button variant="outlined" size="medium">Back to Home</Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}