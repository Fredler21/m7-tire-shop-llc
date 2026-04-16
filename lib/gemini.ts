import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateServiceImage(
  serviceName: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate a realistic, professional, high-quality 4K image of a mechanical shop performing ${serviceName}. 
    The image should be:
    - Professional and clean
    - Modern automotive service environment
    - Showing the service being performed
    - Well-lit with professional lighting
    - Photorealistic quality
    - 4K resolution (3840x2160)
    
    Return ONLY a realistic photo URL or base64 image data that represents this service.`;

    // Static fallback mapping points to Gemini-generated local assets.
    const serviceImageMap: { [key: string]: string } = {
      "oil change": "/images/hero-oil-change.png",
      "tire services": "/images/hero-tire-services.png",
      "brake repair": "/images/hero-car-repair.png",
      "engine diagnostics": "/images/hero-engine-diagnostics.png",
      "battery replacement": "/images/hero-battery-replacement.png",
      "body shop": "/images/hero-body-shop.png",
    };

    const key = serviceName.toLowerCase();
    return (
      serviceImageMap[key] ||
      "/images/hero-car-repair.png"
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return "/images/hero-car-repair.png";
  }
}

export async function generateHeroImage(): Promise<string> {
  const heroImages = "/images/hero-car-repair.png";
  return heroImages;
}
