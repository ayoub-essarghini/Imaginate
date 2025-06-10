// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("style", "realistic");
  formData.append("aspect_ratio", "1:1");

  try {
    const response = await fetch("https://api.vyro.ai/v2/image/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VYRO_API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

     const imageBlob = await response.blob();
    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    return NextResponse.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
