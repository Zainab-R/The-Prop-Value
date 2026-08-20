import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/utils/rateLimit";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      {
        message:
          "Photo uploads are not configured on this server. Please contact support.",
      },
      { status: 503 }
    );
  }

  const { allowed } = checkRateLimit(
    `upload:${session.user.email}`,
    10,
    10 * 60 * 1000
  );

  if (!allowed) {
    return NextResponse.json(
      { message: "Too many upload attempts. Please try again later." },
      { status: 429 }
    );
  }

  const formData = await request.formData();

  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { message: "Only JPEG, PNG, or WEBP images are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { message: "Image must be smaller than 5MB." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "prop-value/profile",
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: result.secure_url,
      },
    });

    return NextResponse.json({
      image: result.secure_url,
    });
  } catch (error) {
    console.error("Profile photo upload failed:", error);

    return NextResponse.json(
      { message: "Failed to upload photo. Please try again." },
      { status: 502 }
    );
  }
}