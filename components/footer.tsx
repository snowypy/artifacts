import { DollarSign, FileText, Github, Mail, Server, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div>
            <h3 className="text-2xl font-bold mb-2">Artifacts</h3>
            <p className="text-sm text-gray-400">
              Empowering developers with cutting-edge artifact management.
            </p>
            <div className="flex space-x-4 mt-4">
              {[
                { href: "https://github.com/nathanweisz", label: "Nathan Weisz's GitHub" },
                { href: "https://github.com/snowyjs", label: "SnowyJS's GitHub" },
                { href: "https://github.com/ohemilyy", label: "Luna's GitHub" },
              ].map(({ href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  <Github className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/terms", label: "Terms of Service", icon: FileText },
                { href: "/goals", label: "Our Goals", icon: Target },
                { href: "/fund", label: "Artifacts Fund", icon: DollarSign },
              ].map(({ href, label, icon: Icon }, index) => (
                <li key={index}>
                  <Link href={href} className="flex items-center hover:text-gray-300 transition-colors">
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/donate" className="flex items-center hover:text-gray-300 transition-colors">
                  <Server className="h-4 w-4 mr-2" />
                  Donate a Node
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@artifacts.?"
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  support@artifacts.?
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">
              Stay updated with our latest features and releases.
            </p>
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


        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Artifacts. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500">
            Created with ❤️ by Nathan, Cigan, and Luna
          </p>
          <div className="mt-4 flex justify-center items-center">
            <span className="mr-2">Powered by</span>
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
      </div>
    </footer>
  );
}
