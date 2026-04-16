import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateServiceImage(
  serviceName: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `Generate a realistic, professional, high-quality 4K image of a mechanical shop performing ${serviceName}. 
    The image should be:
    - Professional and clean
    - Modern automotive service environment
    - Showing the service being performed
    - Well-lit with professional lighting
    - Photorealistic quality
    - 4K resolution (3840x2160)
    
    Return ONLY a realistic photo URL or base64 image data that represents this service.`;

    // Since we can't directly generate images with gemini-pro-vision from text,
    // we'll use a placeholder approach with realistic automotive images
    // In production, you'd use Gemini's image generation or Stability AI
    const serviceImageMap: { [key: string]: string } = {
      "oil change":
        "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=3840&q=95",
      "tire services":
        "https://images.unsplash.com/photo-1486521328584-c6fbb4f3b501?w=3840&q=95",
      "brake repair":
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=3840&q=95",
      "engine diagnostics":
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=3840&q=95",
      "battery replacement":
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=3840&q=95",
      "body shop":
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=3840&q=95",
    };

    const key = serviceName.toLowerCase();
    return (
      serviceImageMap[key] ||
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=3840&q=95"
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=3840&q=95";
  }
}

export async function generateHeroImage(): Promise<string> {
  const heroImages =
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=3840&q=95";
  return heroImages;
}
