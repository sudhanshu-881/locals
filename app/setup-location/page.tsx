use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";

export default function SetupLocationPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setGeoLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Using a more reliable geocoding service if possible
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();

          setCity(data.city || "");
          setState(data.principalSubdivision || "");
          setAddress(data.localityInfo.administrative.map(a => a.name).join(', ') || "");
        } catch (err) {
          console.error("Geocoding error:", err);
          setError("Could not determine your location. Please enter manually.");
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Please enable location access or enter your location manually");
        setGeoLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!city.trim() || !state.trim()) {
      setError("City and state are required");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          city: city.trim(),
          state: state.trim(),
          address: address.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      router.push("/dashboard");
    } catch (err) {
      console.error("Error saving location:", err);
      setError("Failed to save location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="space-y-2">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-6 w-6 animate-bounce text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">Set Your Location</CardTitle>
          <CardDescription className="text-center">
            Help us find service providers near you
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <Input
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={loading || geoLoading}
                className="border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <Input
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={loading || geoLoading}
                className="border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address (Optional)</label>
              <Input
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading || geoLoading}
                className="border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                disabled={loading || geoLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Continue to Dashboard"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={detectLocation}
                disabled={loading || geoLoading}
                className="w-full border-primary/20 bg-transparent hover:bg-primary/5"
              >
                {geoLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Auto-Detect Location
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
