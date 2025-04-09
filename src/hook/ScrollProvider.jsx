import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const requestRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        requestRef,
        scrollToSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
