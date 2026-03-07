import lock from "../assets/images/privacy.webp";
import lock2 from "../assets/images/lock.jpg";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Who We Are",
    content: "● Our website address is: https://halfcoach.com.",
    content1: "● HalfCoach is a platform that connects individuals seeking personal, professional, and wellness coaching with verified coaches across various domains. Coaches may also sell original digital content such as books and presentations.",
    


  },
  {
    title: "2.  Information We Collect",
    content:
      "a) Personal Information",
      content1: "● Name, email address, and contact details when you create an account or contact support",
      content2: "● Profile information for coaches (e.g., bio, specialization, certifications)",
      content3: "● Purchase history and transaction details (for users and coaches)",
  },

  {
    title: "3. Media",
    content:
      "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
  },

  {
    title: "b) Content You Provide",
    content:
      "● Comments, reviews, or messages you leave on the platform",
      content1: "● Uploaded images, media, and documents",
      content2: "● Listings of books, courses, or other materials submitted by coaches",
  },

  {
    title: "c) Technical & Usage Information",
    content:
      "● IP address, browser type, device information",
      content1: "● Usage logs, cookies, and analytics data for performance and user behavior tracking",

  },

  {
    title: "d) Embedded Content",
    content:
      "● Our platform may include embedded content (videos, articles, etc.) from third-party sites,which may collect user data as per their own privacy policies.",
  },
  {
    title: "3. How We Use Your Data",
    content:
    "We use your information to:",
    content1: "● Facilitate coach-client connections and manage listings ● Enable communication, messaging, and bookings between users",
    content2: "● Allow coaches to sell original content (e.g., books, presentations) ● Improve site functionality, security, and user experience",
    content3: "● Detect and prevent fraud or abuse ● Provide customer support",
   
  },

  {
    title: "4. Legal Basis for Data Processing (GDPR Compliance)",
    content:
    "If you are in the EU/EEA, we process your data under lawful bases such as:",
    content1: "● Performance of a contract",
    content2: "● Your consent",
    content3: "● Compliance with legal obligations ● Legitimate interests",
   
  },

  {
    title: "5. Sharing Your Data",
    content:
    "We do not sell your personal data. We may share limited data with:",
    content1: "● Payment processors (e.g., Stripe, PayPal)",
    content2: "● Hosting and analytics providers (e.g., Google Analytics)",
    content3: "● Spam detection and moderation tools ● Legal authorities when required",
   
  },

  {
    title: "6. Data Retention",
    content:
    "● Comments and interactions are stored indefinitely unless deleted by you.",
    content1: "● Account data is retained until you delete your account or request removal.",
    content3: "● Transaction records are stored per financial and legal requirements.",
   
  },

  {
    title: "7. Your Rights",
    content:
    "You have the right to: ● Access and download your personal data",
    content1: "● Correct or update inaccurate information",
    content2: "● Request deletion of your data (subject to legal limitations)",
    content3: "● Withdraw consent at any time , To exercise these rights, contact us at: contact@halfcoach.com",
   
  },

  {
    title: "8. Security Measures",
    content:
    "We use encryption, firewalls, access controls, and secure servers to protect your data. However,no system is completely secure, and you use the platform at your own risk.",
   
  },

  {
    title: "9. Children's Privacy",
    content:
    "Our platform is not intended for children under the age of 13. We do not knowingly collect personal data from minors.",
   
  },
  {
    title: "10. Changes to This Policy",
    content:
    "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
   
  },

  {
    title: "11. Contact Us",
    content:
    "For questions or concerns, please email: 📧 contact@halfcoach.com",
   
  },
];

export const Privacy = () => {
  return (
    <>
      <motion.div
        className="h-150 bg-cover bg-center flex items-center justify-center px-5 rounded-b-4xl"
        style={{ backgroundImage: `url(${lock2})` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl text-gray-800"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={lock}
            alt="Privacy Policy"
            className="w-full h-60 object-cover rounded-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.h1
            className="text-3xl font-bold mb-4 text-gray-900 hover:text-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-semibold">HalfCoach</span>, we value your privacy and are committed to protecting your personal data.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
          This Privacy Policy outlines how we collect, use, store, and disclose your information when you use
our website and services.

          </p>

        </motion.div>
      </motion.div>

      <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-6 bg-gray-900 shadow-lg rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:rotate-1 hover:-translate-y-2"
            >
              <h2 className="text-2xl font-semibold mb-2 text-white hover:text-yellow-400">
                {section.title}
              </h2>
              <p className="text-white hover:text-yellow-400">
                {section.content}
              </p>
              <p className="text-white hover:text-yellow-400">
                {section.content1}
              </p>
                <p className="text-white hover:text-yellow-400">
                {section.content2}
              </p>
                <p className="text-white hover:text-yellow-400">
                {section.content3}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
