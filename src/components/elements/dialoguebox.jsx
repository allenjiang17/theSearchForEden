import React, { useEffect, useState } from "react";

export default function DialogueBox({text, speed=30, ...props}) {
    if (typeof text === 'undefined') {
        return(<span></span>)
    }

    const [displayText, setDisplayText] = useState('');
    let i = 0;

    useEffect(() => {
      const interval = setInterval(() => {
          i = i + 1;
          setDisplayText(text.slice(0, i));
      }, speed);
      return () => {
        clearInterval(interval);
      };
    }, [text]);

    return (
        <span {...props}>
            {displayText}
        </span>
    )
}
