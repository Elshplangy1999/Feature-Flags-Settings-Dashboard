import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialGeneralState } from "../initials/general";

const generalFunctionalySlice = createSlice({
  name: "generalFunctionalySlice",
  initialState: {
    ...initialGeneralState,
  },
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = generalFunctionalySlice.actions;
export default generalFunctionalySlice.reducer;