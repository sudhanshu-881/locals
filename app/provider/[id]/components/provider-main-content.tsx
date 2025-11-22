
'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingDisplay } from "@/components/ratings/rating-display";
import { RatingForm } from "@/components/ratings/rating-form";
import { Tables } from "@/lib/types/supabase";

interface ProviderMainContentProps {
    provider: Tables<"profiles"> & { services: Tables<"services">[], ratings: Tables<"ratings">[] };
}

export default function ProviderMainContent({ provider }: ProviderMainContentProps) {
    return (
        <div className="space-y-6">
            {provider.bio && (
                <Card>
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{provider.bio}</p>
                    </CardContent>
                </Card>
            )}

            {provider.skills && provider.skills.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {(provider.skills as string[]).map((skill) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {provider.services && provider.services.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {provider.services.map((service) => (
                            <div key={service.id} className="border-b pb-4 last:border-0">
                                <h4 className="font-semibold">{service.title}</h4>
                                {service.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                    <Badge variant="secondary">{service.category}</Badge>
                                    {service.hourly_rate && <span className="font-semibold">${service.hourly_rate}/hr</span>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            <RatingDisplay
                rating={provider.rating_avg || 0}
                totalRatings={provider.total_ratings || 0}
                reviews={provider.ratings || []}
            />

            <RatingForm rateeId={provider.id} />
        </div>
    );
}
