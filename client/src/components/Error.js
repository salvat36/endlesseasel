import { useContext } from "react";
import { ErrorContext } from "../context/ErrorProvider";

const Error = () => {
  const { error } = useContext(ErrorContext);
  return (
    <div>
      <p>{error}</p>
    </div>
  );
};

export default Error;
