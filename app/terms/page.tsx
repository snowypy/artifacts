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
              <CardTitle className="text-2xl text-center text-primary font-bold">Terms of Service</CardTitle>
              <p className="text-sm text-muted-foreground">Last Updated: 11/27/2024</p>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-lg">
                Welcome to Artifacts. By using our services, you agree to the following terms and conditions.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">1.</span> Introduction
              </h2>
              <p>
                These terms and conditions govern your use of our website and services. By creating an account, you
                accept these terms in full. If you disagree with these terms, you are prohibited from using our
                services.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">2.</span> Our Services
              </h2>
              <p>
                The information provided when using the Services is not intended for distribution to or use by any
                person or entity in any jurisdiction or country where such distribution or use would be contrary to law
                or regulation or which would subject us to any registration requirement within such jurisdiction or
                country. Accordingly, those persons who choose to access the Services from other locations do so on
                their own initiative and are solely responsible for compliance with local laws, if and to the extent
                local laws are applicable.<br/><br/>

                The Services are not tailored to comply with industry-specific regulations (such as Health Insurance
                Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.).
                Therefore, if your interactions would be subjected to such laws, you may not use the Services. You may
                not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).<br/><br/>

                Please note that we are a group of independent developers and not a legal company. As such, we do not
                assume any formal business entity or corporate structure, and the Services are provided on a
                non-commercial, collaborative basis.<br/><br/>
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">3.</span> Intellectual Property Rights
              </h2>
              <p>
                We, the developers behind the Services, own or are licensed to use all intellectual property rights in
                the Services, including all source code, databases, functionality, software, website designs, audio,
                video, text, photographs, and graphics in the Services (collectively, the &#34;Content&#34;), as well as
                the trademarks, service marks, and logos contained therein (the &#34;Marks&#34;).<br/><br/>

                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual
                property rights and unfair competition laws) and treaties in the United States and around the
                world.<br/><br/>

                The Content and Marks are provided in or through the Services &#34;AS IS&#34; for your personal,
                non-commercial use or internal business purpose only.<br/>
                <span className="text-">Your use of our Services</span>
                <br/><br/>
                Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms
                and your right to use our Services will terminate immediately.<br/><br/>

                By submitting any content, question, comment, suggestion, idea, feedback, or other information
                (&#34;Submissions&#34;) to us through the Services, you agree to assign all intellectual property rights
                in such Submission to us. We will own this Submission and have the unrestricted right to use and
                distribute it for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to
                you.<br/><br/>

                You are responsible for what you post or upload: By sending us Submissions through any part of the
                Services, you confirm:
              </p>
              <ul className="list-disc pl-5">
                <li>You have read and agree with our &#34;PROHIBITED ACTIVITIES&#34; and will not submit illegal,
                  harassing,
                  hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening, sexually
                  explicit, false, or misleading content.
                </li>
                <li>You waive any moral rights to any Submission to the extent permissible by law.</li>
                <li>Your Submissions are original to you or that you have the necessary rights to submit them, and you
                  have
                  full authority to grant us the rights as mentioned.
                </li>
                <li>Your Submissions do not constitute confidential information.</li>
              </ul>
              <p>
                You are solely responsible for your Submissions, and you agree to indemnify us for any losses arising
                from your breach of these terms or any third-party intellectual property rights.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">4.</span> User Representation
              </h2>
              <p>
                By using the Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5">
                <li>All registration information you submit is true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update it as needed.</li>
                <li>You will not access the Services through automated or non-human means (e.g., bots or scripts).</li>
                <li>You will not use the Services for illegal or unauthorized purposes.</li>
                <li>Your use of the Services will not violate any applicable law or regulation.</li>
              </ul>
              <p>
                If you provide any false or inaccurate information, we have the right to suspend or terminate your
                account and refuse any current or future use of the Services.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">5.</span> User Registration
              </h2>
              <p>
                To use certain aspects of the Services, you may be required to register. You agree to keep your password
                confidential and will be responsible for all use of your account and password. We reserve the right to
                remove, reclaim, or change a username you select if we determine it is inappropriate or objectionable.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">6.</span> Prohibited Activities
              </h2>
              <p>
                You may not access or use the Services for any purpose other than that for which we make the Services
                available. The Services may not be used in connection with any commercial endeavors except those
                specifically endorsed or approved by us.<br/><br/>
                As a user of the Services, you agree not to:
              </p>
              <ul className="list-disc pl-5">
                <li>Systematically retrieve data or other content from the Services to create a collection, database, or
                  directory without written permission.
                </li>
                <li>Trick, defraud, or mislead us or other users to obtain sensitive account information.</li>
                <li>Circumvent or interfere with security-related features of the Services.</li>
                <li>Use the Services for harassment, abuse, or harm.</li>
                <li>Upload or transmit harmful material such as viruses or spam.</li>
                <li>Engage in automated data gathering or extraction without authorization.</li>
                <li>Impersonate another user or attempt to access their account.</li>
                <li>Use the Services in a manner inconsistent with any laws or regulations.</li>
              </ul>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">7.</span> Distribution License
              </h2>
              <p>
                By submitting feedback or suggestions about the Services, you grant us permission to use and share such
                feedback for any purpose without compensation.<br/><br/>
                You retain full ownership of your Contributions, but you grant us the right to use, store, and process
                them as per our Privacy Policy.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">8.</span> Third-Party Websites and Content
              </h2>
              <p>
                The Services may contain links to third-party websites or content. We do not monitor or endorse these
                third-party sites or content and are not responsible for any harm or loss caused by them.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">8.</span> Services Management
              </h2>
              <p>
                We reserve the right to:
              </p>
              <ul className="list-disc pl-5">
                <li>Monitor the Services for violations of these Terms.</li>
                <li>Take legal action against violators.</li>
                <li>Remove or disable access to any content or files that may harm our systems.</li>
                <li>Modify, suspend, or discontinue the Services as needed.</li>
              </ul>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">9.</span> Term and Termination
              </h2>
              <p>
                These Terms remain in effect while you use the Services. We reserve the right to suspend or terminate your account for violations of these Terms. If your account is terminated, you are prohibited from creating a new account under any false pretenses.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">10.</span> Modifications and Interuptions
              </h2>
              <p>
                We may modify, suspend, or discontinue the Services at any time without notice. We are not liable for any loss or inconvenience caused by such interruptions.
              </p>
              <h2 className="text-xl font-semibold">
                <span className="text-primary">11.</span> User Data
              </h2>
              <p>
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
              </p>
              <p className="text-sm text-gray-500">
                If you have any questions about these terms, please contact us <Link href="/contact"
                                                                                     className="underline hover:text-primary">Here</Link>.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}