import Navbar from '@/app/_components/Navbar'

export default function layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}