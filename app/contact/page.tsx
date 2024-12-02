import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 bg-gray-800 bg-opacity-90 p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-300">
              Feel free to reach out to us via any of the methods below. We’ll get back to you as
              soon as possible!
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-gray-400" />
                <span className="text-gray-300">support@artifacts.akrylic.org</span>
              </div>
            </div>
          </div>


          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <Button type="submit" variant="secondary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
