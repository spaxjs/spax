import React, { useState } from "react";

const LocalCounter = ({ children, ...props }: any): React.ReactElement => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <h1>{props.title}</h1>
        <button
          onClick={() => setCount(prevCount => prevCount - 1)}
        >-</button>
        {count}
        <button
          onClick={() => setCount(prevCount => prevCount + 1)}
        >+</button>
      </div>
      {children}
    </>
  );
};

export default LocalCounter;
