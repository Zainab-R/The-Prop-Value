"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  estimateSchema,
  EstimateInput,
} from "@/lib/validations/estimateSchema";

import ToggleSwitch from "./ToggleSwitch";
import AmenitiesCheckbox from "./AmenitiesCheckbox";

const sectors = [
  "A",
  "B1",
  "C",
  "D",
  "E1",
  "E2",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W1",
  "W2",
  "X",
  "Y",
];

const amenitiesList = [
  "Solar System",
  "Garage",
  "Swimming Pool",
  "Basement",
  "Servant Quarter",
  "Lawn",
  "Smart Home",
  "CCTV",
];

export default function EstimateForm() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EstimateInput>({
    resolver: zodResolver(estimateSchema),

    defaultValues: {
      cornerPlot: false,
      parkFacing: false,
      mainBoulevard: false,
      furnished: false,
      amenities: [],
    },
  });

  const propertyType = watch("propertyType");

  const propertySizes = useMemo(() => {
    switch (propertyType) {
      case "Residential Plot":
        return [
          "5 Marla",
          "8 Marla",
          "10 Marla",
          "1 Kanal",
          "2 Kanal",
          "4 Kanal",
        ];

      case "House":
        return [
          "5 Marla",
          "8 Marla",
          "10 Marla",
          "1 Kanal",
          "2 Kanal",
        ];

      case "Commercial Plot":
        return [
          "2 Marla",
          "4 Marla",
          "8 Marla",
        ];

      case "Shop":
        return [
          "2 Marla",
          "4 Marla",
          "8 Marla",
        ];

      default:
        return [];
    }
  }, [propertyType]);
  const router = useRouter();

  async function onSubmit(data: EstimateInput) {
  try {
    const response = await fetch("/api/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to estimate");
    }

    window.location.href = `/dashboard/result?id=${result.estimate.id}`;
  } catch (error) {
    console.error(error);
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
    >
      {/* Property Type */}

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Property Type
        </label>

        <select
          {...register("propertyType")}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
        >
          <option value="">Select Property Type</option>

          <option value="Residential Plot">
            Residential Plot
          </option>

          <option value="Commercial Plot">
            Commercial Plot
          </option>

          <option value="House">
            House
          </option>

          <option value="Shop">
            Shop
          </option>
        </select>

        {errors.propertyType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.propertyType.message}
          </p>
        )}
      </div>

      {/* Sector */}

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Sector
        </label>

        <select
          {...register("sector")}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
        >
          <option value="">Select Sector</option>

          {sectors.map((sector) => (
            <option
              key={sector}
              value={sector}
            >
              {sector}
            </option>
          ))}
        </select>

        {errors.sector && (
          <p className="mt-1 text-sm text-red-500">
            {errors.sector.message}
          </p>
        )}
      </div>

      {/* Property Size */}

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Property Size
        </label>

        <select
          {...register("propertySize")}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
        >
          <option value="">
            Select Property Size
          </option>

          {propertySizes.map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>

        {errors.propertySize && (
          <p className="mt-1 text-sm text-red-500">
            {errors.propertySize.message}
          </p>
        )}
      </div>

      {/* Construction Status */}

      {propertyType === "House" && (
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Construction Status
          </label>

          <select
            {...register("constructionStatus")}
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
          >
            <option value="">
              Select Construction Status
            </option>

            <option value="Under Construction">
              Under Construction
            </option>

            <option value="Ready">
              Ready to Move
            </option>
          </select>
        </div>
      )}

      {/* Road Type */}

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Road Type
        </label>

        <select
          {...register("roadType")}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
        >
          <option value="">
            Select Road Width
          </option>

          <option value="30 ft">30 ft</option>
          <option value="40 ft">40 ft</option>
          <option value="60 ft">60 ft</option>
          <option value="80 ft">80 ft</option>
          <option value="100 ft">100 ft</option>
        </select>

        {errors.roadType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.roadType.message}
          </p>
        )}
      </div>

            {/* Property Features */}

      <div className="grid gap-4 md:grid-cols-3">
        <Controller
          control={control}
          name="cornerPlot"
          render={({ field }) => (
            <ToggleSwitch
              label="Corner Plot"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="parkFacing"
          render={({ field }) => (
            <ToggleSwitch
              label="Park Facing"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="mainBoulevard"
          render={({ field }) => (
            <ToggleSwitch
              label="Main Boulevard"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* House Details */}

      {propertyType === "House" && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Bedrooms
              </label>

              <input
                type="number"
                min={1}
                {...register("bedrooms")}
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
              />

              {errors.bedrooms && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Bathrooms
              </label>

              <input
                type="number"
                min={1}
                {...register("bathrooms")}
                className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
              />

              {errors.bathrooms && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bathrooms.message}
                </p>
              )}
            </div>
          </div>

          <Controller
            control={control}
            name="furnished"
            render={({ field }) => (
              <ToggleSwitch
                label="Furnished"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Luxury Level
            </label>

            <select
              {...register("luxuryLevel")}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
            >
              <option value="">
                Select Luxury Level
              </option>

              <option value="Standard">
                Standard
              </option>

              <option value="Premium">
                Premium
              </option>

              <option value="Luxury">
                Luxury
              </option>
            </select>
          </div>
        </>
      )}

      {/* Amenities */}

      <div>
        <label className="mb-4 block font-medium text-slate-700">
          Amenities
        </label>

        <Controller
          control={control}
          name="amenities"
          render={({ field }) => (
            <div className="grid gap-3 md:grid-cols-2">
              {amenitiesList.map((amenity) => (
                <AmenitiesCheckbox
                  key={amenity}
                  value={amenity}
                  checked={field.value.includes(amenity)}
                  onChange={() => {
                    if (field.value.includes(amenity)) {
                      field.onChange(
                        field.value.filter(
                          (item) => item !== amenity
                        )
                      );
                    } else {
                      field.onChange([
                        ...field.value,
                        amenity,
                      ]);
                    }
                  }}
                />
              ))}
            </div>
          )}
        />
      </div>

            {/* Submit Button */}

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Calculating..."
            : "Estimate Property Value"}
        </button>
      </div>
    </form>
  );
}