'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from 'lucide-react'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleGitHubLogin = async () => {
        setIsLoading(true)
        // TODO: Implement GitHub OAuth login
        console.log('GitHub login initiated')
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">

            <main className="flex-grow flex items-center justify-center bg-background">
                <Card className="w-full max-w-md bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Sign in to ByteStore</CardTitle>
                        <CardDescription className="text-center">
                            Use your GitHub account to access ByteStore
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button
                            variant="outline"
                            onClick={handleGitHubLogin}
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
                            ) : (
                                <>
                                    <Github className="mr-2 h-4 w-4" />
                                    Sign in with GitHub
                                </>
                            )}
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
            </main>
        </div>
    )
}