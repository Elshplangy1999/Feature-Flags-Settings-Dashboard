import { fetchData } from "@/axios/client";

export const changeFeatureFlagStatus = async (id: number | string, status: string) => {
  return fetchData({ status }, `/feature-flags/${id}`, "PATCH");
};
