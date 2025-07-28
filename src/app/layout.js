import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "New Creation Life Ministries",
  description: "Welcome to our church website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          <Navbar />
          {children}
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
