
export default function OverlayBox({children, ...props}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-50 opacity-80 bg-black" {...props}>
            <div className="w-8/12 h-8/12 left-2/12 top-2/12 flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}
