import React from "react";
import { toast } from "react-toastify";

export const SuccessTaster = (message) => {
  toast.success(message);
};

export const ErrorTaster = (message) => {
  toast.error(message);
};
