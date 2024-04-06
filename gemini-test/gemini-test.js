const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDwEpAoo194P0WfEjdz01B5O9MvhOka6kE"); // process.env.API_KEY

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // text-and-image input (multimodal)
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Is this text spam? Answer in pirate-speak.";

  const imageParts = [
    fileToGenerativePart("gemini-test/spam-texts/cn-1-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/cn-2-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/financial-1-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/ups-1.jpg", "image/jpeg"),
  ];

  for (const image of imageParts) {
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
}

run();
