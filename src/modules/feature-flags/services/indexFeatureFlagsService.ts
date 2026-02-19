import { fetchData } from "@/axios/client";
import { FeatureFlag, FeatureFlagsResponse } from "../interfaces/featureFlags";
import { AxiosResponse } from "axios";

export const indexFeatureFlags = async (
  page: number = 1,
  data?: Record<string, unknown>,
  perPage: number = 10
): Promise<FeatureFlagsResponse> => {
  const params = {
    _page: page,
    _limit: perPage,
    ...data,
  };

  const response = await fetchData<AxiosResponse<FeatureFlag[]>>(
    params,
    "/feature-flags",
    "GET",
    true
  );

  const totalItems = Number(
    response.headers["x-total-count"] ?? response.data.length
  );

  return {
    data: response.data,
    pagination: {
      current_page: page,
      from: (page - 1) * perPage + 1,
      last_page: Math.ceil(totalItems / perPage),
      per_page: perPage,
      to: Math.min(page * perPage, totalItems),
      total: totalItems,
    },
  };
};