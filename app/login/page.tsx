'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'
import type { SimpleIcon } from 'simple-icons';

export default function LoginPage() {

  const handleGitHubLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/github`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      <main className="flex-grow flex items-center justify-center bg-background">
        <motion.section
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-center mb-12"
        >
          <Card className="w-full max-w-md bg-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in to Artifacts</CardTitle>
              <CardDescription className="text-center">
                Use your GitHub account to access Artifacts
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                  variant="outline"
                  onClick={handleGitHubLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <>
                  <Github className="mr-2 h-4 w-4"/>
                  Sign in with GitHub
                </>

              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.section>
      </main>
    </div>
)
}