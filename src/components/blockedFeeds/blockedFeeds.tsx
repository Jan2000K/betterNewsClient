import {languageContext} from "../../context/languageContext"
import React, {useContext, useEffect, useRef, useState} from "react"
import {genericStateProp} from "../../types";

export default function BlockedFeeds(newsSources: genericStateProp<string[] | undefined>) {
    let langCtx = useContext(languageContext)
    let addText = ""
    let sourcesJson
    let allowedFeedArr: string[] = newsSources.value!
    if (langCtx.value === "ENG") {
        addText = "+ Add"
        sourcesJson = localStorage.getItem("ENGblockedFeedsJSON")
        if (sourcesJson === null) {
            localStorage.setItem("ENGblockedFeedsJSON", JSON.stringify([]))
            sourcesJson = localStorage.getItem("ENGblockedFeedsJSON")
        }

    } else {

        addText = "+ Dodaj"
        sourcesJson = localStorage.getItem("SLOblockedFeedsJSON")
        if (sourcesJson === null) {
            localStorage.setItem("SLOblockedFeedsJSON", JSON.stringify([]))
            sourcesJson = localStorage.getItem("SLOblockedFeedsJSON")
        }

    }
    let [blockedFeedsArr, setBlockedFeedsArr] = useState<string[]>(
        JSON.parse(sourcesJson!)
    )

    let feedSelect = useRef() as React.MutableRefObject<HTMLSelectElement>

    let [allowedFeeds, setAllowedFeeds] = useState<string[]>(
        allowedFeedArr.filter((feed) => {
            for (let i = 0; i < blockedFeedsArr.length; i++) {
                if (feed === blockedFeedsArr[i]) {
                    return false
                }
            }
            return true
        })
    )

    useEffect(() => {
        if (langCtx.value === "ENG") {
            localStorage.setItem(
                "ENGblockedFeedsJSON",
                JSON.stringify(blockedFeedsArr)
            )
        } else {
            localStorage.setItem(
                "SLOblockedFeedsJSON",
                JSON.stringify(blockedFeedsArr)
            )
        }
    }, [blockedFeedsArr])

    function addFeed() {
        if (feedSelect !== null) {
            if (blockedFeedsArr.length === 0) {
                setAllowedFeeds(
                    allowedFeeds.filter((feed) => {
                        if (feed !== feedSelect.current!.value) {
                            return true
                        } else {
                            return false
                        }
                    })
                )
                setBlockedFeedsArr([
                    ...blockedFeedsArr,
                    feedSelect.current!.value,
                ])
                return
            }

            setAllowedFeeds(
                allowedFeeds.filter((feed) => {
                    if (
                        blockedFeedsArr.includes(feed) ||
                        feed === feedSelect.current!.value
                    ) {
                        return false
                    } else {
                        return true
                    }
                })
            )
            setBlockedFeedsArr([...blockedFeedsArr, feedSelect.current!.value])
        }
    }

    function removeFeed(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
        if (allowedFeeds.length === 0) {
            setAllowedFeeds([e.currentTarget.id])
            setBlockedFeedsArr(
                blockedFeedsArr.filter((feed) => {
                    if (feed !== e.currentTarget.id) {
                        return true
                    } else {
                        return false
                    }
                })
            )
        } else {
            setBlockedFeedsArr(
                blockedFeedsArr.filter((feed) => {
                    if (feed === e.currentTarget.id) {
                        return false
                    } else {
                        return true
                    }
                })
            )
            setAllowedFeeds([...allowedFeeds, e.currentTarget.id])
        }
    }

    if (blockedFeedsArr.length === 0) {
        return (
            <div className="mt-2">
                <select ref={feedSelect} className="ml-2">
                    {allowedFeeds.map((feed) => {
                        return <option key={feed}>{feed}</option>
                    })}
                </select>
                <div className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                    <button className="px-1" onClick={addFeed}>
                        {addText}
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="mt-2">
                <select ref={feedSelect}>
                    {allowedFeeds.map((feed) => {
                        return <option key={feed}>{feed}</option>
                    })}
                </select>

                <div className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                    <button className="px-1" onClick={addFeed}>
                        {addText}
                    </button>
                </div>

                {blockedFeedsArr.map((feed) => {
                    return (
                        <div
                            key={feed}
                            className="group ml-2 inline-block bg-amber-300 p-0.5 rounded-md">
                            <label
                                id={feed}
                                className="opacity-0 group-hover:opacity-100 group-hover:cursor-pointer select-none"
                                onClick={removeFeed}>
                                x
                            </label>
                            <label> {feed}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}
