import BlockedWords from "../blockWords/blockedWords"
import {languageContext} from "../../context/languageContext"
import {useContext} from "react"
import BlockedFeeds from "../blockedFeeds/blockedFeeds"
import {genericStateProp} from "../../types";

export default function FilterModal(props: { modalVis: genericStateProp<boolean>, newsSources: genericStateProp<string[] | undefined>, filterChange: genericStateProp<number> }) {
    let langCtx = useContext(languageContext)
    let blockedWordsTxt = ""
    let blockedFeedsTxt = ""
    let saveTxt = ""
    if (langCtx.value === "ENG") {
        blockedWordsTxt = "Blocked words: "
        blockedFeedsTxt = "Blocked feeds: "
        saveTxt = "Save"
    } else {
        blockedWordsTxt = "Blokirane besede : "
        blockedFeedsTxt = " Blokirani viri"
        saveTxt = "Shrani"
    }

    function handlePreferenceSave() {
        props.modalVis.setter(false)
        props.filterChange.setter(props.filterChange.value + 1)
    }

    return (
        //Main Container for the modal
        <section className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-slate-500/80">
            {
                //Div for the modal content
            }
            <div className="relative mx-auto top-20  w-4/5 h-2/5  bg-slate-100 md:w-3/5 lg:w-2/5">
                {
                    //Close (X) div container
                }
                <div
                    className="float-right p-0 text-2xl mr-1 mt-1 select-none text-slate-500 hover:cursor-pointer"
                    onClick={() => props.modalVis.setter(false)}>
                    X
                </div>

                <div className="absolute mt-2 ml-2 font-roboto">
                    <p className="md:text-lg">{blockedWordsTxt}</p>
                    <BlockedWords/>
                    <p className="md:text-lg">{blockedFeedsTxt}</p>
                    <BlockedFeeds setter={props.newsSources.setter} value={props.newsSources.value}/>
                </div>
                <button className="absolute right-3 bottom-2 p-2 rounded hover:bg-emerald-400 md:text-lg bg-emerald-400 2xl:bg-inherit"
                        onClick={handlePreferenceSave}>{saveTxt}</button>
            </div>
        </section>
    )
}
