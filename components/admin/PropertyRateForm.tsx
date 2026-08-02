"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  sectors,
  propertyTypes,
  propertySizes,
} from "@/lib/propertyOptions";

interface PropertyRate {
  id?: string;
  sector: string;
  propertyType: string;
  propertySize: string;
  basePrice: number;
}

interface Props {
  open: boolean;
  title: string;
  initialValues?: PropertyRate;
  onClose: () => void;
  onSubmit: (data: PropertyRate) => Promise<void>;
}

export default function PropertyRateForm({
  open,
  title,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PropertyRate>({
    id: "",
    sector: "",
    propertyType: "",
    propertySize: "",
    basePrice: 0,
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        id: initialValues.id ?? "",
        sector: initialValues.sector ?? "",
        propertyType: initialValues.propertyType ?? "",
        propertySize: initialValues.propertySize ?? "",
        basePrice: initialValues.basePrice ?? 0,
    });
    } else {
      setForm({
        id: "",
        sector: "",
        propertyType: "",
        propertySize: "",
        basePrice: 0,
      });
    }
  }, [initialValues]);

  async function handleSubmit() {
    if (
      !form.sector ||
      !form.propertyType ||
      !form.propertySize ||
      form.basePrice <= 0
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(form);

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle className="text-2xl font-bold text-[#123A6D]">
            {title}
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Sector
            </label>

            <Select
              value={form.sector}
              onValueChange={(value) =>
                setForm((prev) => ({
                ...prev,
                sector: value ?? "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>

              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem
                    key={sector}
                    value={sector}
                  >
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Property Type
            </label>

            <Select
              value={form.propertyType}
              onValueChange={(value) =>
                setForm((prev) => ({
                ...prev,
                propertyType: value ?? "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>

              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Property Size
            </label>

            <Select
              value={form.propertySize}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  propertySize: value ?? "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Size" />
              </SelectTrigger>

              <SelectContent>
                {propertySizes.map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Base Price
            </label>

            <Input
              type="number"
              value={form.basePrice || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  basePrice: Number(e.target.value),
                })
              }
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#123A6D] hover:bg-[#F97316]"
          >
            {loading ? "Saving..." : "Save"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}