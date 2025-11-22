
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Zap, Handshake, CheckCircle, Star, Users, Briefcase } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen w-full text-foreground bg-background">
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-background via-transparent to-background" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 px-6 md:px-12 bg-transparent">
        <Link href="/" className="text-2xl font-bold text-primary">
          Locals
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button variant="ghost" className="font-semibold hover:text-primary">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="font-semibold hover:text-primary">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 text-center px-4">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.h1 variants={fadeIn} className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Your Community's Trusted <span className="text-primary">Service Hub</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
            Connect with skilled local professionals for any service you need. It's fast, simple, and reliable.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
            <Link href="/discover">
              <Button size="lg" className="w-full font-bold text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto shadow-lg transition-all duration-300 transform hover:scale-105">
                Find a Pro Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Getting started is as easy as 1, 2, 3.</p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="grid grid-cols-1 gap-12 mt-16 md:grid-cols-3">
            <motion.div variants={fadeIn} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/10 text-primary">
                <Search className="w-10 h-10"/>
              </div>
              <h3 className="text-2xl font-bold">1. Search</h3>
              <p className="mt-3 text-muted-foreground">Browse services and find the perfect professional for your needs.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/10 text-primary">
                <Handshake className="w-10 h-10"/>
              </div>
              <h3 className="text-2xl font-bold">2. Connect</h3>
              <p className="mt-3 text-muted-foreground">Chat directly, get quotes, and schedule with ease.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/10 text-primary">
                <CheckCircle className="w-10 h-10"/>
              </div>
              <h3 className="text-2xl font-bold">3. Hire</h3>
              <p className="mt-3 text-muted-foreground">Confirm your booking and get the job done right.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Services Section */}
      <section className="py-24 bg-background/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explore our most popular categories.</p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="grid grid-cols-2 gap-8 mt-12 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                 <motion.div variants={fadeIn} key={i} className="p-6 text-center bg-card rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 text-secondary">
                         <Briefcase className="w-8 h-8"/>
                    </div>
                    <h3 className="text-xl font-bold">Plumbing</h3>
                    <p className="mt-2 text-muted-foreground">Leaky faucets, clogged drains, and more.</p>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Real stories from satisfied customers.</p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
             {[...Array(3)].map((_, i) => (
                <motion.div variants={fadeIn} key={i} className="p-8 text-left bg-card rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-muted rounded-full mr-4"></div>
                        <div>
                            <h4 className="font-bold">Sarah K.</h4>
                            <p className="text-sm text-muted-foreground">Delhi</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-primary" fill="currentColor" />)}
                    </div>
                    <p className="text-muted-foreground">"Found a great electrician in minutes! The process was so smooth and easy. Highly recommend Locals!"</p>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-16 bg-background/80">
            <div className="container grid grid-cols-2 gap-8 mx-auto md:grid-cols-4">
                <div className="col-span-2 pr-8 md:col-span-1">
                    <h3 className="text-2xl font-bold text-primary">Locals</h3>
                    <p className="mt-4 text-muted-foreground">Your community's service hub.</p>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">Company</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                        <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">For Providers</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/pro/register" className="hover:text-primary transition-colors">Join as a Pro</Link></li>
                        <li><Link href="/pro/guidelines" className="hover:text-primary transition-colors">Guidelines</Link></li>
                        <li><Link href="/pro/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">Support</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-12 text-center border-t pt-8 text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Locals India. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}
