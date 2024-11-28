'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <Card className="w-full max-w-5xl mx-auto bg-card">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center text-primary font-bold">Privacy Policy</CardTitle>
                            <p className="text-sm text-muted-foreground">Last Updated: 11/27/2024</p>
                        </CardHeader>
                        <CardContent className="text-left space-y-4">
                            <p className="text-lg">
                                This Privacy Policy outlines the types of information we collect, how we use it, and your rights regarding your data.
                            </p>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">1.</span> Information We Collect
                            </h2>
                            <p>
                                We collect information that you provide directly to us, such as when you create an account and interact with our services. This may include:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Personal information (e.g., name, email address, access tokens, refresh tokens)</li>
                                <li>Activity data (e.g., login dates, projects you view)</li>
                            </ul>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">2.</span> How We Use Your information
                            </h2>
                            <p>
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Provide and maintain our services</li>
                                <li>Communicate with you, including sending updates or notifications</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">3.</span> Data Storage and Retention
                            </h2>
                            <p>
                                We store user data and content, including artifacts generated during the build process, to provide our services. However, we do not guarantee that artifacts will be retained for longer than one month if inactive. After one month of inactivity, artifacts may be deleted or become inaccessible.<br/><br/>

                                Please note that while we take reasonable steps to protect your data, we do not assume responsibility for data loss or deletion beyond the stated retention period.
                            </p>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">4.</span> Data Security
                            </h2>
                            <p>
                                We take appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is completely secure.
                            </p>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">5.</span> Sharing Your Information
                            </h2>
                            <p>
                                We do not sell or rent your personal information to third parties. However, we may share your information in the following cases:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>With service providers who assist us in providing our services</li>
                                <li>As required by law or to protect our legal rights</li>
                                <li>In connection with a merger, acquisition, or sale of assets</li>
                            </ul>
                            <h2 className="text-xl font-semibold">
                                <span className="text-primary">6.</span> Your Rights
                            </h2>
                            <p>
                                You have the right to access, correct, or delete your personal information. You can also opt out of certain communications. To exercise your rights, please contact us <Link href="/contact" className="underline hover:text-primary">Here</Link>.
                            </p>

                            <p className="text-sm text-gray-500">
                                If you have any questions about this privacy policy, please contact us <Link href="/contact"
                                                                                                     className="underline hover:text-primary">Here</Link>.
                            </p>
                        </CardContent>
                    </Card>
                </motion.section>
            </main>
        </div>
    );
}