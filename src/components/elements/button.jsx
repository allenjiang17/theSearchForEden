export default function Button({children, ...props}) {
    return (
        <button className="border-2 border-black py-2 px-4 w-fit" {...props}>
            {children}
        </button>
    )
}