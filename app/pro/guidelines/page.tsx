"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ProGuidelinesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pro Guidelines</CardTitle>
          <CardDescription>Guidelines for offering your services</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is a placeholder for the pro guidelines page.</p>
          <Link href="/pro/register">
            <Button className="mt-4 w-full">Register as a Pro</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
