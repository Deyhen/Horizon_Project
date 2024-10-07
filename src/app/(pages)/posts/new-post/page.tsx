'use client'

import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "@/src/store/store";
import { MyInput } from "@/src/components/Custom/input/myInput.component";
import axios from "axios";
import { useState } from "react";
import { createPost } from "@/src/store/posts/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


interface Values {
    title: string,
    content: string,
    img: string
  }

const NewPostPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [file, setFile] = useState<string | Blob>()
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')


    const handleSendNewPost = async () => {
        const formData = new FormData();

        if(title && file && content){
            formData.append('title', title)
            formData.append('img', file as string | Blob)
            formData.append('content', content)
            dispatch(createPost(formData)).then(()=>{
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    iconColor: '#e77f2a',
                    confirmButtonColor: '#e77f2a'
                  }).then(() =>{
                    router.push('/')
                });
            })
        }

    }
    const inputClass = 'text-element rounded-lg my-2 h-8 placeholder:text-element p-1 px-2 border-2 border-orange outline-1 focus:outline-element '

    return(
        <div className="bg-white p-6 rounded-3xl w-1/2">
            <div className="md:py-6 md:px-8 flex flex-col justify-center items-center pt-12 md:w-full">
                <h1 className=" outline-orange outline-1 text-element text-2xl mb-8">Add new post</h1>
                <input className={inputClass + 'px-4 text-center'} type="title" placeholder="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea className={inputClass + 'w-full h-20'} placeholder="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                <input  className={inputClass + 'p-4 h-auto'} onChange={(e) => {
                    if(e.target.files)
                    setFile(e.target.files[0])
                }} type="file" accept="image/*"/>
                <div className="flex justify-center items-center mb-4 w-full">
                    <button onClick={handleSendNewPost} className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32">
                        Надіслати
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewPostPage