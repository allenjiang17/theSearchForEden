import React, { useEffect, useState } from "react";

export default function DialogueBox({text, speed=15, callBack, ...props}) {
    if (typeof text === 'undefined') {
        return(<span></span>)
    }

    const [displayText, setDisplayText] = useState('');
    let i = 0;

    useEffect(() => {
      const interval = setInterval(() => {
          i = i + 1;
          setDisplayText(text.slice(0, i));

          if (i >= text.length) {
            callBack();
          }
      }, speed);
      return () => {
        clearInterval(interval);
      };
    }, [text]);

    return (
        <span className="w-full text-left" {...props}>
            {displayText}
        </span>
    )
}
