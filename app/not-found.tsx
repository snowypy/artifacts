'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { PackageSearch } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="inline-block"
                >
                    <PackageSearch className="w-24 h-24 text-primary mb-8" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-xl mb-8 text-muted-foreground">Oops! It seems this artifact is missing.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/">
                        Return to Homepage
                    </Link>
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 text-sm text-muted-foreground"
            >
                <p>Lost? Try searching for your artifact or check our documentation.</p>
            </motion.div>

            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </div>
    )
}

