"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Our privacy policy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is a placeholder for the privacy policy page.</p>
          <Link href="/">
            <Button className="mt-4 w-full">Go to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
