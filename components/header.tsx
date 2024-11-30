'use client'

import * as React from "react";
import Link from "next/link";
import { Menu, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useAuth} from "@/context/auth-context";

export function Header() {
    const { user } = useAuth()

    return (
        <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl md:text-2xl font-bold flex items-center text-primary">
                    <Package className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                    <span className="hidden sm:inline">Artifacts</span>
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        {user == null ?
                            <li>
                                <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                                    Login
                                </Link>
                            </li>
                                :
                            <li>
                                <Link href="/account" className="text-foreground hover:text-primary transition-colors">
                                    Account
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-primary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                </Button>
            </div>
        </header>
    );
}