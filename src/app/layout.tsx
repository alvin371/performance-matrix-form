import type {Metadata} from 'next';
import './globals.css';
import { AntdRegistry } from '@/components/antd-registry';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Form Maestro',
  description: 'A dashboard to compare React Hook Form and Ant Design form performance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AntdRegistry>{children}</AntdRegistry>
        <Toaster />
      </body>
    </html>
  );
}
