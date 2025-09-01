'use client'

import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Shield } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">MyStartup</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
          <a href="#about" className="text-gray-600 hover:text-indigo-600">About</a>
          <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
        </nav>
        <Button className="bg-indigo-600 text-white rounded-xl px-4 py-2">Get Started</Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 flex-grow">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Empower Your Ideas with <span className="text-indigo-600">AI</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Build, grow, and scale faster with our cutting-edge platform designed for
            creators, teams, and innovators.
          </p>
          <div className="mt-6 flex space-x-4">
            <Button className="bg-indigo-600 text-white flex items-center px-6 py-3 rounded-xl">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="px-6 py-3 rounded-xl">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-0"
        >
          <img
            src="https://illustrations.popsy.co/gray/idea.svg"
            alt="Hero Illustration"
            className="w-96 drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 md:px-16 py-20 bg-indigo-50">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h3>
        <div className="grid gap-8 md:grid-cols-3">
          {[ 
            { icon: <Zap className="w-8 h-8 text-indigo-600" />, title: "Fast & Powerful", desc: "Lightning speed performance with optimized workflows." },
            { icon: <Users className="w-8 h-8 text-indigo-600" />, title: "Collaboration", desc: "Work seamlessly with your team in real time." },
            { icon: <Shield className="w-8 h-8 text-indigo-600" />, title: "Secure", desc: "Enterprise-grade security to protect your data." },
          ].map((f, i) => (
            <Card key={i} className="rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
                <p className="text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-white text-center border-t">
        <p className="text-gray-600">© {new Date().getFullYear()} MyStartup. All rights reserved.</p>
      </footer>
    </div>
  );
}
