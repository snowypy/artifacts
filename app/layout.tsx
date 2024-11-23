import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link";
import {Package, Github, Menu, Mail, Target, DollarSign, Server, FileText} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {AuthProvider} from "@/context/auth-context";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ByteStore',
  description: 'Build and serve Java artifacts from GitHub repositories with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header></Header>
              {children}
              <Footer></Footer>
          </div>
      </AuthProvider>
      <Toaster/>
      </body>
      </html>
  )
}