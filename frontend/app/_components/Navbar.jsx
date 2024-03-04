import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/next.png'
import LogoutButton from './LogoutButton'

export default function Navbar() {
    return (
        <nav>
            <Image
                src={Logo}
                alt='Next.js Logo'
                width={60}
                height={60}
                // priority={true}
                // placeholder='blur'
                quality={100}
                className="w-auto h-auto"
            />
            <h1>Dashboard</h1>
            <Link href={`${process.env.NEXT_PUBLIC_LINK_HOME}`}>Home</Link>
            <Link href={`${process.env.NEXT_PUBLIC_LINK_REGISTER}`}>Register</Link>
            <Link href={`${process.env.NEXT_PUBLIC_LINK_LOGIN}`}>Login</Link>
            <LogoutButton />
        </nav>
    )
}