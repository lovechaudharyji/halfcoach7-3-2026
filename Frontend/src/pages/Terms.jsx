import { motion } from "framer-motion";
import Services from "../assets/images/services.avif";
import Office2 from "../assets/images/office2.jpg";

export const Terms = () => {
  const terms = [
    {
      title: "Responsibilities",
      description:
        "● Maintain professionalism and accuracy in services ",
        description1:"● Keep availability and pricing updated",
        description2:"● Sell only original content (no plagiarized or third-party resources)",
        description3:"● Abide by ethical and professional standards",
    },
    {
      title: "User Responsibilities",
      description:"● Provide accurate booking and account information",
      description1:"● Use respectful, constructive communication",
      description2:"● Refrain from hate speech, offensive language, or abuse",
    },
    {
      title: "Misconduct & Subscription Termination",
      description:"HalfCoach may cancel a Coach's subscription or remove accounts if",
      description1:"● Multiple misconduct reports are received",
        description2:"● More than 5 session cancellations occur post-confirmation",
        description3:"● Fraudulent or deceptive behavior is identified, All investigations will be conducted fairly before action is taken.",
    },
    {
      title: " Intellectual Property",
      description:"● All platform content, branding, and design belong to HalfCoach, unless otherwisestated.",
      description1:"● Coaches retain rights to their original resources but grant HalfCoach a non-exclusive license to host, promote, and sell them through the platform.",
    },
    {
      title: "Data & Privacy",
      description:
        "HalfCoach collects and processes data in accordance with our Privacy Policy. We do not sell your data or share it with third parties without explicit consent.",
    },
    {
      title: "Payment Processing",
      description:
        "All transactions are processed through secure third-party gateways. Credit card or bank details are not stored on our servers. Coaches receive payouts post-service delivery and post-sale of digital resources, minus applicable commission",
    },
    {
      title: "Messaging and Communication",
      description:
        "● HalfCoach may review communications to ensure safety and compliance but does not monitor every message.",
        description1:"● Harassment or inappropriate behavior may lead to account suspension.",

    },
    {
      title: "Dispute Resolution",
      description:
        "HalfCoach acts as a neutral mediator in disputes between Users and Coaches",
        description1:"● If a resolution cannot be reached, HalfCoach reserves the right to suspend or terminate either party’s account.",

    },

    {
      title: "Account Termination",
      description:
        "● You may delete your account at any time.",
        description1:"I● HalfCoach may suspend or terminate accounts found in violation of these Terms, with or without prior notice",

    },

    {
      title: "Modifications to the Terms",
      description:
        "We reserve the right to update or modify these Terms at any time. Changes will be communicated via email or in-platform notifications. Continued use of the platform indicates your acceptance of the revised terms.",
    },

    {
      title: "Contact Us",
      description:
        "For questions about these Terms or your account, reach out to: 📧 contact@halfcoach.com",
    },
  ];

  return (
    <>
      <div
        className="h-150 bg-cover bg-center flex items-center justify-center px-5 rounded-b-4xl"
        style={{ backgroundImage: `url(${Services})` }}
      >
        <motion.div
          className="max-w-3xl bg-white shadow-2xl rounded-3xl p-10 transition-all"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Terms and <span className="text-indigo-600">Services</span>
          </h1>
          <p className="pb-3">Welcome to HalfCoach! These Terms and Conditions Terms govern your use of the
HalfCoach platform and services. By accessing or using HalfCoach, you agree to be bound by
these Terms. If you do not accept these Terms, please refrain from using the platform.
</p>

          <motion.h2
            className="text-2xl font-bold text-gray-700 mb-4"
            whileHover={{ scale: 1.1, color: "#4f46e5" }}
            transition={{ duration: 0.3 }}
          >
            Introduction
          </motion.h2>

          <motion.p
            className="text-gray-600 leading-relaxed"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            Welcome to{" "}
            <span className="font-bold text-gray-900">HalfCoach</span>HalfCoach provides an online platform that connects individuals Users with professional
coaches Coaches for one-on-one consultations, coaching services, and the sale of digital
resources. These Terms apply to all Users and Coaches.
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-900 rounded-b-4xl">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white hover:text-yellow-400">
           Services Offered
          </h2>
          <p className="mb-2 text-white">
            <span className="font-bold text-white">HalfCoach</span> enables:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-white hover:text-yellow-400 transition-colors">
              <span className="font-bold text-white">Coaches</span>to list services (e.g., video consultations, chat sessions) and sell original digital
              resources (eBooks, PPTs, etc.)
            </li>
            <li className="text-white hover:text-yellow-400 transition-colors">
              <span className="font-bold text-white">Users</span> can book and purchase services directly through the platform.
           
            </li>
          </ul>
          <p className="mt-4 text-white hover:text-yellow-400">
            Both <span className="font-bold text-white">Account registration Users</span> for both Coaches and
            <span className="font-bold text-white">Users</span> to access platform features
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white hover:text-yellow-400">
          Coach Subscription Plan
          </h2>
          <p className="mb-2 text-white hover:text-yellow-400">
          Subscription Fee: £49.99/month (single-tier plan)
          Includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-white hover:text-yellow-400 transition-colors">
            ✅ Full platform access
            </li>
            <li className=" text-white hover:text-yellow-400 transition-colors">
            ✅ Ability to add/manage services and resources
            </li>
            <li className=" text-white hover:text-yellow-400 transition-colors">
            ✅ Enhanced visibility to potential clients
            </li>
            <li className="text-white hover:text-yellow-400 transition-colors">
            ✅ No hidden fees
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white hover:text-yellow-400">
          Pricing and Commission Structure
          </h2>
          <p className="mb-2 text-white hover:text-yellow-400">
          Coaches independently set their service and product prices. HalfCoach applies the following
commission fees:

          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-white hover:text-yellow-400 transition-colors">
              <span className="font-bold text-white">
              video or chat sessions
              </span>
            </li>
          </ul>
          <p className="mt-4 text-white hover:text-yellow-400">
            <span className="font-bold text-white">HalfCoach</span> will deduct
            a <span className="font-bold text-red-500">20% commission</span>{" "}
            from every completed video or chat session.
          </p>
          <p className="mt-4 text-white hover:text-yellow-400">
            <span className="font-bold text-red-500">10% commission</span> on sales of digital resources
          </p>
        </section>
      </div>

      <div className="p-5"></div>

      <div
        className="h-auto bg-cover bg-center flex items-center justify-center px-5 py-10 rounded-4xl"
        style={{ backgroundImage: `url(${Office2})` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {/* Refund Policy */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 hover:text-blue-500 transition duration-300">
            Coach Registration & Verification
            </h1>
            <p className="mb-4 text-gray-600 hover:text-gray-900 transition duration-300">
            To become a Coach, you must:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li className="hover:text-red-500 transition duration-300">
              Submit a valid LinkedIn profile for verification
              </li>
              <li className="hover:text-red-500 transition duration-300">
               Be the original author of any content listed for sale

              </li>
              <li className="hover:text-red-500 transition duration-300">
              Undergo periodic verification checks to maintain platform credibility

              </li>
              <li className="hover:text-red-500 transition duration-300">
              Failure to meet verification standards may result in denial or suspension of your Coach profile.


              </li>
            </ul>
          </div>

          {/* Coach Responsibilities */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 hover:text-blue-500 transition duration-300 text-center">
            Payments and Payouts
            </h2>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li className="hover:text-green-500 transition duration-300">
              Payments are processed securely via third-party providers
              </li>
              <li className="hover:text-green-500 transition duration-300">
              Coaches receive weekly payouts (delayed payouts are processed no later than the 19th
of the following month).

              </li>
              <li className="hover:text-green-500 transition duration-300">
              Coaches are responsible for maintaining accurate payment information.
              </li>
            </ul>
          
          </div>

          {/* User Responsibilities */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 hover:text-blue-500 transition duration-300">
            Refund Policy
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li className="hover:text-purple-500 transition duration-300">
              Refunds are issued under these circumstances
              </li>
              <li className="hover:text-purple-500 transition duration-300">
              The Coach fails to deliver the booked session
              </li>
              <li className="hover:text-purple-500 transition duration-300">
              Mutual agreement to reschedule (no refund in this case)
              </li>
              <li className="hover:text-purple-500 transition duration-300">
              Disputes are reviewed and mediated by HalfCoach; refunds will be issued only if the
              Coach is found at fault
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
         Some more Terms and Conditions
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {terms.map((term, index) => (
            <div
              key={index}
              className="p-4 bg-gray-900 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg rounded-2xl"
            >
              <h2 className="text-3xl font-semibold mb-2 text-white p-3 hover:text-yellow-400">
                {term.title}
              </h2>
              <p className="text-white hover:text-yellow-400">
                {term.description}
              </p>
              <p className="text-white hover:text-yellow-400">
                {term.description1}
              </p>
              <p className="text-white hover:text-yellow-400">
                {term.description2}
              </p>
              <p className="text-white hover:text-yellow-400">
                {term.description3}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
