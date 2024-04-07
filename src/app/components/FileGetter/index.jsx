'use client'

import styles from "./style.module.css";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI} from "@google/generative-ai";


const FileGetter = () => {
  const [file, setFile] = useState('');
  const [output, setOutput] = useState('');
  const [pressed, setPressed] = useState(false);
  const inputRef = useRef();
  
  useEffect(() => {
    if(pressed === false){
      return;
    }
    
    console.log(`Use effect triggered and pressed ${pressed}`);
    setOutput("Loading");
    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI('AIzaSyDwEpAoo194P0WfEjdz01B5O9MvhOka6kE');

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
      };
    }

    async function run() {
      try{
        // For text-and-images input (multimodal), use the gemini-pro-vision model
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
  
        const fileInputEl = document.querySelector("input[type=file]");
        const imageParts = await Promise.all(
          [...fileInputEl.files].map(fileToGenerativePart)
        );

      const prompt_percentage = "What is the likelihood that this message is a scam? Give only the percentage and do not explain.";
      const result_percentage = await model.generateContent([prompt_percentage, ...imageParts]);
      const response_percentage = await result_percentage.response;
      const text_percentage = response_percentage.text();
      console.log(text_percentage);

      const prompt = "What is the percentage that this message is a scam? Give only the percentage and explain briefly. Reply in Pirate Speak";

  
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      // console.log(text);
      setOutput(text);
      setPressed(false);
      console.log("Success!");
      }catch(error){
        if(error.message.includes('[400 ] Add an image to use models/gemini-pro-vision, or switch your model to a text model.')){
          console.log("no image or ran out of tokens bb");
          return;
        }
        await new Promise(r => setTimeout(r, 2000));

        console.log(error.name);

        setOutput(output+'.');
        console.log(`Errored ${error.message}`);
        
        await run();
        
      }
      
    }

    run();
  }, [pressed]);


  return (
    <div className={styles.card}>
      <h1 className={styles.header}>Scallywag Scanner
      <br></br>
      <div className={styles.header2}>check if your messages are likely spam!</div> 
      </h1>
      <label htmlFor="file-upload">
        select file
        <input type="file" id="file-upload" name="myfile" accept=".png, .jpg, .jpeg, .webp, .heic, .heif" 
            onChange={() => 
              {
                setFile(URL.createObjectURL(inputRef.current.files[0])); 
                setPressed(false);
                setOutput("Press the 'get pirate opinion' button!");
              }
            }
            ref={inputRef}>
        </input>
      </label>
      

      {file ? 
        <div><p className={styles.textOutput}>{output}</p>
        <img className={styles.image}src={file} />
        </div>
       : null}

      <br></br>
      <button className={styles.button} onClick={() => {setPressed(true)}}>get pirate's opinion!</button>
    </div>
  );

};

export default FileGetter;
