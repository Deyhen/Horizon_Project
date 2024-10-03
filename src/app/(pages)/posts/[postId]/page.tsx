'use client'

import defaultImg from "@/public/images/defaultPostsImg.png"
import { findPost } from "@/src/store/posts/actions"
import { useAppDispatch, useAppSelector } from "@/src/store/store"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const PostsPage = () => {
    const {postId} = useParams<{postId: string}>()

    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(findPost(postId))
    }, [])

    const post = useAppSelector(state => state.posts.currentPage)
    const postImage = post.img ? (process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + post.img) : defaultImg
    
    return(
        <div className="relative p-8 rounded-3xl w-1/2 bg-white mx-auto">
            <div className="flex flex-col justify-center items-center">
                <Image src={postImage} alt={`Image of posts ${post.title}`} className="w-full h-40 mb-12" width={400} height={400}/>
                <div className="text-center">{post.content}</div>
            </div>
            <div className="absolute  bg-element p-1 rounded-md text-white text-3xl m-auto left-0 top-0 bottom-0 right-0 text-center max-w-fit max-h-fit">{post.title}</div>     
        </div>
    )
}

export default PostsPage