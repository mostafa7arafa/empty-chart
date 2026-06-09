"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-midnight via-midnight to-electric/20 text-white">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm"
            >
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Trusted by 100,000+ Egyptian Homes
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Technology That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400">
                Completes
              </span>{" "}
              Your Home
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Shop premium appliances, electronics, and smart home essentials with fast delivery and trusted warranties across Egypt.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-electric hover:bg-electric-light text-white rounded-2xl font-semibold transition-all hover:shadow-lg hover:shadow-electric/30 hover:-translate-y-0.5"
              >
                Shop Products
              </Link>
              <Link
                href="#categories"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold transition-all hover:-translate-y-0.5"
              >
                Explore Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { value: "50K+", label: "Products" },
                { value: "100K+", label: "Happy Customers" },
                { value: "27", label: "Governorates" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating products */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              {/* Central product */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 flex items-center justify-center animate-float p-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">📺</div>
                  <p className="text-sm font-medium">Smart TVs</p>
                </div>
              </div>
              {/* Orbiting items */}
              <div className="absolute top-8 left-12 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float-slow">
                <div className="text-center">
                  <div className="text-3xl mb-1">❄️</div>
                  <p className="text-[10px]">AC</p>
                </div>
              </div>
              <div className="absolute top-12 right-8 w-36 h-36 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-center">
                  <div className="text-3xl mb-1">🧊</div>
                  <p className="text-[10px]">Refrigerators</p>
                </div>
              </div>
              <div className="absolute bottom-16 left-8 w-28 h-28 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-center">
                  <div className="text-3xl mb-1">🫧</div>
                  <p className="text-[10px]">Washers</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-16 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float-slow" style={{ animationDelay: "0.5s" }}>
                <div className="text-center">
                  <div className="text-3xl mb-1">🍳</div>
                  <p className="text-[10px]">Kitchen</p>
                </div>
              </div>
              <div className="absolute top-1/2 right-0 w-24 h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center animate-float" style={{ animationDelay: "3s" }}>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏠</div>
                  <p className="text-[10px]">Smart</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
