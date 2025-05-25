import React, { useEffect, useState } from "react";
import { BodyContext } from ".";

const RootContext = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    },[language]);

  return (
    <BodyContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </BodyContext.Provider>
  );
};

export default RootContext;
