import {newsArticle} from "../../types.d";
import {languageContext} from "../../context/languageContext";
import {useContext} from "react";


export function ArticleBox(props: newsArticle) {
    let readMoreTxt = ""
    const langCtx = useContext(languageContext)

    if (langCtx.value === "ENG") {
        readMoreTxt = "Read more"
    } else {
        readMoreTxt = "Preberi več"
    }
    return (
        <div className=" w-full p-2 mt-1  md:w-1/2 lg:w-1/4">
            <div className="bg-amber-100 h-full p-2">
                <p className="font-bold">{props.title}</p>
                <p className="my-1 font-roboto">{props.description}</p>
                <a href={props.link} target={"_blank"} rel={"noreferrer"} className="text-blue-600 font-roboto">{readMoreTxt}</a>
            </div>
        </div>
    )
}