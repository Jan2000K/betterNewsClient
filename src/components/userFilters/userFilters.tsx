import {languageContext} from "../../context/languageContext"
import {useContext, useState} from "react"
import FilterModal from "../filterModal/filterModal";
import CategoriesDisplay from "../categoriesDisplay/categoriesDisplay";
import {genericStateProp, newsCategory} from "../../types";

export function UserFilters(props: { activeCategory: genericStateProp<newsCategory>, newsSources: genericStateProp<string[] | undefined>, filtersChange: genericStateProp<number> }) {
    let langCtx = useContext(languageContext)
    let filterText = ""
    if (langCtx.value === "ENG") {
        filterText = "Filters"
    } else {
        filterText = "Filtri"
    }
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <section>
            {modalVisible ? <FilterModal modalVis={{value: modalVisible, setter: setModalVisible}} newsSources={{
                setter: props.newsSources.setter,
                value: props.newsSources.value
            }} filterChange={props.filtersChange}/> : null}
            <button className="bg-amber-300 p-2 mt-3 ml-1 font-roboto text-lg rounded"
                    onClick={() => setModalVisible(true)}>{filterText}</button>
            <CategoriesDisplay setter={props.activeCategory.setter} value={props.activeCategory.value}/>
        </section>
    )
}