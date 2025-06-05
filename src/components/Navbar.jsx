import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
      {/* 版心容器 */}
      <div className="max-w-[1410px] h-full mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Image
            src="/logo.png"
            alt="New Creation Logo"
            width={320}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* 导航按钮 */}
        <div
          className="flex space-x-8 text-white text-2xl"
          style={{
            height: "35px",
            alignItems: "flex-end",
            display: "flex",
            marginTop: "60px",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/events">Events</Link>
          <Link href="/sermons">Sermons</Link>
          <Link href="/connect">Connect</Link>
          <Link href="/donate">Donate</Link>
        </div>
      </div>
    </nav>
  );
}
