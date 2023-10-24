import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  const url = "http://localhost:4500/api/v2";

  const getImageUrl = async () => {
    try {
      const response = await axios.post(url);
      setImageUrl(response.data.data);
    } catch (error) {
      console.error("error fetching image url");
    }
  };

  return (
    <div className="image-url">
      <h3>Get generated Image</h3>
      <button onClick={getImageUrl}>Get Image</button>
      {imageUrl && (
        <img src={imageUrl} alt="generated image" className="an image url" />
      )}
    </div>
  );
}

export default App;
