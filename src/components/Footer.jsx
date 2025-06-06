import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="h-[410px] bg-cover bg-center flex items-center"
      style={{ backgroundImage: 'url("/footersky.jpg")' }}
    >
      <div className="mx-auto max-w-[1410px] w-full px-4 text-white">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo_vertical.png"
            alt="NCLM Logo"
            width={150}
            height={150}
            className="object-contain sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px]"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-10 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
          {/* 5 lines of text */}
          <div className="space-y-2 text-base sm:text-lg leading-relaxed">
            <p>New Creation Life Ministries (NCLM)</p>
            <p className="text-[#b8d200]">Email: canadanclm@gmail.com</p>
            <p className="text-sm sm:text-base">
              Copyright ©2025 加拿大基督新人事工 All Rights Reserved.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6 text-2xl sm:text-3xl md:text-4xl mt-2">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
