import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Main Page",
  description: "Portal of Yuting Chen's Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
