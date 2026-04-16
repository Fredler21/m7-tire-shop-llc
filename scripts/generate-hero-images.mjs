import fs from "node:fs/promises";
import path from "node:path";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-image";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const OUTPUT_DIR = path.resolve("public/images");

const prompts = [
  {
    filename: "hero-car-repair.png",
    title: "Car Being Repaired",
    prompt:
      "A professional mechanic repairing a modern car inside a clean, well-lit auto repair shop. The mechanic is focused, wearing gloves and using tools under the hood. The environment looks organized and high-end with modern equipment. Realistic lighting, cinematic angle, shallow depth of field, ultra-detailed, 4K quality, premium automotive service atmosphere.",
  },
  {
    filename: "hero-oil-change.png",
    title: "Oil Change",
    prompt:
      "A close-up of a mechanic performing an oil change on a car, with fresh golden oil being poured into the engine. The scene is inside a modern garage with clean tools and a professional setup. The mechanic is wearing gloves and uniform. Focus on the oil flow and engine detail, realistic lighting, high detail, 4K, premium automotive service style.",
  },
  {
    filename: "hero-tire-services.png",
    title: "Tire Services",
    prompt:
      "A mechanic installing or replacing a car tire using professional equipment in a modern auto shop. The tire and rim are clean and detailed, with tools visible nearby. The background shows a high-end garage environment. Dramatic lighting, sharp focus, realistic textures, 4K quality, premium service feel.",
  },
  {
    filename: "hero-engine-diagnostics.png",
    title: "Engine Diagnostics",
    prompt:
      "A mechanic using a digital diagnostic scanner connected to a car, analyzing engine data on a screen. The car hood is open, and the environment is a modern, clean auto repair shop. Include glowing digital interface elements on the scanner screen. Futuristic yet realistic, high detail, cinematic lighting, 4K, professional automotive technology vibe.",
  },
  {
    filename: "hero-battery-replacement.png",
    title: "Battery Replacement",
    prompt:
      "A mechanic replacing a car battery under the hood, carefully disconnecting and installing a new battery. The scene is clean and professional with visible cables and components. Focus on hands and battery details. Bright, realistic lighting, sharp focus, ultra-detailed, 4K, premium automotive service environment.",
  },
  {
    filename: "hero-body-shop.png",
    title: "Body Shop",
    prompt:
      "A car in a professional body shop being repaired or repainted, with a mechanic using tools or spray painting the car. The car surface is glossy and reflective. The environment is modern, clean, and well-lit with industrial lights. Cinematic angle, high detail, realistic reflections, 4K quality, luxury automotive repair atmosphere.",
  },
];

function extractImagePart(data) {
  const candidates = data?.candidates ?? [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts ?? [];
    for (const part of parts) {
      if (part?.inlineData?.data && part?.inlineData?.mimeType?.startsWith("image/")) {
        return part.inlineData;
      }
    }
  }
  return null;
}

async function generateImage(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const inlineData = extractImagePart(data);
  if (!inlineData) {
    throw new Error("No image data returned by Gemini for this prompt.");
  }

  return inlineData;
}

async function main() {
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is missing. Add it to .env.local.");
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const item of prompts) {
    console.log(`Generating: ${item.title}`);
    const image = await generateImage(item.prompt);
    const outputPath = path.join(OUTPUT_DIR, item.filename);
    const buffer = Buffer.from(image.data, "base64");
    await fs.writeFile(outputPath, buffer);
    console.log(`Saved: ${outputPath} (${image.mimeType})`);
  }

  console.log("Done. Generated all hero images.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
