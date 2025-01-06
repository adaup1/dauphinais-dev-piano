import { useCallback } from "react";
import { FormData } from "../types.d";

export const useSendEmail = () => {
  const sendEmail = useCallback(async (data: FormData) => {
    const apiEndpoint = "/api/contact";

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result.message;
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { sendEmail };
};
