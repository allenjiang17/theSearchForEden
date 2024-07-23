import React, { useEffect, useState } from "react";

/* 
 * Create a dialogue box (span) that displays text one letter at a time
 *
 * @param {string} text the text to display; `|` characters are interpretted as breaks
 * @param {number} speed the break between letters in milliseconds
 * @param {callback} function to call when the dialogue is done
 * @param {boolean} skippable whether the user can skip the dialogue by clicking the mouse or
 *    pressing the space bar
 * @returns {html} the dialogue box
 */

export default function DialogueBox({text, speed=20, callBack, skippable=true, ...props}) {
    if (typeof text === 'undefined') {
        return(<span></span>)
    }

    const [displayText, setDisplayText] = useState('');
    const [skipped, setSkipped] = useState(false);
    let i = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            if(skipped) {
                setDisplayText(text);
                clearInterval(interval);
                callBack();
                return
            }
            i = i + 1;
            setDisplayText(text.slice(0, i));

            if (i >= text.length) {
              callBack();
              clearInterval(interval);
            }
        }, speed);
        return () => {
            clearInterval(interval);
        };
    }, [text, skipped]);

    const handleMouseClick = (e) => {
        if (skippable) { setSkipped(true); }
    };

    /* TODO
    const handleSpace = (e) => {
        if (e.keyCode === 32) {
            setInputValue("");
        }
    };
    */

    return (
        <span className="w-full text-left" onClick={handleMouseClick} {...props}>
            {displayText}
        </span>
    )
}
