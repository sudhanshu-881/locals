import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MapPin, Star, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary animate-float">Locals</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="smooth-transition hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="btn-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Find Local Services, <span className="text-primary animate-glow-pulse">Your Way</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Connect with skilled professionals in your neighborhood. Whether you need help or want to offer your
              services, Locals makes it simple and secure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 btn-glow">
                Start Exploring <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="smooth-transition hover:bg-primary/10 bg-transparent">
                Browse Services
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-3 stagger-item card-hover-lift p-6 rounded-lg border border-border/50">
              <div className="flex justify-center">
                <MapPin className="h-8 w-8 text-primary animate-float" />
              </div>
              <h3 className="font-semibold text-lg">Hyper-Local</h3>
              <p className="text-muted-foreground">Find services right in your neighborhood</p>
            </div>
            <div className="space-y-3 stagger-item card-hover-lift p-6 rounded-lg border border-border/50">
              <div className="flex justify-center">
                <Star className="h-8 w-8 text-accent animate-float" style={{ animationDelay: "0.5s" }} />
              </div>
              <h3 className="font-semibold text-lg">Trusted Reviews</h3>
              <p className="text-muted-foreground">See ratings and reviews from real users</p>
            </div>
            <div className="space-y-3 stagger-item card-hover-lift p-6 rounded-lg border border-border/50">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-secondary animate-float" style={{ animationDelay: "1s" }} />
              </div>
              <h3 className="font-semibold text-lg">Direct Connection</h3>
              <p className="text-muted-foreground">Message professionals directly</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
