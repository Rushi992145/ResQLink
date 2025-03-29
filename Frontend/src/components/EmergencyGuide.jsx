import React from "react";
import { motion } from "framer-motion";
import { Play, AlertTriangle, PlusCircle, Shield, Phone } from "lucide-react";

const EmergencyGuide = () => {
  const guides = [
    {
      id: 1,
      title: "Basic First Aid",
      description:
        "Learn essential first aid techniques that can save lives in emergency situations.",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
      icon: PlusCircle,
      tips: [
        "Check for danger before approaching",
        "Check for response",
        "Open airway",
        "Check breathing",
        "Start chest compressions if needed",
      ],
    },
    {
      id: 2,
      title: "Emergency Preparedness",
      description:
        "How to prepare yourself and your family for various emergency situations.",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
      icon: Shield,
      tips: [
        "Create an emergency kit",
        "Develop a family communication plan",
        "Know evacuation routes",
        "Keep important documents ready",
        "Learn emergency numbers",
      ],
    },
    {
      id: 3,
      title: "Emergency Response",
      description:
        "What to do in different emergency scenarios and how to stay safe.",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
      icon: AlertTriangle,
      tips: [
        "Stay calm and assess the situation",
        "Call emergency services",
        "Follow safety protocols",
        "Help others if safe to do so",
        "Document the situation",
      ],
    },
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", icon: Phone },
    { name: "Fire Department", number: "911", icon: AlertTriangle },
    { name: "Police Department", number: "911", icon: Shield },
    { name: "Ambulance Service", number: "911", icon: PlusCircle },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-2 px-6 bg-green-100 rounded-full text-green-800 font-medium mb-4"
          >
            Emergency Preparedness Guide
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-green-800 mb-6"
          >
            Be Prepared for Emergencies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Learn essential skills and knowledge to handle emergency situations
            effectively. Your preparedness can make a difference in critical
            moments.
          </motion.p>
        </div>

        {/* Video Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-48"
                  src={guide.videoUrl}
                  title={guide.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <guide.icon className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="space-y-2">
                  {guide.tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Important Emergency Contacts
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {emergencyContacts.map((contact) => (
              <motion.div
                key={contact.name}
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 rounded-xl p-6 text-center"
              >
                <contact.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  {contact.name}
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {contact.number}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-green-100"
          >
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Before an Emergency
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Create an emergency kit with essential supplies</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Develop and practice an evacuation plan</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Keep important documents in a waterproof container</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Learn basic first aid and CPR</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-green-100"
          >
            <h3 className="text-xl font-bold text-green-800 mb-4">
              During an Emergency
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Stay calm and assess the situation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Call emergency services immediately</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Follow instructions from emergency personnel</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Help others if it's safe to do so</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyGuide;
