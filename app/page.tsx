
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Zap, Handshake, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full text-foreground">
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 px-6 md:px-12 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="text-2xl font-bold animate-text-gradient">
          Locals
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="font-semibold hover:text-primary">
              Log In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="font-bold rounded-full btn-glow bg-primary text-primary-foreground hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center h-screen pt-16 text-center">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl animate-slide-up stagger-1">
            Find Local Talent. Instantly.
            <span className="block animate-text-gradient">India's Service Marketplace.</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl animate-slide-up stagger-2">
            From quick repairs to professional skills, connect with trusted service providers in your community. Fast, reliable, and right next door.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row animate-slide-up stagger-3">
             <div className="relative w-full max-w-md">
              <Search className="absolute w-5 h-5 left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g., 'Electrician in Delhi'"
                className="w-full py-3 pl-12 pr-4 text-lg rounded-full border-2 border-border focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50"
              />
            </div>
            <Link href="/discover">
              <Button size="lg" className="w-full font-bold text-lg rounded-full btn-glow bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
                Discover Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-24 bg-background/70 backdrop-blur-md">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-accent">How It Works</h2>
          <p className="text-4xl font-bold tracking-tight md:text-5xl">Three Simple Steps</p>
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            <div className="flex flex-col items-center p-8 text-center bg-card rounded-2xl border card-hover-effect">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-secondary/20">
                    <Zap className="w-8 h-8 text-secondary"/>
                </div>
              <h3 className="text-2xl font-bold">1. Find Your Pro</h3>
              <p className="mt-3 text-muted-foreground">Search for any service and instantly see a list of qualified professionals near you.</p>
            </div>
            <div className="flex flex-col items-center p-8 text-center bg-card rounded-2xl border card-hover-effect">
                 <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/20">
                    <Handshake className="w-8 h-8 text-primary"/>
                </div>
              <h3 className="text-2xl font-bold">2. Connect & Hire</h3>
              <p className="mt-3 text-muted-foreground">Review profiles, chat directly, and hire with confidence. No middleman fees.</p>
            </div>
            <div className="flex flex-col items-center p-8 text-center bg-card rounded-2xl border card-hover-effect">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
                    <CheckCircle className="w-8 h-8 text-accent"/>
                </div>
              <h3 className="text-2xl font-bold">3. Job Done</h3>
              <p className="mt-3 text-muted-foreground">Your chosen provider completes the task. Pay securely online and leave a review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-16 bg-background/90 backdrop-blur-sm">
            <div className="container grid grid-cols-2 gap-8 mx-auto md:grid-cols-4">
                <div className="col-span-2 pr-8 md:col-span-1">
                    <h3 className="text-2xl font-bold animate-text-gradient">Locals</h3>
                    <p className="mt-4 text-muted-foreground">Connecting communities, one service at a time. India's trusted local marketplace.</p>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">Company</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="/press" className="hover:text-primary">Press</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">For Providers</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/pro/register" className="hover:text-primary">Join as a Pro</Link></li>
                        <li><Link href="/pro/guidelines" className="hover:text-primary">Guidelines</Link></li>
                        <li><Link href="/pro/dashboard" className="hover:text-primary">Dashboard</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase text-muted-foreground">Support</h4>
                    <ul className="mt-4 space-y-2">
                        <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                        <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                        <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
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
