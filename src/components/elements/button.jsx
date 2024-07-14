export default function Button({children, ...props}) {
    return (
        <button className="border-2 border-black p-2 w-fit" {...props}>
            {children}
        </button>
    )
}