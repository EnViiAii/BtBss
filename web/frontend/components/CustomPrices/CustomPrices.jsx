import { ChoiceList, RadioButton, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import CustomPricesStyles from "./CustomPrices.module.css";
import React from "react";
import _ from "lodash";

const CustomPrices = () => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md ${CustomPricesStyles["box-shadow"]}`}
    >
      <p className="text-[16px] font-bold text-[#303030] mb-3">Custom Prices</p>
      <div className="flex flex-col gap-2">
        <ChoiceList
          choices={[
            { label: "Apply a price to selected products", value: 1 },
            {
              label:
                "Decrease a fixed amount of the original prices of selected products",
              value: 2,
            },
            {
              label:
                "Decrease the original prices of selected products by a percentage (%)",
              value: 3,
            },
          ]}
          selected={selected}
          onChange={(v) => {
            setCustomPrice({
              ...customPrice,
              info: {
                checked: v[0],
                hasError: false,
                errorMessage: null,
              },
            });
            // setSelected(v);
          }}
        />

        <TextField
          value={customPrice[index_cb].amount.toString()}
          onChange={onChange}
          type="number"
          label="Amount"
          autoComplete="off"
          error={customPrice.info.errorMessage}
        />
      </div>
    </div>
  );
};

export default CustomPrices;
