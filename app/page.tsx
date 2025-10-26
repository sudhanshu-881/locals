import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MapPin, Star, Zap, Shield, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-float">
            Locals
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="smooth-transition hover:text-primary hover:bg-primary/5">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="btn-glow bg-primary hover:bg-primary/90 shadow-lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6 animate-slide-up">
            <div className="inline-block badge-premium">
              <Zap className="h-4 w-4" />
              <span>Hyper-Local Services Made Simple</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
              Find Local Services,{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow-pulse">
                Your Way
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
              Connect with skilled professionals in your neighborhood. Whether you need help or want to offer your
              services, Locals makes it simple, secure, and seamless.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 shadow-xl gap-2 px-8 py-6 text-lg">
                Start Exploring <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                size="lg"
                variant="outline"
                className="smooth-transition hover:bg-primary/10 bg-card/50 backdrop-blur-sm border-border/50 px-8 py-6 text-lg"
              >
                Browse Services
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 pt-8">
            <div className="stagger-item card-premium p-8 space-y-4 card-hover-lift group">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-8 w-8 text-primary animate-float" />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Hyper-Local Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find services right in your neighborhood with precise location-based matching
              </p>
            </div>

            <div className="stagger-item card-premium p-8 space-y-4 card-hover-lift group">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Star className="h-8 w-8 text-accent animate-float" style={{ animationDelay: "0.5s" }} />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Trusted Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                See authentic ratings and reviews from real users in your community
              </p>
            </div>

            <div className="stagger-item card-premium p-8 space-y-4 card-hover-lift group">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <MessageSquare className="h-8 w-8 text-secondary animate-float" style={{ animationDelay: "1s" }} />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Direct Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Message professionals directly and build lasting relationships
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16 pt-8">
            <div className="card-premium p-8 space-y-4 card-hover-lift text-left">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-lg">Secure & Verified</h3>
              </div>
              <p className="text-muted-foreground">All professionals are verified for your peace of mind</p>
            </div>

            <div className="card-premium p-8 space-y-4 card-hover-lift text-left">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-lg">Instant Booking</h3>
              </div>
              <p className="text-muted-foreground">Quick and easy scheduling with real-time availability</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          <p>© 2025 Locals. Connecting communities, one service at a time.</p>
        </div>
      </footer>
    </div>
  )
}
