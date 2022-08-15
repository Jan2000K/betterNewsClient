import { useContext } from "react"
import SVNicon from "../../assets/SVNFlag.svg"
import UKicon from "../../assets/UKFlag.svg"
import { languageContext } from "../../context/languageContext"

export default function Header() {
    let langCtx = useContext(languageContext)

    return (
        <section className=" text-md md:text-2xl text-center font-medium bg-amber-400 grid grid-cols-3 ">
            <h1 className=" inline-block col-start-2 col-end-3 self-center">
                {langCtx.value === "ENG" ? "Better News" : "Boljše Novice"}
            </h1>
            <div className="flex flex-row-reverse float-right col-start-3">
                <img
                    className="h-10 w-10 sm:h-14 sm:w-14 mx-2 hover:cursor-pointer"
                    src={SVNicon}
                    alt="Slovenia Flag"
                    onClick={() => {
                        langCtx.setter("SVN")
                    }}
                />
                <img
                    className="h-10 w-10 sm:h-14 sm:w-14 mx-2 hover:cursor-pointer"
                    src={UKicon}
                    alt="UK Flag"
                    onClick={() => {
                        langCtx.setter("ENG")
                    }}
                />
            </div>
        </section>
    )
}
