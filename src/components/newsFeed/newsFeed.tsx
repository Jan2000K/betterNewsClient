import { genericStateProp, newsArticle } from "../../types"
import { ArticleBox } from "../articleBox/articleBox"

export default function NewsFeed(
    props: genericStateProp<newsArticle[] | undefined>
) {
    if (props.value !== undefined) {
        return (
            <section className="flex flex-wrap">
                {props.value!.map((article) => {
                    return <ArticleBox key={article.link} {...article} />
                })}
            </section>
        )
    } else {
        return <></>
    }
}
