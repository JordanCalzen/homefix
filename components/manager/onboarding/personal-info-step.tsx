"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, User, X } from "lucide-react"
import type { FormData } from "@/app/onboarding/page"

interface PersonalInfoStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export default function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateData({ profilePicture: file })
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const removeFile = () => {
    updateData({ profilePicture: null })
    setPreviewUrl(null)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Let's start with your basic information</h2>
        <p className="text-gray-600">This information will be used to create your service provider profile</p>
      </div>

      {/* Profile Picture Upload */}
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-6">
          <div className="text-center">
            {previewUrl ? (
              <div className="relative inline-block">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                  onClick={removeFile}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}

            <Label htmlFor="profile-picture" className="cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700">
                <Upload className="w-4 h-4" />
                <span className="font-medium">{previewUrl ? "Change Photo" : "Upload Profile Picture"}</span>
              </div>
            </Label>
            <Input id="profile-picture" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phoneNumber}
            onChange={(e) => updateData({ phoneNumber: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium text-gray-700">
            Physical Address *
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address including city, state, and postal code"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Why we need this information</h4>
            <p className="text-sm text-blue-700">
              Your personal information helps us verify your identity and allows customers to contact you for services.
              All information is kept secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
