'use client'

import styles from "./page.module.css";
import { useState, useRef } from "react";

export default function Home() {

  const [file, setFile] = useState('');
  const inputRef = useRef();

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Scallywag Scanner</h1>
      
      <label className={styles.button} for="file-upload">
        select file
        <input type="file" id="file-upload" name="myfile" accept=".png, .jpg, .jpeg, .webp, .heic, .heif" 
            onInput={() => setFile(URL.createObjectURL(inputRef.current.files[0]))}
            ref={inputRef}>
        </input>
      </label>
      

      {file ? 
        <div><p>I did things</p>
        <img src={file} />
        </div>
       : null}

      <br></br>
      <button className={styles.button} onclick="">get pirate's opinion!</button>
    </main>
  );
}



// Image types: https://ai.google.dev/docs/gemini_api_overview#image_requirements
// Get Input Value: https://bobbyhadz.com/blog/react-get-input-value
