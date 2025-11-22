
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Locals</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Locals is a platform designed to connect you with trusted and skilled professionals in your community. Our mission is to make it easy to find reliable help for any service you need, right in your neighborhood.
          </p>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-8">
            Founded in 2023, Locals was born from the simple idea that finding trusted local service providers shouldn't be a chore. We were tired of endless searches and unreliable reviews. We envisioned a platform where you could quickly and easily connect with the best professionals in your area, from plumbers and electricians to tutors and photographers.
          </p>
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><span className="font-semibold">Community-focused:</span> We believe in the power of local connections.</li>
            <li><span className="font-semibold">Trust and Safety:</span> Your peace of mind is our top priority.</li>
            <li><span className="font-semibold">Quality and Reliability:</span> We connect you with the best professionals in the business.</li>
            <li><span className="font-semibold">Simplicity:</span> We make it easy to find, connect, and hire local pros.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
