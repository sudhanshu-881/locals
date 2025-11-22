
import { fetchProviderWithDetails } from "@/lib/queries/provider";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProviderDetailsCard from "./components/provider-details-card";
import ProviderMainContent from "./components/provider-main-content";

interface ProviderPageProps {
  params: { id: string };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = params;
  const provider = await fetchProviderWithDetails(id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/discover">
          <Button variant="ghost" className="mb-6">
            Back to Discover
          </Button>
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <ProviderDetailsCard provider={provider} />
          </div>
          <div className="md:col-span-2">
            <ProviderMainContent provider={provider} />
          </div>
        </div>
      </div>
    </div>
  );
}
