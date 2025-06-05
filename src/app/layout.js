// src/app/layout.jsx
import "./globals.css";
import Navbar from "../components/Navbar"; // 👈 引入路径注意

export const metadata = {
  title: "New Creation Life Ministries",
  description: "Welcome to our church website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
