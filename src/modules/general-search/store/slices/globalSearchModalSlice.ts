import { createSlice } from "@reduxjs/toolkit";
import { initialGlobalSearchModalState } from "../initials/globalSearchModalState";

const globalSearchModalSlice = createSlice({
  name: "globalSearchModal",
  initialState: initialGlobalSearchModalState,
  reducers: {
    openSearchModal: (state) => {
      state.isModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } =
  globalSearchModalSlice.actions;
export default globalSearchModalSlice.reducer;
