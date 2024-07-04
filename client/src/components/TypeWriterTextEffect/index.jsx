import React from 'react'
import Typewriter from 'typewriter-effect';

function TypeWriterText({ text, onTextCompleted }) {
    return (
        <Typewriter
            options={{
                delay: 30,
                autoStart: true
            }}
            onInit={(typewriter) => {
                typewriter.typeString(text)
                    .callFunction(() => {
                        onTextCompleted(true)
                    })
                    .start();
            }}
        />
    )
}

export default TypeWriterText