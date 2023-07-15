import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../context/ErrorProvider";

const Error = () => {
  const { error } = useContext(ErrorContext);
  const [visible, setVisible] = useState(null);

  // const handleVisibility = () =>{
  //   setVisible(current => !current)
  // }

  useEffect(()=> {
    if (error) {
      setVisible(true);
      const timer = setTimeout(()=> {
        setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }
  }, [error]);

  return visible && (
    <div>
      <p>{error}</p>
    </div>
  ) 
};

export default Error;
