"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);


   const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click();
    }
  };
  useEffect(() => {
    // Animate floating background elements
    const animateFloatingElements = () => {
      const elements = document.querySelectorAll(".floating-element");
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.opacity = "0.1";
        element.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 30}px) rotate(${Math.cos(Date.now() * 0.0008 + index) * 5}deg)`;
      });
      requestAnimationFrame(animateFloatingElements);
    };
    animateFloatingElements();

    // Animate title words on load
    const words = document.querySelectorAll(".hero-word");
    words.forEach((word, index) => {
      const element = word as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(100px) rotateX(-90deg)";
      setTimeout(() => {
        element.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0) rotateX(0)";
      }, index * 150);
    });

    // Animate form elements
    setTimeout(() => {
      const form = document.querySelector(".hero-form");
      if (form) {
        (form as HTMLElement).style.opacity = "1";
        (form as HTMLElement).style.transform = "translateY(0) scale(1)";
      }
    }, 800);
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    
    // Add loading animation
    const button = document.querySelector(".generate-btn");
    if (button) {
      (button as HTMLElement).style.transform = "scale(0.95)";
      setTimeout(() => {
        (button as HTMLElement).style.transform = "scale(1)";
      }, 150);
    }

    try {
      // Simulate API call
      const res = await axios.post("/api/generate", {
        prompt,
      });
      const { imageUrl } = res.data;
      setImageUrl(imageUrl);
      // setPrompt("");
      
      // Animate result appearance
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.style.opacity = "1";
          resultRef.current.style.transform = "translateY(0) scale(1)";
        }
      }, 100);
    } catch (err) {
      alert("Failed to generate image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "A majestic dragon flying over a medieval castle at sunset, cinematic lighting, digital art",
    "Cyberpunk cityscape at night with neon lights, rain reflections, futuristic architecture",
    "Adorable cartoon cat wearing a tiny wizard hat, magical sparkles, watercolor style",
    "Abstract geometric mandala with vibrant colors, sacred geometry, high contrast",
    "Portrait of an elderly wizard with glowing blue eyes, detailed beard, fantasy art",
    "Modern minimalist living room with natural lighting, Scandinavian design, cozy atmosphere"
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-purple-500/5 rounded-lg blur-xl transform rotate-12" />
        <div className="floating-element absolute top-40 right-20 w-32 h-24 bg-blue-500/5 rounded-xl blur-2xl transform -rotate-6" />
        <div className="floating-element absolute bottom-40 left-1/4 w-16 h-16 bg-pink-500/5 rounded-lg blur-xl transform rotate-45" />
        <div className="floating-element absolute top-1/3 right-10 w-28 h-20 bg-indigo-500/5 rounded-xl blur-2xl transform rotate-12" />
        <div className="floating-element absolute bottom-20 right-1/3 w-24 h-24 bg-cyan-500/5 rounded-lg blur-xl transform -rotate-12" />
        <div className="floating-element absolute top-1/2 left-20 w-14 h-14 bg-emerald-500/5 rounded-lg blur-xl transform rotate-30" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%), linear-gradient(to bottom, #0f172a 0%, #1e1b4b 50%, #581c87 100%)",
        }}
      >
        <div className="relative z-10 max-w-6xl w-full">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="hero-word inline-block mr-4">Text</span>
            <span className="hero-word inline-block mr-4">to</span>
            <br className="hidden md:block" />
            <span className="hero-word inline-block mr-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Image
            </span>
            
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your text descriptions into stunning, high-quality images instantly. Our advanced AI understands your words and creates exactly what you envision.
          </p>

          {/* Main Form */}
          <div className="hero-form max-w-4xl mx-auto opacity-0 transform translate-y-8 scale-95 transition-all duration-1000">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-white mb-4 text-left">
                  Describe the image you want to create
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="A majestic dragon flying over a medieval castle at sunset, digital art, highly detailed..."
                  className="w-full p-4 bg-slate-700/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none"
                  rows={4}
                />
              </div>

              {/* Image Display Area - Shows loading placeholder or generated image */}
              {(loading || imageUrl) && (
                <div className="mb-6">
                  <div className="relative group">
                    {loading ? (
                      // Loading Placeholder
                      <div className="w-full max-w-lg mx-auto aspect-square bg-slate-700/50 rounded-2xl overflow-hidden relative border border-slate-600/30">
                        {/* Fixed Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400/30 border-t-purple-400 mb-4 mx-auto"></div>
                            <p className="text-slate-300 text-sm">Creating your image...</p>
                            <p className="text-slate-400 text-xs mt-1">This usually takes 05-30 seconds</p>
                          </div>
                        </div>
                      </div>
                    ) : imageUrl ? (
                      // Generated Image
                      <div className="w-full max-w-lg mx-auto">
                        <img 
                          src={imageUrl} 
                          alt="Generated Image" 
                          className="w-full aspect-square object-cover rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                          <a 
                            href={imageUrl} 
                            download="ai-generated-image.png" 
                            className="group inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                          >
                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="relative">Download</span>
                          </a>
                          
                          <button
                            onClick={() => {
                              setImageUrl(null);
                              setPrompt("");
                            }}
                            className="group inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white border border-purple-500/50 rounded-full hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                          >
                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="relative cursor-pointer">New Image</span>
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              <button
                ref={buttonRef}
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="generate-btn group relative w-full md:w-auto px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span className="relative">Creating Your Image...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="relative cursor-pointer">Generate Amazing Image</span>
                    <svg
                      className="relative ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {/* Example Prompts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">Try these creative prompts:</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="text-left p-4 cursor-pointer bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 text-sm text-slate-300 hover:text-white group"
                  >
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="italic">"{example}"</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="relative py-24 px-6" style={{ background: "linear-gradient(to bottom, #0f172a 0%, #1e1b4b 100%)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Why Choose Imaginate?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-white">Instant Creation</h3>
              <p className="text-slate-400">Transform text descriptions into stunning images in seconds</p>
            </div>
            
            <div className="group p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3 text-white">Unlimited Creativity</h3>
              <p className="text-slate-400">From realistic photos to abstract art - your imagination is the limit</p>
            </div>
            
            <div className="group p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-3 text-white">High Quality</h3>
              <p className="text-slate-400">Advanced AI models create crisp, detailed images perfect for any use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add shimmer keyframes to the component */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}