"use client"

import { useState, useEffect } from "react"
import { Search, Heart, Download, Share2, Eye, Grid3X3, LayoutGrid, X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: number
  title: string
  prompt: string
  category: string
  technique: string
  resolution: string
  style: string
  likes: number
  downloads: number
  color: string
  tags: string[]
  source: string
  aspectRatio: string
  imageUrl: string
  isLiked?: boolean
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())

  // Complete gallery data with diverse AI-generated image examples and hardcoded image URLs
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      title: "Majestic Mountain Landscape",
      prompt:
        "Snow-capped mountains reflected in a crystal clear alpine lake at sunrise, cinematic lighting, hyperrealistic",
      category: "Nature",
      technique: "DALL-E 3",
      resolution: "1024x1024",
      style: "Photorealistic",
      likes: 2847,
      downloads: 1204,
      color: "from-blue-400 to-purple-500",
      tags: ["mountains", "landscape", "sunrise", "lake"],
      source: "National Gallery Open Access",
      aspectRatio: "square",
      imageUrl: "/gallery/landscape.png",
    },
    {
      id: 2,
      title: "Cyberpunk Street Scene",
      prompt: "Neon-lit Tokyo street at night with rain reflections, cyberpunk aesthetic, detailed digital art",
      category: "Sci-Fi",
      technique: "Midjourney v6",
      resolution: "1024x1024",
      style: "Digital Art",
      likes: 3421,
      downloads: 890,
      color: "from-pink-400 to-cyan-400",
      tags: ["cyberpunk", "neon", "street", "rain"],
      source: "Metropolitan Museum Open Access",
      aspectRatio: "square",
      imageUrl: "/gallery/cyberpunk.png",
    },
    {
      id: 3,
      title: "Abstract Geometric Mandala",
      prompt: "Sacred geometry mandala with vibrant colors, fractal patterns, spiritual art, high contrast",
      category: "Abstract",
      technique: "Stable Diffusion XL",
      resolution: "1024x1024",
      style: "Abstract",
      likes: 1923,
      downloads: 756,
      color: "from-orange-400 to-pink-500",
      tags: ["mandala", "geometry", "fractal", "spiritual"],
      source: "Smithsonian Open Access",
      aspectRatio: "square",
      imageUrl: "/gallery/mandala.png",
    },
    {
      id: 4,
      title: "Steampunk Airship Adventure",
      prompt: "Victorian steampunk airship flying through cloudy skies, brass and copper details, adventure aesthetic",
      category: "Steampunk",
      technique: "Midjourney v6",
      resolution: "1536x1024",
      style: "Concept Art",
      likes: 2156,
      downloads: 934,
      color: "from-amber-400 to-orange-500",
      tags: ["steampunk", "airship", "victorian", "adventure"],
      source: "Library of Congress",
      aspectRatio: "square",
      imageUrl: "/gallery/fireship.png",
    },
    {
      id: 5,
      title: "Mystical Forest Portal",
      prompt: "Enchanted forest with glowing portal, magical creatures, ethereal lighting, fantasy art style",
      category: "Fantasy",
      technique: "DALL-E 3",
      resolution: "1024x1536",
      style: "Fantasy Art",
      likes: 4102,
      downloads: 1567,
      color: "from-green-400 to-emerald-500",
      tags: ["forest", "portal", "magic", "fantasy"],
      source: "British Museum Collection",
      aspectRatio: "square",
      imageUrl: "/gallery/forest.png",
    },
    {
      id: 6,
      title: "Minimalist Architecture",
      prompt: "Modern minimalist house with clean lines, glass walls, surrounded by nature, architectural photography",
      category: "Architecture",
      technique: "Stable Diffusion XL",
      resolution: "1792x1024",
      style: "Architectural",
      likes: 1834,
      downloads: 723,
      color: "from-slate-400 to-gray-500",
      tags: ["architecture", "minimalist", "modern", "glass"],
      source: "Getty Open Content",
      aspectRatio: "square",
      imageUrl: "/gallery/architect.png",
    },
    {
      id: 7,
      title: "Cosmic Nebula Dreams",
      prompt: "Colorful space nebula with stars and cosmic dust, deep space photography style, vibrant colors",
      category: "Space",
      technique: "Midjourney v6",
      resolution: "1024x1024",
      style: "Space Art",
      likes: 3567,
      downloads: 1289,
      color: "from-purple-500 to-blue-600",
      tags: ["space", "nebula", "cosmic", "stars"],
      source: "NASA Image Gallery",
      aspectRatio: "square",
      imageUrl: "/gallery/Cosmic.png",
    },
    {
      id: 8,
      title: "Vintage Car Collection",
      prompt: "Classic 1960s muscle cars in a vintage garage, warm lighting, nostalgic atmosphere, detailed rendering",
      category: "Automotive",
      technique: "DALL-E 3",
      resolution: "1536x1024",
      style: "Photorealistic",
      likes: 2234,
      downloads: 845,
      color: "from-red-400 to-orange-500",
      tags: ["vintage", "cars", "garage", "classic"],
      source: "Automotive Heritage Foundation",
      aspectRatio: "square",
      imageUrl: "/gallery/classicar.png",
    },
    {
      id: 9,
      title: "Underwater Coral Paradise",
      prompt: "Vibrant coral reef with tropical fish, underwater photography, crystal clear water, marine life",
      category: "Nature",
      technique: "Stable Diffusion XL",
      resolution: "1024x1536",
      style: "Nature Photography",
      likes: 2891,
      downloads: 1156,
      color: "from-teal-400 to-blue-500",
      tags: ["underwater", "coral", "fish", "ocean"],
      source: "Ocean Conservancy Archive",
      aspectRatio: "square",
      imageUrl: "/gallery/under-water.png",
    },
    {
      id: 10,
      title: "Art Deco Cityscape",
      prompt: "1920s Art Deco skyscrapers at golden hour, geometric patterns, vintage luxury, cinematic composition",
      category: "Architecture",
      technique: "Midjourney v6",
      resolution: "1024x1536",
      style: "Art Deco",
      likes: 1967,
      downloads: 678,
      color: "from-yellow-400 to-amber-500",
      tags: ["art deco", "skyscrapers", "1920s", "golden hour"],
      source: "Metropolitan Museum Archive",
      aspectRatio: "square",
      imageUrl: "/gallery/cityscape.png",
    },
    {
      id: 11,
      title: "Robotic Future Warrior",
      prompt: "Futuristic robot warrior with glowing blue energy, metallic armor, sci-fi battle scene, dynamic pose",
      category: "Sci-Fi",
      technique: "DALL-E 3",
      resolution: "1024x1536",
      style: "Concept Art",
      likes: 3789,
      downloads: 1423,
      color: "from-blue-500 to-indigo-600",
      tags: ["robot", "warrior", "futuristic", "sci-fi"],
      source: "Science Fiction Museum",
      aspectRatio: "square",
      imageUrl: "/gallery/robot.png",
    },
    {
      id: 12,
      title: "Tropical Beach Paradise",
      prompt: "Pristine tropical beach with palm trees, turquoise water, white sand, paradise vacation vibes",
      category: "Nature",
      technique: "Stable Diffusion XL",
      resolution: "1792x1024",
      style: "Travel Photography",
      likes: 4156,
      downloads: 1834,
      color: "from-cyan-400 to-teal-500",
      tags: ["beach", "tropical", "paradise", "vacation"],
      source: "Travel Photography Archive",
      aspectRatio: "square",
      imageUrl: "/gallery/parad.png",
    },
  ]

  const categories = [
    "all",
    "Nature",
    "Sci-Fi",
    "Abstract",
    "Fantasy",
    "Architecture",
    "Space",
    "Automotive",
    "Steampunk",
  ]

  // Filter images based on category and search term
  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId)
      } else {
        newLiked.add(imageId)
      }
      return newLiked
    })
  }

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex])
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "Escape") {
        closeImageModal()
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImage, filteredImages])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Gallery
              </h1>
              <p className="text-slate-400 mt-1">{filteredImages.length} stunning AI-generated images</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search images, prompts, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 w-full sm:w-80"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "masonry" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          }`}
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`group relative cursor-pointer ${viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}`}
              onClick={() => openImageModal(image)}
            >
              <div className="relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02]">
                {/* Image */}
                <div
                  className={`relative ${
                    image.aspectRatio === "wide"
                      ? "aspect-video"
                      : image.aspectRatio === "tall"
                        ? "aspect-[3/4]"
                        : "aspect-square"
                  } overflow-hidden`}
                >
                  <img
                    src={image.imageUrl || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(image.id)
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          likedImages.has(image.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Technique Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-semibold bg-black/60 text-white rounded-full backdrop-blur-sm">
                      {image.technique}
                    </span>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-1">{image.title}</h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">"{image.prompt}"</p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {image.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {image.downloads.toLocaleString()}
                      </span>
                    </div>
                    <span>{image.resolution}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {image.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-full flex flex-col lg:flex-row bg-slate-900 rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors lg:right-80"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative max-w-full max-h-full rounded-lg overflow-hidden">
                <img
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>

            {/* Image Details */}
            <div className="lg:w-80 p-6 bg-slate-800 overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedImage.title}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Prompt</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">"{selectedImage.prompt}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">Technique</h3>
                    <p className="text-sm text-slate-400">{selectedImage.technique}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">Style</h3>
                    <p className="text-sm text-slate-400">{selectedImage.style}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">Resolution</h3>
                    <p className="text-sm text-slate-400">{selectedImage.resolution}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">Category</h3>
                    <p className="text-sm text-slate-400">{selectedImage.category}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {selectedImage.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {selectedImage.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {(selectedImage.likes * 3.2).toFixed(0)}k
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                      likedImages.has(selectedImage.id)
                        ? "bg-red-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedImages.has(selectedImage.id) ? "fill-current" : ""}`} />
                    {likedImages.has(selectedImage.id) ? "Liked" : "Like"}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
