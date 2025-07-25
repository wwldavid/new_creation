"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5"; // 关闭图标

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },

    { href: "/camp", label: "Training Camp" },
    { href: "/sermons", label: "Sermons" },
    { href: "/event", label: "Events" },
    { href: "/connect", label: "Connect" },
    { href: "/donate", label: "Donate" },
  ];

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
        <div className="hidden md:flex space-x-8 text-white text-2xl mt-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
