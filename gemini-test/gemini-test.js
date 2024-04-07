
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAPCzI34c6BFFoJuOORzhi8Crx1uboa03c"); // process.env.API_KEY

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

  const prompt = "What is the likelihood that this message is a scam? Give only the percentage and do not explain.";

  const imageParts = [
    fileToGenerativePart("gemini-test/spam-texts/safe.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/RA-safe.png", "image/png"),
    fileToGenerativePart("gemini-test/spam-texts/cn-1-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/cn-2-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/financial-1-spam.jpg", "image/jpeg"),
    fileToGenerativePart("gemini-test/spam-texts/ups-1.jpg", "image/jpeg"),
  ];

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    
    
  ];
  
  const process = async (image) => {
    try{
      const result = await model.generateContent([prompt, image], safetySettings);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      console.log("==========");
    }catch{
      await process(image);
      console.log("Errored");
    }
    
  }

  for (const image of imageParts) {
    await process(image);
  }

  console.log("Done!");
}

run();
