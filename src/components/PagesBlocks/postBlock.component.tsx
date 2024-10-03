'use client'

import { Post } from "@/src/store/posts/types";
import Image from "next/image";
import defaultImg from "@/public/images/defaultPostsImg.png"
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { deletePost } from "@/src/store/posts/actions";

export const PostBlock = ({title, content, id, img, userIsAdmin}: Post) => {
    const postImage = img ? (process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + img) : defaultImg
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.data)
    const handlePostDelete = () => {
        dispatch(deletePost(id))
    }
    
    return(
        <div className="bg-white md:rounded-[4rem] rounded-b-3xl p-6 flex flex-col md:flex-row relative mb-20  items-center md:shadow-none shadow-2xl shadow-element"> 
            <h1 className="absolute md:-top-5 -top-8  mx-auto left-0 right-0 md:w-1/3 md:min-w-fit w-full bg-[#e77f2a] text-white md:rounded-3xl rounded-t-3xl px-4 py-1.5 text-center text-sm md:text-xl">{title}</h1>
            <Image className={`w-60 h-60 mr-4`} src={postImage} alt={`${title} image`} width={400} height={400} />
            <span className="my-4">
                {content.length > 400 ? 
                content.slice(0, 400) + '...'
                :
                content
                }
            </span>
            {
                user.role == 'admin' &&
                <button className="absolute top-8 right-8 text-element" onClick={handlePostDelete}>X</button>
            }
            <Link href={`/posts/${id}`} className="bg-[#e77f2a] rounded-3xl absolute -bottom-5 -right-2 text-white text-lg md:text-xl p-4">
                Детальніше
            </Link>
        </div>
    )
}