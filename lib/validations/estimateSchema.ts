import { z } from "zod";

export const estimateSchema = z.object({
  propertyType: z.enum([
    "Residential Plot",
    "Commercial Plot",
    "House",
    "Shop",
  ]),

  sector: z.string().min(1, "Please select a sector"),

  propertySize: z.string().min(1, "Please select a property size"),

  // Only meaningful when sector === "C" — DHA Multan Sector C has no
  // plain residential plots; its inventory is entirely through named
  // housing societies (ATC Villas, DHA Villas, Premium Villas, Askari
  // Housing Society). See lib/propertyOptions.ts.
  villaType: z.string().optional(),

  constructionStatus: z.string().optional(),

  cornerPlot: z.boolean().default(false),

  parkFacing: z.boolean().default(false),

  mainBoulevard: z.boolean().default(false),

  bedrooms: z.coerce.number().optional(),

  bathrooms: z.coerce.number().optional(),

  furnished: z.boolean().default(false),

  luxuryLevel: z.string().optional(),

  amenities: z.array(z.string()).default([]),
});

export type EstimateInput = z.infer<typeof estimateSchema>;