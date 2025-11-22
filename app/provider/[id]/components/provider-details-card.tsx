
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RequestButton } from "@/components/requests/request-button";
import { Tables } from "@/lib/types/supabase";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

interface ProviderDetailsCardProps {
    provider: Tables<"profiles">;
}

export default function ProviderDetailsCard({ provider }: ProviderDetailsCardProps) {
    const initials = `${provider.first_name?.[0] || ""}${provider.last_name?.[0] || ""}`.toUpperCase();

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={provider.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">
                            {provider.first_name} {provider.last_name}
                        </h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{provider.rating_avg || "N/A"}</span>
                            <span className="text-sm text-muted-foreground">({provider.total_ratings} reviews)</span>
                        </div>
                    </div>

                    <div className="w-full space-y-2 border-t pt-4">
                        {provider.city && (
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {provider.city}, {provider.state}
                                </span>
                            </div>
                        )}
                        {provider.phone && (
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{provider.phone}</span>
                            </div>
                        )}
                        {provider.email && (
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{provider.email}</span>
                            </div>
                        )}
                    </div>

                    {provider.hourly_rate && (
                        <div className="w-full border-t pt-4">
                            <div className="text-lg font-bold text-primary">${provider.hourly_rate}/hour</div>
                        </div>
                    )}

                    <div className="w-full space-y-2">
                        <RequestButton providerId={provider.id} providerName={`${provider.first_name} ${provider.last_name}`} />
                        <Link href={`/messages?to=${provider.id}`} className="w-full block">
                            <Button variant="outline" className="w-full">Send Message</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
