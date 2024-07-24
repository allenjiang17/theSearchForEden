export default function Toggle({active, ...props}) {

    const outerContainerStyles = [
        "w-[3.2rem]",
        "h-[1.8rem]",
        "flex",
        "flex-row",
        "rounded-full",
        "p-[0.2rem]",
        active ? "bg-black" : "bg-gray-400",
        active ? "justify-end" : "justify-start"
    ];

    const outerContainer = outerContainerStyles.join(' ');

    return(
        <div className={outerContainer} {...props}>
            <div className="w-1/2 h-full rounded-full bg-white">
                <span></span>
            </div>
        </div>
    )



}
