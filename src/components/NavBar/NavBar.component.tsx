'use client'

import { usePathname } from "next/navigation"

import Link from "next/link"; 


export default function NavBar(){
    const navItem = 'relative md:mx-4 mx-1'
    const selectedNavTest = `border-b-4 border-[#e77f2a]`
    const textShadow = 'md:[text-shadow:_2px_4px_rgb(222,_188,_142)]'
    const after = 'after:origin-center after:duration-700 hover:after:block after:w-0 after:h-1 hover:after:bg-[#e77f2a] hover:after:absolute hover:after:-translate-x-1/2 hover:after:w-full hover:after:left-1/2'

    const router = usePathname() 
    return(
        <nav className={`row-span-3 flex justify-center items-center col-start-2 text-white ${textShadow} md:text-5xl text-2xl`}>
            <Link className={navItem} href="/">
                <span className={`${router === '/' ? selectedNavTest : after} `}>Головна</span>
            </Link>
            <Link className={navItem} href="/rules">
                <span className={`${router === '/rules' ? selectedNavTest : after}`}>Правила</span>
            </Link>
            <Link className={navItem} href="/servers">
                <span className={`${router === '/servers' ? selectedNavTest : after}`}>Сервери</span>
            </Link>
            <Link className={navItem} href="/shop">
                <span className={`${router === '/shop' ? selectedNavTest : after }`}>Магазин</span>
            </Link>
        </nav>
    )
}