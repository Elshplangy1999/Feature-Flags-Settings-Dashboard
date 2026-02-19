import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialFeatureFlagState } from "../initials/featureFlags";
import { changeFeatureFlagStatus } from "../../services/changeFeatureFlagStatusService";
import { AppThunk } from "@/store/store";
import { FeatureFlag } from "../../interfaces/featureFlags";
import { changeFeatureFlagStatusStatic } from "./indexFeatureFlagsSlice";
import { ToastType } from "@/types/notify/toast";

export const ChangeFeatureFlagStatus = createAsyncThunk(
  "featureFlags/ChangeFeatureFlagStatus",
  async (
    { id, status }: { id: number | string; status: "enabled" | "disabled" },
    { rejectWithValue },
  ) => {
    try {
      const response = await changeFeatureFlagStatus(id, status);
      return { id, response };
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error?.response?.data?.message ??
          "Failed to change feature flag status",
      );
    }
  },
);

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as Record<string, string>).message;
  }
  return "Unknown error";
};

export const handleChangeFeatureFlagStatusThunk = (
  flag: FeatureFlag,
  t: (key: string) => string,
  showToast: (type: ToastType, title: string, message: string) => void,
): AppThunk => {
  return async (dispatch) => {
    const currentStatus = flag.status;
    const newStatus: "enabled" | "disabled" =
      currentStatus === "enabled" ? "disabled" : "enabled";

    try {
      await dispatch(
        ChangeFeatureFlagStatus({ id: flag.id, status: newStatus }),
      )
        .unwrap()
        .then(() => {
          showToast(
            "success",
            t("Congratulations!"),
            t("Flag status changed successfully"),
          );
          dispatch(
            changeFeatureFlagStatusStatic({ id: flag.id, status: newStatus }),
          );
        })
        .catch((error: unknown) => {
          showToast(
            "error",
            t("Failed to change flag status"),
            getErrorMessage(error),
          );
        });
    } catch (error: unknown) {
      showToast(
        "error",
        t("Failed to change flag status"),
        getErrorMessage(error),
      );
    }
  };
};

const changeFeatureFlagStatusSlice = createSlice({
  name: "changeFeatureFlagStatus",
  initialState: initialFeatureFlagState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChangeFeatureFlagStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(ChangeFeatureFlagStatus.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(ChangeFeatureFlagStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      });
  },
});

export default changeFeatureFlagStatusSlice.reducer;
