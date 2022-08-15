import axios from "axios"
import { useEffect, useState } from "react"
import Header from "./components/header/header"
import NewsFeed from "./components/newsFeed/newsFeed"
import { UserFilters } from "./components/userFilters/userFilters"
import { languageContext } from "./context/languageContext"
import { newsArticle, newsCategory } from "./types.d"
import { __API_URL__ } from "./api/apiURL"

function App() {
    const [language, setLanguage] = useState<"ENG" | "SVN">("ENG")
    const [activeCategory, setActiveCategory] = useState<newsCategory>(
        newsCategory.All
    )
    const [newsFeed, setNewsFeed] = useState<newsArticle[]>()
    const [newsSources, setNewsSources] = useState<string[]>()
    const [loading, setLoading] = useState(true)
    const [newsCopy, setNewsCopy] = useState<newsArticle[]>()
    const [userFilterChange, setUserFilterChange] = useState(0)

    useEffect(() => {
        setLoading(true)

        if (language === "ENG") {
            const url = `${__API_URL__}/news/ENG`
            let blockedWords = JSON.parse(
                localStorage.getItem("ENGblockedWordsJSON")!
            )
            if (blockedWords === null) {
                localStorage.setItem("ENGblockedWordsJSON", "[]")
                blockedWords = JSON.parse(
                    localStorage.getItem("ENGblockedWordsJSON")!
                )
            }

            let blockedFeeds = JSON.parse(
                localStorage.getItem("ENGblockedFeedsJSON")!
            )

            if (blockedFeeds == null) {
                localStorage.setItem("ENGblockedFeedsJSON", "[]")
                blockedFeeds = JSON.parse(
                    localStorage.getItem("ENGblockedFeedsJSON")!
                )
            }

            axios
                .all([
                    axios.get(url),
                    axios.post(url, {
                        blockedSources: blockedFeeds,
                        blockedWords: blockedWords,
                    }),
                ])
                .then((res) => {
                    setNewsSources(res[0].data)
                    setNewsFeed(res[1].data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            const url = `${__API_URL__}/news/SLO`
            let blockedWords = JSON.parse(
                localStorage.getItem("SLOblockedWordsJSON")!
            )
            let blockedFeeds = JSON.parse(
                localStorage.getItem("SLOblockedFeedsJSON")!
            )

            if (blockedWords === null) {
                localStorage.setItem("SLOblockedWordsJSON", "[]")
                blockedWords = JSON.parse(
                    localStorage.getItem("SLOblockedWordsJSON")!
                )
            }

            if (blockedFeeds == null) {
                localStorage.setItem("SLOblockedFeedsJSON", "[]")
                blockedFeeds = JSON.parse(
                    localStorage.getItem("SLOblockedFeedsJSON")!
                )
            }

            axios
                .all([
                    axios.get(url),
                    axios.post(url, {
                        blockedSources: blockedWords,
                        blockedWords: blockedFeeds,
                    }),
                ])
                .then((res) => {
                    setNewsSources(res[0].data)
                    setNewsFeed(res[1].data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [language, userFilterChange])

    useEffect(() => {
        if (newsFeed !== undefined && newsFeed !== null) {
            if (activeCategory === newsCategory.All) {
                setNewsCopy(newsFeed)
            } else if (
                language === "ENG" &&
                activeCategory === newsCategory.Slovenia
            ) {
                setActiveCategory(newsCategory.All)
                setNewsCopy(newsFeed)
            } else {
                setNewsCopy(
                    newsFeed.filter((article) => {
                        return article.category === activeCategory
                    })
                )
            }
        }
    }, [newsFeed, activeCategory])

    if (loading) {
        return <Header />
    } else {
        return (
            <languageContext.Provider
                value={{ value: language, setter: setLanguage }}>
                <Header />
                <UserFilters
                    activeCategory={{
                        setter: setActiveCategory,
                        value: activeCategory,
                    }}
                    newsSources={{ setter: setNewsSources, value: newsSources }}
                    filtersChange={{
                        setter: setUserFilterChange,
                        value: userFilterChange,
                    }}
                />
                <NewsFeed value={newsCopy} setter={setNewsCopy} />
            </languageContext.Provider>
        )
    }
}

export default App
