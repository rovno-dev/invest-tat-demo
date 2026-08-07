import {Metadata} from 'next'
import {Container} from '@/components/ui/container'
import UserWidget from "@/widgets/user-widget/UserWidget"

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Your account profile',
}

export default function ProfilePage() {
    return (
        <Container className="py-10">
            <UserWidget />
        </Container>
    )
}
