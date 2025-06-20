"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Video, X, Camera } from "lucide-react"
import type { FormData } from "@/app/onboarding/page"

interface PortfolioStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export default function PortfolioStep({ data, updateData }: PortfolioStepProps) {
  const [previews, setPreviews] = useState<Array<{ url: string; type: "image" | "video" }>>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      const fileType = file.type.startsWith("image/") ? "image" : "video"
      const newItem = { file, caption: "", type: fileType as "image" | "video" }

      const newPortfolioItems = [...data.portfolioItems, newItem]
      updateData({ portfolioItems: newPortfolioItems })

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviews((prev) => [...prev, { url, type: fileType as "image" | "video" }])
    })
  }

  const removeItem = (index: number) => {
    const newPortfolioItems = data.portfolioItems.filter((_, i) => i !== index)
    updateData({ portfolioItems: newPortfolioItems })

    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)
  }

  const updateCaption = (index: number, caption: string) => {
    const newPortfolioItems = data.portfolioItems.map((item, i) => (i === index ? { ...item, caption } : item))
    updateData({ portfolioItems: newPortfolioItems })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Portfolio Upload</h2>
        <p className="text-gray-600">Showcase your best work with photos and videos of completed projects</p>
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <Label htmlFor="portfolio-files" className="cursor-pointer">
              <div className="text-blue-600 hover:text-blue-700">
                <span className="font-medium text-lg">Upload Photos & Videos</span>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG, MP4, MOV (max 50MB each, up to 10 files)</p>
              </div>
            </Label>
            <Input
              id="portfolio-files"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Items */}
      {data.portfolioItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Your Portfolio Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.portfolioItems.map((item, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    {item.type === "image" ? (
                      <div className="relative">
                        <img
                          src={previews[index]?.url || "/placeholder.svg"}
                          alt={`Portfolio item ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          Image
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <video src={previews[index]?.url} className="w-full h-48 object-cover rounded-lg" controls />
                        <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </div>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 rounded-full w-6 h-6 p-0"
                      onClick={() => removeItem(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">Caption (Optional)</Label>
                    <Textarea
                      placeholder="Describe this project..."
                      value={item.caption}
                      onChange={(e) => updateCaption(index, e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[60px] text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Camera className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-900 mb-1">Portfolio Tips</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Upload high-quality, well-lit photos of your best work</li>
              <li>• Show before and after shots when possible</li>
              <li>• Include a variety of projects to demonstrate your skills</li>
              <li>• Add captions to explain the work performed</li>
              <li>• Videos can showcase complex projects or techniques</li>
            </ul>
          </div>
        </div>
      </div>

      {/* File Requirements */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">File Requirements:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Images:</h5>
              <ul className="space-y-1">
                <li>• JPG, PNG formats</li>
                <li>• Maximum 10MB per file</li>
                <li>• Minimum 800x600 resolution</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Videos:</h5>
              <ul className="space-y-1">
                <li>• MP4, MOV formats</li>
                <li>• Maximum 50MB per file</li>
                <li>• Maximum 2 minutes duration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
