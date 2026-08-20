"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera, Save } from "lucide-react";

interface User {
  name: string;
  email: string;
  image?: string;
}

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setUser({
          name: data.name || "",
          email: data.email || "",
          image: data.image || "",
        });

        setPreview(data.image || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      setPreview(data.image);

      setUser((prev) => ({
        ...prev,
        image: data.image,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemovePhoto() {
  try {
    const res = await fetch("/api/profile/remove-photo", {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to remove photo");
    }

    setPreview("");

    setUser((prev) => ({
      ...prev,
      image: "",
    }));

    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Unable to remove profile photo.");
  }
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user.name, email: user.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Update failed");
      }

      router.push("/dashboard/profile");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        Loading profile...
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/dashboard/profile"
          className="rounded-xl border border-slate-300 p-3 transition hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-primary">
            Edit Profile
          </h1>

          <p className="mt-1 text-slate-500">
            Update your personal information.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-5 border-b border-slate-200 pb-8 sm:flex-row">
            {preview ? (
              <Image
                src={preview}
                alt="Profile"
                width={112}
                height={112}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-500 text-4xl font-bold text-white">
                {initials}
              </div>
            )}

            <div>
              <div className="flex flex-wrap gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600">
                    <Camera size={18} />

                    {uploading ? "Uploading..." : "Upload Photo"}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                {preview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-500">
                JPG, PNG or WEBP • Max 5 MB
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block font-medium text-primary">
              Full Name
            </label>

            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-primary">
              Email Address
            </label>

            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/profile"
              className="rounded-xl border border-slate-300 px-6 py-3 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 disabled:opacity-60"
            >
              <Save size={18} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}