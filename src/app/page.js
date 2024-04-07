'use client'

import styles from "./page.module.css";
import { useState, useRef } from "react";

export default function Home() {

  const [file, setFile] = useState('');
  const inputRef = useRef();



  return (
    <main className={styles.main}>
      <h1 className={styles.store_header}>Scallywag Scanner</h1>
      <label htmlFor="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile" accept=".png, .jpg, .jpeg, .webp, .heic, .heif" onInput={() => setFile(URL.createObjectURL(inputRef.current.files[0]))}
                ref={inputRef}>

                </input>
      {file ? 
        <div><p>I did things</p>
        <img src={file} />
      </div>
       : null}
    </main>
  );
}



// Image types: https://ai.google.dev/docs/gemini_api_overview#image_requirements
// Get Input Value: https://bobbyhadz.com/blog/react-get-input-value
