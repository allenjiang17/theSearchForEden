

export default function NavBar({setPage}) {

    return (
        <div className="flex flex-row gap-5 justify-start items-center">
            <button className="hover:underline" onClick={()=>{setPage("map")}}>Main Map</button>
            <button className="hover:underline" onClick={()=>{setPage("character")}}>Character</button>
            <button className="hover:underline" onClick={()=>{setPage("inventory")}}>Inventory</button>
            <button className="hover:underline" onClick={()=>{setPage("quests")}}>Quests</button>
        </div>
    )



}