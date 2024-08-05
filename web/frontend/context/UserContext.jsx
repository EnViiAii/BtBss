import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    priority: "",
    status: "enable",
    info: {
      errorName: null,
      errorPriority: null,
    },
  });

  const [applyToProduct, setApplyToProduct] = useState({
    checked: "All products",
    specificProducts: [],
    productCollections: [],
    productTags: [],
  });

  const [customPrice, setCustomPrice] = useState({
    discountType: "Apply a price to selected products",
    amount: 0,
  });

  return (
    <UserContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        applyToProduct,
        setApplyToProduct,
        customPrice,
        setCustomPrice,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
