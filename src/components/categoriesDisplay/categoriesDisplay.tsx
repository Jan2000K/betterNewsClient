import { ENGcategories, SLOcategories } from "../../assets/assets"
import { useContext } from "react"
import { languageContext } from "../../context/languageContext"
import { genericStateProp, newsCategory } from "../../types.d"

export default function CategoriesDisplay(
    props: genericStateProp<newsCategory>
) {
    const langCtx = useContext(languageContext)

    function stringCategoryToEnum(value: string): newsCategory {
        if (value === "All" || value === "Vse") {
            return newsCategory.All
        } else if (value === "Svet" || value === "World") {
            return newsCategory.World
        } else if (value === "Šport" || value === "Sport") {
            return newsCategory.Sport
        } else if (value === "Slovenija") {
            return newsCategory.Slovenia
        } else if (value === "Technology" || value === "Tehnologija") {
            return newsCategory.Technology
        } else {
            return newsCategory.Other
        }
    }

    const categoryArr = langCtx.value === "ENG" ? ENGcategories : SLOcategories

    function handleCategoryChange(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        if (parseInt(e.currentTarget.id) === props.value) {
            return
        }

        const currentSelection = document.getElementById(
            props.value.toString()
        ) as HTMLButtonElement
        currentSelection.className =
            "ml-2 p-1 rounded font-roboto bg-yellow-300 md:text-lg ml-3"
        const parsedValue = parseInt(e.currentTarget.id)
        props.setter(parsedValue)
    }

    return (
        <div className="inline-block mt-3">
            {categoryArr.map((cat) => {
                const convertedCategory = stringCategoryToEnum(cat)
                if (stringCategoryToEnum(cat) === props.value) {
                    return (
                        <button
                            className="p-1 font-roboto rounded bg-[#C4DFAA] md:text-lg ml-2"
                            id={convertedCategory.toString()}
                            onClick={handleCategoryChange}
                            key={cat}>
                            {cat}
                        </button>
                    )
                }
                return (
                    <button
                        className="p-1 rounded font-roboto bg-yellow-300 md:text-lg ml-2"
                        id={convertedCategory.toString()}
                        onClick={handleCategoryChange}
                        key={cat}>
                        {cat}
                    </button>
                )
            })}
        </div>
    )
}
