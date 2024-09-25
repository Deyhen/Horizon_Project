import { News } from "@/src/store/news/types";
import Image from "next/image";
import defaultImg from "@/public/images/defaultNewsImg.png"

export const NewsBlock = ({title, content, id, img}: News) => {
    return(
        <div className="bg-white md:rounded-[4rem] rounded-b-3xl p-6 flex flex-col md:flex-row relative mb-20  items-center md:shadow-none shadow-2xl shadow-element"> 
            <h1 className="absolute md:-top-5 -top-8  mx-auto left-0 right-0 md:w-1/3 md:min-w-fit w-full bg-[#e77f2a] text-white md:rounded-3xl rounded-t-3xl px-4 py-1.5 text-center text-sm md:text-xl">{title}</h1>
            <Image className={`w-60 h-60 mr-4`} src={img ? img : defaultImg} alt={`${title} image`}/>
            <span className="my-4">
                {content.slice(0, 400)}...
            </span>
            <div className="bg-[#e77f2a] rounded-3xl absolute -bottom-5 -right-2 text-white text-lg md:text-xl p-4">
                Детальніше
            </div>
        </div>
    )
}