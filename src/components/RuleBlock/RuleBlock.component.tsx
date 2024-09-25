'use client'


import { useState } from "react"

export default function RulesBlock({options, themeIndex, theme}: {options: string[], themeIndex: string, theme: string}){
    const tooMuchOptions = options.length > 5

    const [showMore, setShowMore] = useState(!tooMuchOptions)

    return(
        <div className=" p-6 flex flex-col w-full md:items-start items-center px-12"> 
            <h2 className={`ml-2 mb-2 font-semibold text-xl`}>{`${themeIndex}. ${theme}`}</h2> 
             {!showMore?
             options.slice(0, 5).map((option, optionIndex) => (
                <span className={``} key={optionIndex}>{`${themeIndex}.${optionIndex + 1} ${option}`}</span>
             )) 
            : 
            options.map((option, optionIndex) => (
                <span className={``} key={optionIndex}>{`${themeIndex}.${optionIndex + 1} ${option}`}</span>
            ))} 

            {tooMuchOptions && <div onClick={() => setShowMore(!showMore)} className={`hover:cursor-pointer font-semibold ml-2 mt-2`}>{!showMore ? `Відкрити повністю >>` : `Сховати <<`}</div>}
        </div>
    )
}