

import Hero from '/public/images/circle.png'
import Logo from '/public/images/Logo.svg'
import TelegramLogo from '/public/images/telegramLogo.png'
import DiscordLogo from '/public/images/discordLogo.png' 
import WindowsLogo from '/public/images/windowsLogo.png'
import LinuxAndAppleLogo from '/public/images/linux&appleLogo.png'
import NavBar from '../NavBar/NavBar.component'
import Image from 'next/image'
import test from 'node:test'


export const Header =() => {
    const textShadow = '[text-shadow:_2px_4px_rgb(222,_188,_142)]'
    const button = 'flex bg-white px-4 py-2 w-full shadow-lg border-orange border-b-2 border-r-2 rounded-3xl mb-4'

    return(
        <header className={`md:grid col-span-2 grid-cols-3 grid-rows-[1fr,8rem] gap-4 py-4`}>
            <div className={` items-center md:flex hidden`}>
                <Image className={''} src={Hero} alt={"Woops"}/>
                <div className={`flex flex-col text-white ${textShadow} text-4xl `}><span className='font-thin'>Приєднуйся до гри </span><span className='font-bold'>ПРЯМО ЗАРАЗ!</span></div>
            </div>
            <div className='flex justify-center items-center '>
                <Image className={'w-36 h-36 md:h-96 md:w-96'} src={Logo} alt={"Woops"} />
            </div>
            <div className='md:grid flex grid-cols-2 grid-rows-[4rem,1fr]'> 
                <div className='absolute md:flex top-0 col-span-2 col-start-2 justify-self-end'>
                    <Image className={'mx-4 mt-4 md:h-10 md:w-14 h-5 w-7 hover:cursor-pointer'} src={DiscordLogo}  alt={"Woops"}/>
                    <Image className={'mx-4 mr-12 mt-4 md:h-12 md:w-12 h-6 w-6 hover:cursor-pointer'} src={TelegramLogo}  alt={"Woops"}/>
                </div>
                <div className='md:flex hidden justify-center items-center col-span-1 col-start-1 row-start-2 flex-col self-start'>
                    <span className={`text-xl text-white ${textShadow} mb-4`}>ЗАВАНТАЖУЙ ЛАУНЧЕР!</span>
                    <button className={`${button}`}>
                        <Image className={``} src={WindowsLogo} width={75} height={60} alt={"Woops"}/>
                        <span className='text-orange w-full text-center'>Версія для<br/>Windows 32/64 bit</span>
                    </button>
                    <button className={`${button}`}>
                        <Image className={``} src={LinuxAndAppleLogo} width={75} height={60} alt={"Woops"}/>
                        <span className='text-orange w-full text-center'>Версія для<br/>Linux / Mac O</span>
                    </button>
                </div>
            </div>
            <NavBar/>
        </header>
    )
}