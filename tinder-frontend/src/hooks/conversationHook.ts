import { useEffect, useState } from "react";
// this function get the heigth of the page and resize the page hiegt to the current heigth

export const useConversationHight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    const resize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);


  return height;
};

