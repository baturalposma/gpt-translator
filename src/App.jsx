import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [translation, setTranslation] = useState("");

  const languages = ["Spanish", "French", "German", "Italian", "Portuguese", "Dutch"];

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const translateText = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Translate the following English json text to ${language} but only values.`,
            },
            { role: "user", content: text },
          ],
        },
        {
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
        }
      );

      const translatedText = response.data.choices[0].message.content;
      setTranslation(translatedText);
    } catch (error) {
      console.error(error);
      alert("Error occurred during translation");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    translateText();
  };

  return (
    <div className="App">
      <h1>GPT-4 Translation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Text to translate:</label>
        <br />
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          cols={40}
        ></textarea>
        <br />
        <label htmlFor="language">Target language:</label>
        <br />
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Translate</button>
      </form>
      <>
        <h2>Translation</h2>
        <textarea
          id="translation"
          value={ translation && translation}
          rows={15}
          cols={40}
        ></textarea>
      </>
    </div>
  );
};

export default App;