"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const examplesRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for hero animations
      const heroTl = gsap.timeline()

      // Animate floating background elements (image-themed shapes)
      gsap.set(".floating-element", { opacity: 0, y: 50, scale: 0.8, rotation: -15 })
      gsap.to(".floating-element", {
        opacity: 0.1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out",
        delay: 1,
      })

      // Continuous floating animation
      gsap.to(".floating-element", {
        y: "-=30",
        rotation: "+=5",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.7,
        delay: 3,
      })

      // Hero title word-by-word animation
      gsap.set(".hero-word", { opacity: 0, y: 100, rotationX: -90 })
      heroTl.to(".hero-word", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      })

      // Typewriter effect for subtitle
      heroTl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5",
      )

      // Demo prompt animation
      heroTl.fromTo(
        ".demo-prompt",
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )

      // Hero CTA with magnetic effect
      heroTl.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )

      // Magnetic hover effect for CTA button
      const heroButton = document.querySelector(".hero-cta a")
      if (heroButton) {
        heroButton.addEventListener("mouseenter", () => {
          gsap.to(heroButton, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        })
        heroButton.addEventListener("mouseleave", () => {
          gsap.to(heroButton, { scale: 1, duration: 0.3, ease: "power2.out" })
        })
      }

      // Features section animations
      gsap.set(".feature-card", { opacity: 0, y: 80, rotationY: -15 })

      ScrollTrigger.create({
        trigger: ".features-section",
        start: "top 70%",
        onEnter: () => {
          gsap.to(".feature-card", {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          })
        },
      })

      // Example gallery animation
      gsap.set(".example-card", { opacity: 0, scale: 0.8, y: 50 })

      ScrollTrigger.create({
        trigger: ".examples-section",
        start: "top 70%",
        onEnter: () => {
          gsap.to(".example-card", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          })
        },
      })

      // Feature cards hover animations
      document.querySelectorAll(".feature-card").forEach((card) => {
        const icon = card.querySelector(".feature-icon")

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(icon, {
            scale: 1.2,
            rotation: 5,
            duration: 0.4,
            ease: "back.out(1.7)",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      })

      // Example cards hover animation
      document.querySelectorAll(".example-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Bottom CTA reveal
      gsap.set(".cta-content", { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: ".bottom-cta",
        start: "top 80%",
        onEnter: () => {
          gsap.to(".cta-content", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          })
        },
      })

      // Text reveal animations for section headings
      gsap.set(".section-heading", { opacity: 0, y: 30 })

      ScrollTrigger.batch(".section-heading", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          })
        },
      })

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      title: "Advanced AI Models",
      description:
        "Powered by state-of-the-art diffusion models including DALL-E, Midjourney-style, and Stable Diffusion for stunning image generation.",
      icon: "🧠",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Instant Generation",
      description:
        "Transform your text prompts into beautiful images in seconds. No waiting, no complex settings - just describe and create.",
      icon: "⚡",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Multiple Styles",
      description:
        "Choose from photorealistic, artistic, cartoon, digital art, and many other styles to match your creative vision perfectly.",
      icon: "🎨",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "High Resolution",
      description:
        "Generate crisp, high-quality images up to 4K resolution suitable for professional use, printing, and commercial projects.",
      icon: "📸",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  // Real examples based on popular AI image generation prompts and categories
  const examples = [
    {
      prompt: "A majestic dragon flying over a medieval castle at sunset, hyperrealistic, cinematic lighting",
      style: "Fantasy Art",
      color: "from-purple-400 to-pink-400",
      category: "Fantasy",
      technique: "DALL-E 3",
      popularity: "Popular",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Dragon+Castle&background=800080",
    },
    {
      prompt: "Modern minimalist living room with floor-to-ceiling windows, natural lighting, Scandinavian design",
      style: "Architecture",
      color: "from-blue-400 to-cyan-400",
      category: "Interior Design",
      technique: "Midjourney v6",
      popularity: "Trending",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Minimalist+Interior&background=4682B4",
    },
    {
      prompt: "Portrait of an elderly wizard with glowing blue eyes, detailed beard, magical staff, digital art",
      style: "Character Design",
      color: "from-green-400 to-emerald-400",
      category: "Characters",
      technique: "Stable Diffusion XL",
      popularity: "Featured",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Wizard+Portrait&background=2E8B57",
    },
    {
      prompt: "Cyberpunk cityscape at night with neon lights and flying vehicles, rain reflections, futuristic",
      style: "Sci-Fi",
      color: "from-indigo-400 to-purple-400",
      category: "Sci-Fi",
      technique: "Midjourney v6",
      popularity: "Most Used",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Cyberpunk+City&background=4B0082",
    },
    {
      prompt: "Adorable cartoon cat wearing a tiny top hat and monocle, Victorian style, watercolor painting",
      style: "Cartoon",
      color: "from-pink-400 to-rose-400",
      category: "Cartoon",
      technique: "DALL-E 3",
      popularity: "Community Choice",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Cartoon+Cat&background=FF69B4",
    },
    {
      prompt: "Abstract geometric mandala with vibrant colors, sacred geometry, spiritual art, high contrast",
      style: "Abstract Art",
      color: "from-yellow-400 to-orange-400",
      category: "Abstract",
      technique: "Adobe Firefly",
      popularity: "Artist's Pick",
      imageUrl: "/placeholder.svg?height=1024&width=1024&text=Abstract+Mandala&background=FF8C00",
    },
  ]

  return (
    <div className="bg-slate-900 min-h-screen text-white overflow-hidden">
      {/* Animated Background Elements - Image themed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-purple-500/5 rounded-lg blur-xl transform rotate-12" />
        <div className="floating-element absolute top-40 right-20 w-32 h-24 bg-blue-500/5 rounded-xl blur-2xl transform -rotate-6" />
        <div className="floating-element absolute bottom-40 left-1/4 w-16 h-16 bg-pink-500/5 rounded-lg blur-xl transform rotate-45" />
        <div className="floating-element absolute top-1/3 right-10 w-28 h-20 bg-indigo-500/5 rounded-xl blur-2xl transform rotate-12" />
        <div className="floating-element absolute bottom-20 right-1/3 w-24 h-24 bg-cyan-500/5 rounded-lg blur-xl transform -rotate-12" />
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
        <div className="relative z-10 max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="hero-word inline-block mr-4">Transform</span>
            <span className="hero-word inline-block mr-4">Your</span>
            <br className="hidden md:block" />
            <span className="hero-word inline-block mr-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Words
            </span>
            <span className="hero-word inline-block mr-4">into</span>
            <br className="hidden md:block" />
            <span className="hero-word inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Stunning Images
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most advanced AI image generator. Just describe what you want to see, and watch our AI bring your
            imagination to life in seconds.
          </p>

          {/* Demo Prompt Box */}
          <div className="demo-prompt bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-slate-400">Try this prompt:</span>
            </div>
            <p className="text-lg text-white font-medium italic">
              "A magical forest with glowing mushrooms and fireflies at twilight"
            </p>
          </div>

          <div className="hero-cta">
            <a
              href="/generate"
              className="group relative inline-flex items-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative">Start Creating</span>
              <svg
                className="relative ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="features-section relative py-24 px-6"
        style={{ background: "linear-gradient(to bottom, #581c87 0%, #1e1b4b 50%, #0f172a 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Powerful AI Image Generation
            </h2>
            <p className="section-heading text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the next generation of AI creativity with cutting-edge technology that understands your vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group relative cursor-pointer">
                <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                  />

                  <div className="feature-content relative z-10">
                    <div className="feature-icon text-3xl mb-4 inline-block">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section
        ref={examplesRef}
        className="examples-section relative py-24 px-6"
        style={{ background: "linear-gradient(to bottom, #0f172a 0%, #1e1b4b 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Endless Creative Possibilities
            </h2>
            <p className="section-heading text-xl text-slate-400 max-w-3xl mx-auto">
              From photorealistic portraits to fantastical landscapes - see what our AI can create from simple text
              prompts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <div key={index} className="example-card group relative cursor-pointer">
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 overflow-hidden">
                  {/* Image with enhanced styling */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={example.imageUrl || "/placeholder.svg"}
                      alt={example.style}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />

                    {/* Technique badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-semibold bg-black/40 text-white rounded-full backdrop-blur-sm">
                        {example.technique}
                      </span>
                    </div>
                    {/* Popularity badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-semibold bg-white/20 text-white rounded-full backdrop-blur-sm">
                        {example.popularity}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r ${example.color} text-white rounded-full opacity-80`}
                      >
                        {example.style}
                      </span>
                      <span className="text-xs text-slate-500">{example.category}</span>
                    </div>
                    <p className="text-white font-medium mb-3 text-sm leading-relaxed line-clamp-2">
                      "{example.prompt}"
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Generated in 2.8s</span>
                      <span>1024x1024</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Examples CTA */}
          <div className="text-center mt-12">
            <a
              href="/gallery"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white border-2 border-purple-500/50 rounded-full hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            >
              <span>View Full Gallery</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        ref={ctaRef}
        className="bottom-cta relative py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #7c3aed 100%)" }}
      >
        <div className="cta-content relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Ready to Create Magic?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join millions of creators who are already bringing their imagination to life with AI. Start generating
            stunning images today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/gallery"
              className="group inline-flex items-center px-10 py-4 text-lg font-bold text-purple-900 bg-white rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="relative">Start Generating</span>
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/gallery"
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:border-white/60 transition-all duration-300"
            >
              <span className="relative">View Gallery</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
