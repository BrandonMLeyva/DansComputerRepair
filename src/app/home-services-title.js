'use client';
import React from "react";
import { HardDrive, Cpu, Network, Smartphone, Printer, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Recover lost data from failed hard drives, SSDs, and other storage devices",
    color: "from-purple-600 to-purple-700"
  },
  {
    icon: Cpu,
    title: "Custom Builds",
    description: "Custom PC builds for gaming, work, or creative professionals",
    color: "from-indigo-600 to-indigo-700"
  },
  {
    icon: Network,
    title: "Telecom & Network Services",
    description: "Complete telecom solutions, VoIP setup, and enterprise network infrastructure",
    color: "from-cyan-600 to-cyan-700"
  },
  {
    icon: Smartphone,
    title: "Mobile Phone Repair",
    description: "Screen replacement, battery service, charging port repair, and physical damage",
    color: "from-pink-600 to-pink-700"
  },
  {
    icon: Printer,
    title: "Printer Support",
    description: "Printer setup, maintenance, troubleshooting, and cartridge replacement",
    color: "from-amber-600 to-amber-700"
  },
  {
    icon: Phone,
    title: "VoIP Services",
    description: "Business phone systems, VoIP installation, and unified communications",
    color: "from-violet-600 to-violet-700"
  },
  {
    icon: MessageCircle,
    title: "Mobile Phone Support",
    description: "Software updates, app troubleshooting, data transfer, and device optimization",
    color: "from-rose-600 to-rose-700"
  }
];

export default function Services() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/products');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>

        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={handleCardClick}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}