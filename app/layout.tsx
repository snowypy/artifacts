import './globals.css'
import type { Metadata } from 'next'
import React from "react"
import localFont from 'next/font/local';
import { Toaster } from "@/components/ui/toaster"
import {AuthProvider} from "@/context/auth-context";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
export const metadata: Metadata = {
  title: 'Artifacts',
  description: 'Build and serve Java artifacts from GitHub repositories with ease',
}

const monaspacekrypton = localFont({
    src: [
        {
            path: '../public/fonts/MonaspaceNeon-Regular.woff',
            weight: '400',
            style: 'normal',
        }
    ],
    variable: '--font-krypton'
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={monaspacekrypton.className}>
            <AuthProvider>
                <div className="flex flex-col min-h-screen bg-background text-foreground">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </AuthProvider>
            <Toaster />
        </body>
        </html>
    )
}