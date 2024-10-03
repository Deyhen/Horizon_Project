

import { GameServer } from "@/src/store/servers/types"
import Link from "next/link"
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";

interface ServerBlockProps{
    server: GameServer
}

export const ServerBlock = ({server}: ServerBlockProps) => {
    return(
        <div className="bg-white md:rounded-[4rem] rounded-b-3xl p-6 md:min-w-[30rem] min-h-40 flex flex-col md:flex-row relative items-center justify-center mb-12 md:shadow-none shadow-2xl shadow-element">
            <h1 className={"absolute md:-top-5 -top-8  mx-auto left-0 right-0 md:w-1/3 md:min-w-fit w-full bg-[#e77f2a] " +
            "text-white md:rounded-3xl rounded-t-3xl px-4 py-1.5 text-center text-sm md:text-xl"}>
                {server.title}
            </h1>
            <div className="md:w-32 md:h-32 w-24 h-24 absolute left-5">
                    <CircularProgressbarWithChildren
                    value={server.playersNow}
                    text={`${server.playersNow}`}
                    strokeWidth={8}
                    maxValue={100}
                    styles={buildStyles({
                    rotation: 1,
                    textColor: '#e77f2a',
                    pathColor: `#e77f2a`,
                    trailColor: '#fbbd8b'
                    })}
                    />
                </div>
            <span className="md:items-center" >{server.type}</span>
            <Link href={`/servers/${server.title}`} className={"bg-[#e77f2a] rounded-3xl absolute -bottom-5 -right-2 text-white text-lg md:text-xl p-4"}>
                Детальніше
            </Link>
        </div>
    )
}
