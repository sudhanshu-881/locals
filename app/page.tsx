
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground animate-slide-up">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 px-6 md:px-12 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="text-2xl font-bold animate-text-gradient">
          Locals
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="font-semibold smooth-transition hover:text-primary">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="font-bold rounded-full btn-glow bg-primary text-primary-foreground hover:bg-primary/90 smooth-transition">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center h-screen pt-16 text-center">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl animate-slide-up stagger-1">
            Find Help. Offer Skills. 
            <span className="block animate-text-gradient">Right Here, Right Now.</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl animate-slide-up stagger-2">
            Your neighborhood marketplace for local services. From plumbers to photographers, get instant help from trusted people in your community.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row animate-slide-up stagger-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute w-5 h-5 left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="What service do you need? e.g., 'plumber in Bandra'"
                className="w-full py-3 pl-12 pr-4 text-lg rounded-full border-2 border-border focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 smooth-transition"
              />
            </div>
            <Link href="/discover">
              <Button size="lg" className="w-full font-bold text-lg rounded-full btn-glow bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto smooth-transition">
                Find Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm text-muted-foreground animate-slide-up stagger-4">
            Popular: <span className="font-semibold text-foreground">Tutor</span>, <span className="font-semibold text-foreground">AC Repair</span>, <span className="font-semibold text-foreground">Cleaning</span>, <span className="font-semibold text-foreground">Fitness</span>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-accent">How It Works</h2>
          <p className="text-4xl font-bold tracking-tight md:text-5xl">Get Started in Seconds</p>
          <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center p-8 text-center transition-transform duration-300 transform bg-white rounded-2xl shadow-lg card-hover-lift dark:bg-card">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-secondary/20">
                <p className="text-3xl font-bold text-secondary">1</p>
              </div>
              <h3 className="text-2xl font-bold">Search for a Service</h3>
              <p className="mt-3 text-muted-foreground">Use our simple search to find exactly what you need, right in your neighborhood.</p>
            </div>
            <div className="flex flex-col items-center p-8 text-center transition-transform duration-300 transform bg-white rounded-2xl shadow-lg card-hover-lift dark:bg-card">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/20">
                <p className="text-3xl font-bold text-primary">2</p>
              </div>
              <h3 className="text-2xl font-bold">Connect & Book</h3>
              <p className="mt-3 text-muted-foreground">Chat directly with providers, check reviews, and book the one that's right for you.</p>
            </div>
            <div className="flex flex-col items-center p-8 text-center transition-transform duration-300 transform bg-white rounded-2xl shadow-lg card-hover-lift dark:bg-card">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
                <p className="text-3xl font-bold text-accent">3</p>
              </div>
              <h3 className="text-2xl font-bold">Get It Done</h3>
              <p className="mt-3 text-muted-foreground">Your chosen provider comes to you and gets the job done. Simple and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background">
        <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Locals. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">Terms</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">Privacy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
