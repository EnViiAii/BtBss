import { Icon } from "@shopify/polaris";

import { ArrowLeftIcon } from "@shopify/polaris-icons";
// import clsx from "clsx";
import Button from "@/components/Button";
import GeneralInfomation from "@/components/GeneralInfomation/GeneralInfomation";
import ApplyToProduct from "@/components/ApplyToProduct/ApplyToProduct";
import CustomPrices from "@/components/CustomPrices/CustomPrices";
import ShowProductPricingDetail from "@/components/ShowProductPricing/ShowProductPricingDetail";
import { useAppQuery } from "@/hooks";
import { useEffect, useState } from "react";
import Title from "@/components/Title";
import { useUserContext } from "@/context/UserContext";

export default function HomePage() {
  const {
    data: result,
    refetch: refetchProductProducts,
    isLoading: isLoadingProducts,
    isRefetching: isRefetchingProducts,
  } = useAppQuery({
    url: "/api/products",
    reactQueryOptions: {
      onSuccess: () => {},
    },
  });

  const {
    generalInfo,
    setGeneralInfo,
    applyToProduct,
    setApplyToProduct,
    customPrice,
    setCustomPrice,
  } = useUserContext();

  const data = result?.body.data.products.nodes;

  const onSubmit = async () => {
    console.log("submit");
  };

  // useEffect(() => {
  //   if (data?.length > 0)
  //     // setApplyToProduct((prev) => ({
  //     //   ...prev,
  //     //   "All products": data,
  //     // }));
  // }, [data]);

  const onResetForm = () => {
    setGeneralInfo({
      name: "",
      priority: 0,
      status: "Enable",
    });
    setApplyToProduct([]);
    setCustomPrice({
      discountType: "Apply a price to selected products",
      amount: "0",
    });
  };

  if (!data || data.length == 0)
    return (
      <div className="w-full flex items-center justify-center mt-40 gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <p className="text-gray-500 font-normal">Loading...</p>
      </div>
    );

  return (
    <div className="flex gap-6 w-[966px] mx-auto">
      <div className="flex-1 gap-10">
        <div className="flex items-center justify-start gap-1">
          <p className="m-0 cursor-pointer p-1 rounded-lg hover:bg-gray-300">
            <Icon source={ArrowLeftIcon} />
          </p>
          <Title>New Pricing Rule</Title>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <GeneralInfomation />
          <ApplyToProduct />
          <CustomPrices />
          <div className="w-fit ml-auto space-x-3 pb-4">
            <Button type="secondary" onClick={onResetForm}>
              Reset
            </Button>
            <Button type="primary" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        <Title bg>Show Product Pricing Details</Title>
        <ShowProductPricingDetail onResetForm={onResetForm} />
      </div>
    </div>
  );
}
