"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { HeaderProps } from "@/interfaces/Header/HeaderProps";
import { setSidebarOpen } from "@/store/slices/generalFunctionalySlice";

const Header = (props: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-gray-800">
      <div className="flex grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSidebarOpen(!props.sidebarOpen));
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-gray-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side - Language and Dark Mode */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Dark Mode Switcher */}
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
