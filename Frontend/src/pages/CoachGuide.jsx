
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "../assets/images/216890416.png"; // only needed if using `style={{}}` approach

export const CoachGuide = () => {
  const steps = [
    {
      title: "Complete Your Profile",
      description: "After logging in",
      description1: "Go to the Dashboard > Profile section.",
      description2: "Fill in all your personal and professional details.",
      description3: "Save your profile to keep it updated.",
      description4: "",
    },
    {
      title: "Add Bank Account Details",
      description: "Navigate to Dashboard > Account Details ",
      description1: "Enter your bank account information so you can receive weekly payments.",
      description2: "Save the details.",
    },
    {
      title: "Create Your Services",
      description: "Go to Dashboard > My Services.",
      description1: "Click on Create Service.",
      description2: "Enter: Service Name",
      description3: "Price (set your own) Service Description",
      description4: "Click Create.✅ Your service will be saved and instantly displayed on your public Coach Profile.",
    },
    {
      title: "Get Booked & Notifications",
      description: "When a user books a session and completes payment:",
      description1: "You will receive an email notification saying the session is booked.",
    },
    {
      title: "Manage Your Sessions",
      description: "Go to Dashboard > My Sessions ",
      description1: "Here, you can: View all your upcoming and today's booked sessions.",
      description2: "Track how many sessions are booked.",
    },
    {
      title: "Host a Video Call",
      description: "Click Start Video Call.",
      description1: "A video room link is generated — copy it.",
      description2: "On the session card, click Paste Link.",
      description3: "A form will open: Paste the video call link. Optionally add a short description. Click Send.",
      description4: "📩 The video call link is automatically emailed to the user",
    },

    {
      title: "After completing the video call",
      description: "Click on the complete button.",
      description1: "after that you can see your earning in the dashboard",
    },
    
    {
      title: "Get Paid Weekly",
      description: "Payments for completed sessions are processed weekly by the HalfCoach team and sent to your bank account.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/80 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center text-yellow-500"
          >
            🚀 Coach Guide: How to Use the Platform
          </motion.h1>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/90 rounded-2xl p-5 flex items-start gap-4 shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <CheckCircle className="text-green-400 mt-1 shrink-0" size={24} />
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Step {index + 1}: {step.title}
                  </h2>
                  {step.description && <p className="text-gray-300 mb-1">{step.description}</p>}
                  {step.description1 && <p className="text-gray-300 mb-1">{step.description1}</p>}
                  {step.description2 && <p className="text-gray-300 mb-1">{step.description2}</p>}
                  {step.description3 && <p className="text-gray-300 mb-1">{step.description3}</p>}
                  {step.description4 && <p className="text-gray-300 mb-1">{step.description4}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
