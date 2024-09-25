'use client'

import { useAppSelector } from "@/src/store/store"
import { Login } from "./Login/login.component"
import { MiniProfile } from "./MiniProfile/miniProfile.component"


export const RightBar = () => {
    const user = useAppSelector(state => state.user.data)

    return(
        <div className="row-start-2 md:mt-40">
            {!(user.id) ?
            <Login/>
            :
            <MiniProfile/>
            }
        </div>
    )
}