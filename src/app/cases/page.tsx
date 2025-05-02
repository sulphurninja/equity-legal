import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCaseTypes } from "@/lib/utils";

export const metadata = {
  title: "Mass Tort & Class Action Cases | Lex Claim Connect",
  description: "View all currently active mass tort and class action cases handled by Lex Claim Connect. Find out if you qualify for compensation.",
};

export default function CasesPage() {
  const caseTypes = getAllCaseTypes();

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <section className="pt-32 pb-12 bg-primary/10">
        <div className="absolute inset-0 h-24 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/85" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Mass Tort & Class Action Cases
            </h1>
            <p className="text-lg text-gray-600 mb-0">
              We specialize in representing individuals harmed by corporate negligence, dangerous products, and toxic exposure.
              Review our current cases to see if you may qualify for compensation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseTypes.map((caseType) => (
              <Card key={caseType.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={caseType.imageUrl}
                    alt={caseType.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-primary mb-2">
                    {caseType.title}
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {caseType.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/cases/${caseType.slug}`}>
                        <span className="flex items-center justify-center">
                          View Case Details
                          <ArrowRight size={16} className="ml-2" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Not Sure Which Case Applies to You?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our legal team can help determine if you qualify for compensation based on your specific situation.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/#case-evaluation">Get a Free Case Evaluation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
