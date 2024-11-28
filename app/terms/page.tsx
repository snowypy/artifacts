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
          <Card className="w-full max-w-3xl mx-auto bg-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-primary font-bold">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-lg">
                Welcome to ByteStore. By using our services, you agree to the following terms and conditions.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">1.</span> Introduction
              </h2>
              <p>
                These terms and conditions govern your use of our website and services. By creating an account, you accept these terms in full. If you disagree with these terms, you are prohibited from using our services.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">2.</span> Intellectual Property Rights
              </h2>
              <p>
                Unless otherwise stated, we own the property rights for the code and assets used on our website and services. This does not include user uploaded content.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">3.</span> User Content
              </h2>
              <p>
                You allow us to use, store, and deploy the content you upload to Bytestore. You are responsible for the content you upload and must not upload any content that is illegal or infringes on the rights of others.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">4.</span> Limitations of Liability
              </h2>
              <p>
                We will not be liable for any loss or damage of any nature. This includes loss of data, profits, or business. We will not be liable for any indirect or consequential loss.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">5.</span> Changes to Terms
              </h2>
              <p>
                We may revise these terms from time to time. The revised terms will apply to the use of our services from the date of publication.
              </p>
              <p className="text-sm text-gray-500">
                If you have any questions about these terms, please contact us <Link href="/contact" className="underline hover:text-primary">Here</Link>.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}