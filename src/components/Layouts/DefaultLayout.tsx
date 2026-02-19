"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Header from "@/components/Header/index";
import Sidebar from "@/components/Sidebar/index";
import { setSidebarOpen } from "@/store/slices/generalFunctionalySlice";
import { DefaultLayoutProps } from "@/interfaces/Layouts/DefaultLayoutProps";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const { sidebarOpen } = useSelector(
    (state: RootState) => state.generalFunctionalyReducer,
  );

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  // Create a wrapper function that dispatches the action
  const handleSetSidebarOpen = (value: boolean) => {
    dispatch(setSidebarOpen(value));
  };

  return (
    <div className="flex h-screen overflow-hidden" suppressHydrationWarning>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={handleSetSidebarOpen} // Pass the wrapper function
      />

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={handleSetSidebarOpen} // Same here
        />

        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
