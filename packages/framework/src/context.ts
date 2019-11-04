import React from "react";

export const Context = React.createContext(null);

export const useContext = () => {
  return React.useContext(Context);
};
