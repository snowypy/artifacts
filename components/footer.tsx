import {DollarSign, FileText, Github, Mail, Server, Target} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">ByteStore</h3>
                        <p className="text-sm text-gray-400">Empowering developers with cutting-edge artifact
                            management.</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/nathanweisz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-300 transition-colors duration-200"
                                aria-label="Nathan Weisz's GitHub"
                            >
                                <Github className="h-6 w-6"/>
                            </a>
                            <a
                                href="https://github.com/snowyjs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-300 transition-colors duration-200"
                                aria-label="snowyjs's GitHub"
                            >
                                <Github className="h-6 w-6"/>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms"
                                      className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                                    <FileText className="h-4 w-4 mr-2"/>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/goals"
                                      className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                                    <Target className="h-4 w-4 mr-2"/>
                                    Our Goals
                                </Link>
                            </li>
                            <li>
                                <Link href="/fund"
                                      className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                                    <DollarSign className="h-4 w-4 mr-2"/>
                                    ByteStore Fund
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/donate"
                                      className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                                    <Server className="h-4 w-4 mr-2"/>
                                    Donate a Node
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@bytestore.org"
                                   className="hover:text-gray-300 transition-colors duration-200 flex items-center">
                                    <Mail className="h-4 w-4 mr-2"/>
                                    support@bytestore.org
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Newsletter</h4>
                        <p className="text-sm text-gray-400">Stay updated with our latest features and releases.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                            />
                            <Button type="submit" variant="secondary" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} ByteStore. All rights reserved.</p>
                    <p className="mt-2 text-sm text-gray-500">Created with ❤️ by Nathan Weisz and Cigan</p>
                </div>
                <div className="mt-4 flex justify-center items-center">
                    <span className="text-sm text-gray-400 mr-2">Powered by</span>
                    <Link
                        href="https://darkless.cloud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/images/darkless.webp"
                            alt="DarkLess"
                            width={100}
                            height={24}
                            className="h-6 w-auto"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    )
}