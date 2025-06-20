"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, X, Shield } from "lucide-react"
import type { FormData } from "@/app/onboarding/page"

interface IdentityVerificationStepProps {
  data: FormData
  updateData: (data: Partial<FormData>) => void
}

export default function IdentityVerificationStep({ data, updateData }: IdentityVerificationStepProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateData({ idDocument: file })
      setFileName(file.name)
    }
  }

  const removeFile = () => {
    updateData({ idDocument: null })
    setFileName(null)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Identity Verification</h2>
        <p className="text-gray-600">We need to verify your identity to ensure the safety of our platform</p>
      </div>

      {/* ID Type Selection */}
      <div className="space-y-2">
        <Label htmlFor="idType" className="text-sm font-medium text-gray-700">
          Select ID Type *
        </Label>
        <Select value={data.idType} onValueChange={(value) => updateData({ idType: value })}>
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="Choose your ID type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="national-id">National ID</SelectItem>
            <SelectItem value="drivers-license">Driver's License</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ID Number */}
      <div className="space-y-2">
        <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">
          ID Number *
        </Label>
        <Input
          id="idNumber"
          placeholder="Enter your ID number"
          value={data.idNumber}
          onChange={(e) => updateData({ idNumber: e.target.value })}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Document Upload */}
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-6">
          <div className="text-center">
            {fileName ? (
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 truncate">{fileName}</p>
                  <p className="text-sm text-gray-500">Document uploaded successfully</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <Label htmlFor="id-document" className="cursor-pointer">
                  <div className="text-blue-600 hover:text-blue-700">
                    <span className="font-medium text-lg">Upload Government-Issued ID</span>
                    <p className="text-sm text-gray-500 mt-2">PDF, PNG, or JPEG (max 10MB)</p>
                  </div>
                </Label>
                <Input
                  id="id-document"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 mb-1">Your information is secure</h4>
            <p className="text-sm text-green-700">
              We use bank-level encryption to protect your personal documents. Your ID will only be used for
              verification purposes and will be stored securely according to our privacy policy.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">Document Requirements:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Clear, high-quality image or scan
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              All text must be clearly readable
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Document must not be expired
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Full document visible (no cropped edges)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
