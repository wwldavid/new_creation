"use client";

import { useContext, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { AdminContext } from "@/context/AdminContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, logout } = useContext(AdminContext);
  const router = useRouter();
  const { lang } = useParams();
  const currentLang = lang === "zh" ? "zh" : "en";
  const nextLang = currentLang === "en" ? "zh" : "en";

  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const basePath = pathname.replace(/^\/(en|zh)/, "");

  const navLinks = [
    { href: "/", label: "Home" },

    { href: "/camp", label: "Training Camp" },
    { href: "/sermons", label: "Sermons" },
    { href: "/event", label: "Events" },
    { href: "/connect", label: "Connect" },
    { href: "/donate", label: "Donate" },
    { href: "/language", label: currentLang === "en" ? "中文" : "English" },
    { href: "/admin", label: "Admin Panel" },
  ];
  function handleLogout() {
    logout();
  }

  return (
    <nav
      className="w-full h-[110px]"
      style={{
        backgroundImage: "url('/starsky.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'EB Garamond', serif",
      }}
    >
      <div className="max-w-[1410px] h-full mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="w-[80px] h-[103px]">
          {/* <Image
            src="/seed.png"
            alt="New Creation Logo"
            width={103}
            height={80}
            className="w-[80px] h-[103px] object-contain"
          /> */}
          <Image
            src="/seed_bg_w.png"
            alt="New Creation Logo"
            width={103}
            height={103}
            className="w-[103px] h-[103px] object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 mt-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;

            if (href === "/language" && isAdminPage) return null;

            if (href === "/language") {
              return (
                <Link
                  key="language"
                  href={`/${nextLang}${basePath}`}
                  className={`
                text-xl flex items-center justify-center w-20
                transition-colors 
                ${
                  isActive
                    ? "text-white bg-[#b59959] px-4 border border-[#b59959] rounded-2xl"
                    : "text-white bg-[#495859]/50 px-4 border border-[#495859] rounded-2xl shadow-md shadow-[#495859] hover:bg-[#b59959]"
                }
                `}
                >
                  {label}
                </Link>
              );
            }

            if (href === "/admin") {
              return isAdmin ? (
                <button
                  key={href}
                  onClick={handleLogout}
                  className="text-xl text-white bg-[#b59959] px-4 border border-[#b59959] rounded-2xl shadow-md shadow-[#495859] "
                >
                  Logout
                </button>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={`
                    text-xl transition-colors
                    ${
                      isActive
                        ? "text-white bg-[#b59959] px-4 border border-[#b59959] rounded-2xl"
                        : "text-white bg-[#495859]/50 px-4 border border-[#495859] rounded-2xl shadow-md shadow-[#495859] hover:bg-[#b59959]"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            }

            return (
              <Link
                key={href}
                href={`/${currentLang}${href}`}
                className={`
                text-xl 
                transition-colors 
                ${
                  isActive
                    ? "text-white bg-[#b59959] px-4 border border-[#b59959] rounded-2xl"
                    : "text-white bg-[#495859]/50 px-4 border border-[#495859] rounded-2xl shadow-md shadow-[#495859] hover:bg-[#b59959]"
                }
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white underline text-2xl"
          onClick={() => setIsOpen(true)}
        >
          Menu
        </button>
      </div>

      {/* Slide-out Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[50%] bg-[#495859] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={32} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 px-8 text-xl mt-6">
          {navLinks.map(({ href, label }) => {
            if (href === "/language") {
              return (
                <Link
                  key="language-mobile"
                  href={`/${nextLang}${basePath}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              );
            }

            if (href === "/admin") {
              return isAdmin ? (
                <button
                  key={href}
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="…"
                >
                  Logout
                </button>
              ) : (
                <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              );
            }

            return (
              <Link
                key={href}
                href={`/${currentLang}${href}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
