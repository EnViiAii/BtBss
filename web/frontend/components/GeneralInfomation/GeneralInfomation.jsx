import React from "react";
import { FormLayout, Select, TextField } from "@shopify/polaris";
import GeneralStyles from "./GeneralInfomation.module.css";
import { useUserContext } from "@/context/UserContext";

const options = [
  { label: "Enable", value: "enable" },
  { label: "Disable", value: "disable" },
];

const GeneralInfomation = () => {
  const { generalInfo, setGeneralInfo } = useUserContext();

  const validateField = (field, value) => {
    let error = "";
    if (field === "name" && !value) {
      error = "Name is required";
    } else if (field === "priority") {
      if (!value || isNaN(value) || value < 0 || value > 99) {
        error = "Priority must be an integer from 0 to 99";
      }
    }
    setGeneralInfo((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [`error${field.charAt(0).toUpperCase() + field.slice(1)}`]: error,
      },
    }));
    return error === "";
  };

  const onChange = (field, value) => {
    setGeneralInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };

  const validate = () => {
    const nameValid = validateField("name", generalInfo.name);
    const priorityValid = validateField("priority", generalInfo.priority);
    return nameValid && priorityValid;
  };

  return (
    <div className={`bg-white p-4 rounded-xl ${GeneralStyles["box-shadow"]}`}>
      <p className="text-[15px] font-bold text-[#303030] mb-4">
        General Information
      </p>
      <div className="flex flex-col justify-center gap-2 text-[13px]">
        <TextField
          value={generalInfo.name}
          onChange={(value) => onChange("name", value)}
          type="text"
          label="Name"
          autoComplete="off"
          error={generalInfo.info.errorName}
        />
        <TextField
          value={generalInfo.priority}
          onChange={(value) => onChange("priority", value)}
          type="text"
          label="Priority"
          autoComplete="off"
          error={generalInfo.info.errorPriority}
          helpText={
            <span className="">
              Please enter an integer from 0 to 99. 0 is the highest priority
            </span>
          }
        />
        <Select
          label="Status"
          options={options}
          onChange={(value) => onChange("status", value)}
          value={generalInfo.status}
        />
      </div>
    </div>
  );
};

export default GeneralInfomation;
