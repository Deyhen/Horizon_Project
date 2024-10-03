'use client'

import { RiUserLine } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaSackDollar } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { logout } from "@/src/store/user/actions";
import Link from "next/link";


export const MiniProfile = () => {
    const line = 'flex my-0.5 text-gray-700'
    const lineImg = 'w-6 h-6 mr-1'

    const user = useAppSelector(state => state.user.data)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout());
    }

    return(
        <div className="relative bg-white md:rounded-[2rem] rounded-b-3xl flex justify-center items-center mx-4 font-bold md:px-16 px-4">
            <span className="absolute left-0 right-0 mx-auto px-2 py-1 bg-element md:rounded-[2rem] rounded-t-3xl md:w-2/3 w-full text-center text-white -top-5">Профіль</span>
            <div className="flex flex-col w-full justify-center items-start py-6">
                <span className="text-center w-full text-xl text-orange">{user.username.toUpperCase()}</span>
                <div className="flex md:flex-col w-full md:justify-center md:items-center">
                    <div className="flex md:justify-center justify-start items-center w-full my-2 text-">
                        <div className="w-24 h-24 bg-gray-300">50x50</div>
                    </div>
                    <div className="flex justify-between w-full items-center mb-2  text-center">
                        <div className="flex flex-col mx-2">
                            <div className="flex text-xl justify-center items-center">
                                <LiaCoinsSolid className="w-10 h-10 mr-1" color="#fbbd8b"/>
                                <span>100</span>
                            </div>
                            <span className="text-gray-500 text-sm">Гривені</span>
                        </div>
                        <div className="flex flex-col mx-2 ">
                            <div className="flex text-xl justify-center items-center text-center">
                                <FaSackDollar className="w-10 h-10 mr-1" color="#fbbd8b"/>
                                <span>2000</span>
                            </div>
                            <span className="text-gray-500 text-sm">Карбованці</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col md:text-xl text-xs">
                    <Link href={`/cabinet`}><div className={line}><RiUserLine className={lineImg} color="#fbbd8b"/> Особистий кабінет</div></Link>
                    <Link href={`/cabinet/payment`}><div className={line}><IoDiamondOutline className={lineImg} color="#fbbd8b"/> Поповнення балансу</div></Link>
                    <div className={line}><BsCurrencyDollar className={lineImg} color="#fbbd8b"/> Магазин переваг</div>
                    <div className={line}><MdOutlineShoppingCart className={lineImg} color="#fbbd8b"/> Магазин ресурсів</div>
                </div>
                <div className="flex justify-center items-center w-full">
                    <button className="px-8 py-2 bg-orange text-white text-xl mt-4 rounded-3xl" onClick={handleLogout}>Вихід</button>
                </div>
            </div>
        </div>
    )
}