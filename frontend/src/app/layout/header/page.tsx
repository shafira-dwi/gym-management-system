"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Notifications from "./notifications";
import Profile from "./profile";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setDark(!dark);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className={`header ${isSticky ? "sticky shadow-md" : ""}`}>
      <div className="flex items-center gap-4">
        {/* mobile menu nanti */}
        <Icon icon="tabler:menu-2" width={24} className="xl:hidden cursor-pointer" />
      </div>

      <div className="flex items-center gap-5">
        {/* Dark Mode */}
        <button onClick={toggleTheme} className="cursor-pointer">
          {dark ? <Icon icon="solar:sun-bold-duotone" width={22} /> : <Icon icon="tabler:moon" width={22} />}
        </button>

        {/* Notification */}
        <Notifications />

        {/* Profile */}
        <Profile />
      </div>
    </header>
  );
}
