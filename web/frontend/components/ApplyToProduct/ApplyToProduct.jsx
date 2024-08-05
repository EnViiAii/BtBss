import { ChoiceList } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import ApplyToProductStyles from "./ApplyToProduct.module.css";
import { useUserContext } from "@/context/UserContext";

const ApplyToProduct = () => {
  return (
    <div
      className={`bg-white p-4 rounded-xl ${ApplyToProductStyles["box-shadow"]}`}
    >
      <p className="text-[15px] font-bold text-[#303030] mb-4">
        Apply to product
      </p>
      <div className="flex flex-col justify-center gap-[6px] text-[13px]">
        <ChoiceList
          choices={[
            { label: "All products", value: "All products", renderChildren },
            {
              label: "Specific products",
              value: "Specific products",
              renderChildren,
            },
            {
              label: "Product collections",
              value: "Product collections",
              renderChildren,
            },
            {
              label: "Product tags",
              value: "Product tags",
              renderChildren,
            },
          ]}
          selected={selected}
          // selected={[applyToProduct.info.checked]}
          onChange={handleChoiceListChange}
        />
      </div>
    </div>
  );
};

export default ApplyToProduct;
