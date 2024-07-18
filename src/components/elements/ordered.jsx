import React, { useEffect, useState } from "react";
import { Children } from 'react';

export function OrderedParent({children, ...props}) {
    if(typeof children === 'undefined') {
        return ( <span {...props}></span> )
    }
    steps = Children.map(children, (child) => {
        if(typeof child.order === 'undefined') {
            return 1
        }
        return child.order
    })
    let arr = Array(Children.count(children)).fill(false);
    const [finished, setFinished] = useState(arr);

//    useEffect(() => {
//       
//    }, [step])
    return(
        <span {...props}>
            {Children.map(children, (child) => {
                {child}
            })}
        </span>
    )

}
