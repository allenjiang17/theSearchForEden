export function Toggle({active, ...props}) {

    const outerContainerStyles = [
        "w-[5rem]",
        "h-[2.5rem]",
        "flex",
        "flex-row",
        "rounded-full",
        "p-[0.2rem]",
        active ? "bg-Slate500" : "bg-Slate100",
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