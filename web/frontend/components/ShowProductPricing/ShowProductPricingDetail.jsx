import { DataTable, LegacyCard } from "@shopify/polaris";
import { useEffect, useState } from "react";
import showProductStyles from "./ShowProductPricingDetail.module.css";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const handleCleanData = (data) => {
  return (
    <div
      className={`text-[14px] rounded-xl ${showProductStyles["box-shadow"]}`}
    >
      <DataTable
        columnContentTypes={["text", "numeric"]}
        headings={["Rule Name", "Priority"]}
        rows={rows}
        footerContent={footerContent}
      />
    </div>
  );
};

export default ShowProductPricingDetail;
