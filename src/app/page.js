import FileGetter from "./components/FileGetter";
import styles from "./page.module.css";

export default function Home() {

  

  return (
    <main className={styles.main}>
      <FileGetter></FileGetter>
    </main>
  );
}



// Image types: https://ai.google.dev/docs/gemini_api_overview#image_requirements
// Get Input Value: https://bobbyhadz.com/blog/react-get-input-value

