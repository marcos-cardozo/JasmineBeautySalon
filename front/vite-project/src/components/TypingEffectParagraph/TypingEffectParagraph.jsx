/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const TypingEffectParagraph = ({ text, speed = 50, className= "" }) => {
  const [displayEffect, setDisplayEffect] = useState("");
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayEffect((prev) => prev + text[index]);
      index += 1;

      if (index === text.length - 1) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className={className}>{displayEffect}</p>;
};

export default TypingEffectParagraph;
