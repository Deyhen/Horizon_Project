'use client'

import MinecraftSkinViewer from "@/src/components/skinViewer/skin-viewer.component";
import { useAppDispatch, useAppSelector } from "@/src/store/store"
import defaultAvatar from '@/public/images/default-avatar.png'
import Image from "next/image";
import { changeAvatar, changeSkin } from "@/src/store/user/actions";
import Swal from "sweetalert2";

const Cabinet = () => {
    const user = useAppSelector(state => state.user.data)
    const dispatch = useAppDispatch()

    const avatar = process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.avatarPath

    const skinPath = (process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.skinPath) 

    const handleSkinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      const formData = new FormData();

        if( file ){
            formData.append('skin', file as string | Blob)
            formData.append('id', user.id)
            dispatch(changeSkin(formData)).then(()=>{
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    iconColor: '#e77f2a',
                    confirmButtonColor: '#e77f2a'
                  })
            })
        }

    };
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        const formData = new FormData();
  
          if( file ){
              formData.append('avatar', file as string | Blob)
              formData.append('id', user.id)
              dispatch(changeAvatar(formData)).then(()=>{
                  Swal.fire({
                      title: 'Success',
                      icon: 'success',
                      iconColor: '#e77f2a',
                      confirmButtonColor: '#e77f2a'
                    })
              })
          }
  
      };
    return(
    <div className="flex p-4 relative">   
        <MinecraftSkinViewer user={user} />
        <div className="flex flex-col">
            <div className="flex">
                <label htmlFor="avatarInput" className="flex justify-center items-center mr-4 cursor-pointer">
                    <Image src={user.avatarPath ? avatar : defaultAvatar}
                     className="w-32 h-32 border-2 border-black" width={400} height={400} alt=""/>
                </label>
                <input type="file" id="avatarInput" className="hidden" onChange={handleAvatarChange}/>
                <div className="flex flex-col justify-start items-start">
                    <h1 className="text-2xl font-bold">
                        {user.username}
                    </h1>
                    <div className="border-2 border-black rounded-xl px-2">
                        {user.role}
                    </div>
                </div>
            </div>
            <div className="flex ml-32">
                    <div className="mx-2">Donate currency: {user.donateCurrency}</div>
                    <div className="mx-2">Game currency: {user.gameCurrency}</div>
            </div>
            <div className="flex justify-between mt-80">
                <div>
                    UPLOAD SKIN
                    <input
                    type="file"
                    accept="image/png"
                    onChange={handleSkinChange}
                    className="px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    UPLOAD CLOAK
                </div>
            </div>
        </div>
    </div>
        
    )
}

export default Cabinet
