import React, { useState } from "react";
import axios from "axios";
import "../styles/PredictForm.css";

function PredictForm() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState(null);

 const handleVerify = async (e) => {
  e.preventDefault();
  if (!newsText.trim()) return;

  try {
    const res = await axios.post("http://127.0.0.1:5000/api/predict", {  // ← "/api/predict"
      news_text: newsText  // ← "news_text"
    });
    // ✅ Backend se sahi field le rahe hain
    if (res.data.is_real === true) {
      setResult("REAL");
    } else if (res.data.is_real === false) {
      setResult("FAKE");
    } else {
      setResult("INVALID");
    }
  } catch (err) {
    console.error(err);
    setResult("INVALID");
  }
};

  return (
    <div className="predict-card">
      <h2>Verify Education News</h2>
      <form onSubmit={handleVerify} className="predict-form">
        <textarea
          placeholder="Paste education-related news here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          required
        />
        <button type="submit">Verify News</button>
      </form>

      {result === "REAL" && <div className="verify-result real">✅ This news is REAL</div>}
      {result === "FAKE" && <div className="verify-result fake">❌ This news is FAKE</div>}
      {result === "INVALID" && <div className="verify-result invalid">⚠️ Invalid or insufficient news text</div>}
    </div>
  );
}

export default PredictForm;
