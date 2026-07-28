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

  constructionStatus: z.string().optional(),

  cornerPlot: z.boolean().default(false),

  parkFacing: z.boolean().default(false),

  mainBoulevard: z.boolean().default(false),

  bedrooms: z.coerce.number().optional(),

  bathrooms: z.coerce.number().optional(),

  furnished: z.boolean().default(false),

  luxuryLevel: z.string().optional(),

  roadType: z.string().min(1, "Please select road type"),

  amenities: z.array(z.string()).default([]),
});

export type EstimateInput = z.infer<typeof estimateSchema>;