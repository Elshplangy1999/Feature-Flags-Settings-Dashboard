import FeatureFlagsStore from "@/modules/feature-flags/store/store";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import generalFunctionalyReducer from "../store/slices/generalFunctionalySlice";

export const store = configureStore({
  reducer: {
    ...FeatureFlagsStore,
    generalFunctionalyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;