"use client";

import { motion } from "framer-motion";
import { Smartphone, MapPin, Heart, Tag, Bell } from "lucide-react";

const features = [
  { icon: MapPin, label: "Order Tracking", desc: "Real-time delivery updates" },
  { icon: Heart, label: "Wishlist Sync", desc: "Save across all devices" },
  { icon: Tag, label: "Exclusive Discounts", desc: "App-only deals" },
  { icon: Bell, label: "Instant Notifications", desc: "Never miss a sale" },
];

export function MobileAppPromo() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-midnight to-electric/80 p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Download the EmptyChart App
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Get the best shopping experience on your phone with exclusive app-only features.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{f.label}</p>
                      <p className="text-white/50 text-xs">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-midnight rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                  App Store
                </button>
                <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors">
                  Google Play
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-[500px] bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 p-3">
                  <div className="w-full h-full bg-midnight/50 rounded-[2.5rem] flex items-center justify-center">
                    <div className="text-center text-white">
                      <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm opacity-50">EmptyChart App</p>
                    </div>
                  </div>
                </div>
                {/* Floating notification */}
                <div className="absolute -top-4 -right-8 bg-white rounded-2xl p-3 shadow-2xl animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-midnight">Flash Sale!</p>
                      <p className="text-[10px] text-gray-500">30% off TVs</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
