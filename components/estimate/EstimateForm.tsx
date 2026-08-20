"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  estimateSchema,
  EstimateInput,
} from "@/lib/validations/estimateSchema";

import ToggleSwitch from "./ToggleSwitch";
import AmenitiesCheckbox from "./AmenitiesCheckbox";
import {
  sectors,
  propertyTypes,
  luxuryLevels,
  amenitiesList,
  isPropertyType,
  getSectorsForPropertyType,
  getSizesForSectorAndType,
  getVillaTypesForPropertyType,
  getSizesForVillaType,
} from "@/lib/propertyOptions";

export default function EstimateForm() {
  const {
    register,
    control,
    watch,
    setValue,
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
  const sector = watch("sector");
  const villaType = watch("villaType");

  const villaTypesForType = useMemo(() => {
    if (!propertyType || !isPropertyType(propertyType)) {
      return [];
    }

    return getVillaTypesForPropertyType(propertyType);
  }, [propertyType]);

  const isSectorC = sector === "C";

  const availableSectors = useMemo(() => {
    if (!propertyType || !isPropertyType(propertyType)) {
      return [];
    }

    const base = getSectorsForPropertyType(propertyType);

    // Sector C has no plain residential/commercial category of its
    // own — it's only reachable when this property type has at least
    // one named housing society (ATC Villas, DHA Villas, etc.).
    if (villaTypesForType.length > 0) {
      return sectors.filter((s) => base.includes(s) || s === "C");
    }

    return base;
  }, [propertyType, villaTypesForType]);

  const propertySizes = useMemo(() => {
    if (!propertyType || !isPropertyType(propertyType) || !sector) {
      return [];
    }

    if (isSectorC) {
      return villaType ? getSizesForVillaType(villaType, propertyType) : [];
    }

    return getSizesForSectorAndType(propertyType, sector);
  }, [propertyType, sector, isSectorC, villaType]);

  // Clear the sector if it's no longer valid for the newly selected
  // property type (e.g. Sector C has no residential category).
  useEffect(() => {
    if (sector && !availableSectors.includes(sector)) {
      setValue("sector", "");
    }
  }, [availableSectors, sector, setValue]);

  // Clear the housing society whenever we leave Sector C.
  useEffect(() => {
    if (!isSectorC) {
      setValue("villaType", "");
    }
  }, [isSectorC, setValue]);

  // Clear the size whenever the set of valid sizes changes underneath it.
  useEffect(() => {
    setValue("propertySize", "");
  }, [propertyType, sector, villaType, setValue]);

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
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong while calculating your estimate."
    );
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
    >
      {/* Property Type */}

      <div>
        <label htmlFor="propertyType" className="mb-2 block font-medium text-slate-700">
          Property Type
        </label>

        <select
          id="propertyType"
          {...register("propertyType")}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
        >
          <option value="">Select Property Type</option>

          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {errors.propertyType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.propertyType.message}
          </p>
        )}
      </div>

      {/* Sector */}

      <div>
        <label htmlFor="sector" className="mb-2 block font-medium text-slate-700">
          Sector
        </label>

        <select
          id="sector"
          {...register("sector")}
          disabled={!propertyType}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          <option value="">
            {propertyType ? "Select Sector" : "Select Property Type First"}
          </option>

          {availableSectors.map((sector) => (
            <option
              key={sector}
              value={sector}
            >
              Sector {sector}
            </option>
          ))}
        </select>

        {propertyType && availableSectors.length === 0 && (
          <p className="mt-1 text-sm text-slate-500">
            No sectors currently offer this property type.
          </p>
        )}

        {errors.sector && (
          <p className="mt-1 text-sm text-red-500">
            {errors.sector.message}
          </p>
        )}
      </div>

      {/* Housing Society (Sector C only) */}

      {isSectorC && villaTypesForType.length > 0 && (
        <div>
          <label htmlFor="villaType" className="mb-2 block font-medium text-slate-700">
            Housing Society
          </label>

          <select
            id="villaType"
            {...register("villaType")}
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
          >
            <option value="">Select Housing Society</option>

            {villaTypesForType.map((vt) => (
              <option key={vt} value={vt}>
                {vt}
              </option>
            ))}
          </select>

          <p className="mt-1 text-sm text-slate-500">
            Sector C has no standalone {propertyType.toLowerCase()} category
            — its inventory is entirely through these housing societies.
          </p>
        </div>
      )}

      {isSectorC && villaTypesForType.length === 0 && (
        <p className="text-sm text-slate-500">
          No housing society in Sector C currently offers {propertyType.toLowerCase()}.
        </p>
      )}

      {/* Property Size */}

      <div>
        <label htmlFor="propertySize" className="mb-2 block font-medium text-slate-700">
          Property Size
        </label>

        <select
          id="propertySize"
          {...register("propertySize")}
          disabled={!sector || (isSectorC && !villaType)}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        >
          <option value="">
            {!propertyType
              ? "Select Property Type First"
              : !sector
              ? "Select Sector First"
              : isSectorC && !villaType
              ? "Select Housing Society First"
              : propertySizes.length === 0
              ? "No sizes available"
              : "Select Property Size"}
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
          <label htmlFor="constructionStatus" className="mb-2 block font-medium text-slate-700">
            Construction Status
          </label>

          <select
            id="constructionStatus"
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
              <label htmlFor="bedrooms" className="mb-2 block font-medium text-slate-700">
                Bedrooms
              </label>

              <input
                id="bedrooms"
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
              <label htmlFor="bathrooms" className="mb-2 block font-medium text-slate-700">
                Bathrooms
              </label>

              <input
                id="bathrooms"
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
            <label htmlFor="luxuryLevel" className="mb-2 block font-medium text-slate-700">
              Luxury Level
            </label>

            <select
              id="luxuryLevel"
              {...register("luxuryLevel")}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
            >
              <option value="">
                Select Luxury Level
              </option>

              {luxuryLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
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
          className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-orange-600 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {isSubmitting
            ? "Calculating..."
            : "Estimate Property Value"}
        </button>
      </div>
    </form>
  );
}