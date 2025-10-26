"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Loader2 } from "lucide-react"

export default function SetupLocationPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    setGeoLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // Reverse geocode to get city/state
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
          const data = await response.json()

          const addressData = data.address || {}
          setCity(addressData.city || addressData.town || addressData.village || "")
          setState(addressData.state || "")
          setAddress(data.display_name || "")
        } catch (err) {
          console.error("Geocoding error:", err)
          setError("Could not determine your location. Please enter manually.")
        } finally {
          setGeoLoading(false)
        }
      },
      (err) => {
        console.error("Geolocation error:", err)
        setError("Please enable location access or enter your location manually")
        setGeoLoading(false)
      },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!city.trim() || !state.trim()) {
      setError("City and state are required")
      return
    }

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          city: city.trim(),
          state: state.trim(),
          address: address.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (updateError) throw updateError

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error saving location:", err)
      setError("Failed to save location. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-2">
            <MapPin className="w-6 h-6 text-primary animate-bounce" />
          </div>
          <CardTitle className="text-center text-2xl">Set Your Location</CardTitle>
          <CardDescription className="text-center">Help us find service providers near you</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
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
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
                className="w-full border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                {geoLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Auto-Detect Location
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
