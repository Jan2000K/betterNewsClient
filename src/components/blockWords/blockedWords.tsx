import {languageContext} from "../../context/languageContext"
import React, {useContext, useEffect, useRef, useState} from "react"

export default function BlockedWords() {
    let langCtx = useContext(languageContext)
    let placeholderText = ""
    let addText = ""
    let wordExistsText=""
    let wordsJSON
    if (langCtx.value === "ENG") {
        placeholderText = "Enter a word"
        addText = "+ Add"
        wordExistsText = "This word is already on the blocked list!"
        wordsJSON = localStorage.getItem("ENGblockedWordsJSON")
        if (wordsJSON === null) {
            localStorage.setItem("ENGblockedWordsJSON", JSON.stringify([]))
            wordsJSON = localStorage.getItem("ENGblockedWordsJSON")
        }
    } else {
        placeholderText = "Vnesi besedo"
        addText = "+ Dodaj"
        wordExistsText ="Ta beseda je že v seznamu blokiranih besed!"
        wordsJSON = localStorage.getItem("SLOblockedWordsJSON")
        if (wordsJSON === null) {
            localStorage.setItem("SLOblockedWordsJSON", JSON.stringify([]))
            wordsJSON = localStorage.getItem("SLOblockedWordsJSON")
        }
    }


    let [wordsArray, setWordsArray] = useState<string[]>(
        JSON.parse(wordsJSON!)
    )

    const [wordExists,setWordExists] = useState(false)

    let wordInput = useRef<null | HTMLInputElement>(null)
    useEffect(() => {
        if (langCtx.value === "ENG") {
            localStorage.setItem("ENGblockedWordsJSON", JSON.stringify(wordsArray))
        } else {
            localStorage.setItem("SLOblockedWordsJSON", JSON.stringify(wordsArray))
        }
    }, [wordsArray])

    function addWord() {
        if (wordInput !== null) {
            if (wordInput.current!.value.length < 1) {
                wordInput.current!.className =
                    wordInput.current!.className +
                    " border-2 border-rose-500"
            }
            else if(wordsArray.includes(wordInput.current!.value)){
                setWordExists(true)
            }
             else {
                setWordExists(false)
                setWordsArray([...wordsArray, wordInput.current!.value])
                wordInput.current!.className = "rounded-md ml-2 bg-gray-200"
                wordInput.current!.value = ""
            }
        }
    }

    function removeWord(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
        setWordsArray(
            wordsArray.filter((word) => {
                if (word === e.currentTarget.id) {
                    return false
                } else {
                    return true
                }
            })
        )
    }

    if (wordsArray.length === 0) {
        return (
            <div className="mt-2">
                <input
                    type={"text"}
                    className="rounded-md ml-2 bg-gray-200"
                    placeholder={placeholderText}
                    ref={wordInput}
                />
                <div className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                    <button className="px-1" onClick={addWord}>
                        {addText}
                    </button>
                </div>
            </div>
        )
    } else {
        return (

            <div className="mt-2">
                {
                    wordExists?<p className="text-red-500">{wordExistsText}</p>:null
                }
                <input
                    type={"text"}
                    className="rounded-md ml-2 bg-gray-200"
                    placeholder={placeholderText}
                    ref={wordInput}
                />
                <div className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                    <button className="px-1" onClick={addWord}>
                        {addText}
                    </button>
                </div>

                {wordsArray.map((word) => {
                    return (
                        <div
                            key={word}
                            className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                            <label
                                id={word}
                                className="group-hover:cursor-pointer select-none"
                                onClick={removeWord}>
                                x
                            </label>
                            <label> {word}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}
