//Extract Text from Documents (Google Vision API)

import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const extractText = async (filePath: string): Promise<string> => {
    try {
        const [result] = await client.textDetection(filePath);
        const text = result.textAnnotations?.[0]?.description || "";
        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        return "";
    }
};

