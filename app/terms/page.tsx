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
                <span className="text-primary">2.</span> Our Services
              </h2>
              <p>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.

              The Services are not tailored to comply with industry-specific regulations (such as Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.). Therefore, if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).

              Please note that we are a group of independent developers and not a legal company. As such, we do not assume any formal business entity or corporate structure, and the Services are provided on a non-commercial, collaborative basis.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">3.</span> Intellectual Property Rights
              </h2>
              <p>
              We, the developers behind the Services, own or are licensed to use all intellectual property rights in the Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
              
              Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
              
              The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.
              Your use of our Services
              
              Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
              
                  Access the Services.
                  Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.
              
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please contact us at: contact@bytestore.org. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
              
              We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
              
              Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
              Your submissions
              
              By submitting any content, question, comment, suggestion, idea, feedback, or other information ("Submissions") to us through the Services, you agree to assign all intellectual property rights in such Submission to us. We will own this Submission and have the unrestricted right to use and distribute it for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
              
              You are responsible for what you post or upload: By sending us Submissions through any part of the Services, you confirm:
              
                  You have read and agree with our "PROHIBITED ACTIVITIES" and will not submit illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening, sexually explicit, false, or misleading content.
                  You waive any moral rights to any Submission to the extent permissible by law.
                  Your Submissions are original to you or that you have the necessary rights to submit them, and you have full authority to grant us the rights as mentioned.
                  Your Submissions do not constitute confidential information.
              
              You are solely responsible for your Submissions, and you agree to indemnify us for any losses arising from your breach of these terms or any third-party intellectual property rights.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">4.</span> Limitations of Liability
              </h2>
              <p>
              By using the Services, you represent and warrant that:

              All registration information you submit is true, accurate, current, and complete.
              You will maintain the accuracy of such information and promptly update it as needed.
              You have the legal capacity and agree to comply with these Terms of Service.
              You are not a minor in the jurisdiction in which you reside, or if you are a minor, you have received parental permission to use the Services.
              You will not access the Services through automated or non-human means (e.g., bots or scripts).
              You will not use the Services for illegal or unauthorized purposes.
              Your use of the Services will not violate any applicable law or regulation.
              
              If you provide any false or inaccurate information, we have the right to suspend or terminate your account and refuse any current or future use of the Services.
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