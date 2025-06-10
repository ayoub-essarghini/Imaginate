// app/page.tsx
"use client";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/generate", { prompt });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      alert("Failed to generate image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
 
      <h1 className="text-3xl font-bold mb-4">AI Headshot Generator</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal headshot... e.g. 'Professional man wearing suit, smiling, studio lighting'"
          className="w-full p-3 border rounded-lg"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Headshot"}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-6">
          <h2 className="font-semibold">Generated Headshot:</h2>
          <img src={imageUrl} alt="Generated Headshot" className="mt-2 max-w-full rounded-lg shadow-md" />
          <a href={imageUrl} download="headshot.png" className="text-blue-500 underline mt-2 inline-block">
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}