import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Star,
  Zap,
  Shield,
  MessageSquare,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/40 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent animate-float">
            Locals
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="smooth-transition hover:bg-primary/5 hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="btn-glow bg-primary shadow-lg hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="animate-slide-up space-y-6">
            <div className="badge-premium inline-block">
              <Zap className="h-4 w-4" />
              <span>Hyper-Local Services Made Simple</span>
            </div>
            <h1 className="text-balance text-6xl font-bold leading-tight md:text-7xl">
              Find Local Services,{" "}
              <span className="animate-glow-pulse bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-xl leading-relaxed text-muted-foreground">
              Connect with skilled professionals in your neighborhood. Whether
              you need help or want to offer your services, Locals makes it
              simple, secure, and seamless.
            </p>
          </div>

          <div className="flex animate-bounce-in flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="btn-glow gap-2 bg-primary px-8 py-6 text-lg shadow-xl hover:bg-primary/90"
              >
                Start Exploring <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                size="lg"
                variant="outline"
                className="smooth-transition border-border/50 bg-card/50 px-8 py-6 text-lg backdrop-blur-sm hover:bg-primary/10"
              >
                Browse Services
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid gap-6 pt-8 md:grid-cols-3">
            <div className="card-hover-lift card-premium stagger-item group space-y-4 p-8">
              <div className="flex justify-center">
                <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <MapPin className="h-8 w-8 animate-float text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">Hyper-Local Discovery</h3>
              <p className="leading-relaxed text-muted-foreground">
                Find services right in your neighborhood with precise
                location-based matching
              </p>
            </div>

            <div className="card-hover-lift card-premium stagger-item group space-y-4 p-8">
              <div className="flex justify-center">
                <div className="rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                  <Star
                    className="h-8 w-8 animate-float text-accent"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold">Trusted Reviews</h3>
              <p className="leading-relaxed text-muted-foreground">
                See authentic ratings and reviews from real users in your
                community
              </p>
            </div>

            <div className="card-hover-lift card-premium stagger-item group space-y-4 p-8">
              <div className="flex justify-center">
                <div className="rounded-xl bg-secondary/10 p-3 transition-colors group-hover:bg-secondary/20">
                  <MessageSquare
                    className="h-8 w-8 animate-float text-secondary"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold">Direct Connection</h3>
              <p className="leading-relaxed text-muted-foreground">
                Message professionals directly and build lasting relationships
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 pt-8 md:grid-cols-2">
            <div className="card-hover-lift card-premium space-y-4 p-8 text-left">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Secure & Verified</h3>
              </div>
              <p className="text-muted-foreground">
                All professionals are verified for your peace of mind
              </p>
            </div>

            <div className="card-hover-lift card-premium space-y-4 p-8 text-left">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-semibold">Instant Booking</h3>
              </div>
              <p className="text-muted-foreground">
                Quick and easy scheduling with real-time availability
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          <p>© 2025 Locals. Connecting communities, one service at a time.</p>
        </div>
      </footer>
    </div>
  );
}