import { useEffect, useState } from "react";

const useColorMode = () => {
  // Initialize with a function to read from localStorage immediately
  const [colorMode, setColorMode] = useState(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('color-theme');
      return stored || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Update localStorage and document class when colorMode changes
    localStorage.setItem('color-theme', colorMode);
    
    const root = document.documentElement;
    if (colorMode === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export default useColorMode;