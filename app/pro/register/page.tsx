"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ProRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Become a Pro</CardTitle>
          <CardDescription>Register to offer your services</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is a placeholder for the pro registration page.</p>
          <Link href="/pro/guidelines">
            <Button className="mt-4 w-full">View Guidelines</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
