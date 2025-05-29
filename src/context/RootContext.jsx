import React, { useEffect, useState } from "react";
import { BodyContext } from ".";

const RootContext = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [modal, setModal] = useState(false);

  useEffect(() => {}, [language]);

  return (
    <BodyContext.Provider
      value={{
        language,
        modal,
        setModal,
        setLanguage,
      }}
    >
      {children}
    </BodyContext.Provider>
  );
};

export default RootContext;
