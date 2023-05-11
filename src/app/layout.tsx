import "./globals.css";

export const metadata = {
  title: "Next.js Todos",
  description: "Simple Todo app in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
