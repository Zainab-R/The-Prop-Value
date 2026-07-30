import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function ResultPage({
  searchParams,
}: PageProps) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const estimate = await prisma.estimate.findUnique({
    where: {
      id,
    },
  });

  if (!estimate) {
    notFound();
  }

  const estimatedValue =
    (Number(estimate.estimatedMin) +
      Number(estimate.estimatedMax)) / 2;

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-[#102A43]">
          Property Valuation Report
        </h1>

        <p className="mt-2 text-slate-500">
          Here's the estimated market value for your property.
        </p>
      </div>

      <div className="rounded-xl bg-white shadow p-8">

        <h2 className="text-xl font-semibold mb-6">
          Estimated Value
        </h2>

        <div className="text-5xl font-bold text-green-600">
          PKR {estimatedValue.toLocaleString()}
        </div>

        <p className="mt-4 text-slate-600">
          Estimated Range
        </p>

        <div className="text-lg font-medium">
          PKR {Number(estimate.estimatedMin).toLocaleString()} - PKR{" "}
          {Number(estimate.estimatedMax).toLocaleString()}
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="font-semibold mb-4">
            Property Details
          </h3>

          <div className="space-y-2">

            <p>
              <strong>Property Type:</strong>{" "}
              {estimate.propertyType}
            </p>

            <p>
              <strong>Sector:</strong>{" "}
              {estimate.sector}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {estimate.propertySize}
            </p>

            <p>
              <strong>Luxury Level:</strong>{" "}
              {estimate.luxuryLevel ?? "-"}
            </p>

            <p>
              <strong>Road Type:</strong>{" "}
              {estimate.roadType ?? "-"}
            </p>

            <p>
              <strong>Construction Status:</strong>{" "}
              {estimate.constructionStatus ?? "-"}
            </p>

          </div>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="font-semibold mb-4">
            Property Features
          </h3>

          <div className="space-y-2">

            <p>
              Corner Plot: {estimate.cornerPlot ? "Yes" : "No"}
            </p>

            <p>
              Park Facing: {estimate.parkFacing ? "Yes" : "No"}
            </p>

            <p>
              Main Boulevard: {estimate.mainBoulevard ? "Yes" : "No"}
            </p>

            <p>
              Furnished: {estimate.furnished ? "Yes" : "No"}
            </p>

            <p>
              Bedrooms: {estimate.bedrooms ?? "-"}
            </p>

            <p>
              Bathrooms: {estimate.bathrooms ?? "-"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}