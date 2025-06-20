"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Shield,
  Award,
  Briefcase,
  CreditCard,
  Camera,
  FileCheck,
  Settings,
  Edit,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import type { FormData } from "@/app/onboarding/page"

interface PreviewStepProps {
  data: FormData
  onEdit: (step: number) => void
}

export default function PreviewStep({ data, onEdit }: PreviewStepProps) {
  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Personal Info
        return !!(data.fullName && data.phoneNumber && data.email && data.address)
      case 1: // Identity Verification
        return !!(data.idType && data.idNumber && data.idDocument)
      case 2: // Certifications
        return !!data.certificationType
      case 3: // Experience
        return !!(data.yearsExperience && data.pastRoles && data.references[0]?.name)
      case 4: // Banking
        return !!(data.payoutPreference && (data.bankName || data.mobileMoney))
      case 5: // Portfolio
        return data.portfolioItems.length > 0
      case 6: // Background Check
        return data.backgroundCheckConsent
      case 7: // Additional Details
        return true // All optional
      default:
        return false
    }
  }

  const completedSteps = Array.from({ length: 8 }, (_, i) => isStepComplete(i)).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileCheck className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">Please review all information before submitting your application</p>
      </div>

      {/* Completion Status */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Application Progress</h3>
              <p className="text-sm text-gray-600">{completedSteps} of 8 sections completed</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round((completedSteps / 8) * 100)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Personal Information</CardTitle>
            {isStepComplete(0) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(0)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Full Name:</span>
              <p className="text-gray-900">{data.fullName || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>
              <p className="text-gray-900">{data.phoneNumber || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-gray-900">{data.email || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Profile Picture:</span>
              <p className="text-gray-900">{data.profilePicture ? "Uploaded" : "Not uploaded"}</p>
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Address:</span>
            <p className="text-gray-900 text-sm">{data.address || "Not provided"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Identity Verification */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Identity Verification</CardTitle>
            {isStepComplete(1) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">ID Type:</span>
              <p className="text-gray-900">{data.idType || "Not selected"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">ID Number:</span>
              <p className="text-gray-900">{data.idNumber || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">ID Document:</span>
              <p className="text-gray-900">{data.idDocument ? "Uploaded" : "Not uploaded"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Certifications & Licenses</CardTitle>
            {isStepComplete(2) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Primary Trade:</span>
              <p className="text-gray-900">{data.certificationType || "Not selected"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">License Number:</span>
              <p className="text-gray-900">{data.licenseNumber || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Issuing Authority:</span>
              <p className="text-gray-900">{data.issuingAuthority || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Certificates:</span>
              <p className="text-gray-900">{data.certificates.length} uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Work Experience</CardTitle>
            {isStepComplete(3) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Years of Experience:</span>
              <p className="text-gray-900">{data.yearsExperience || "Not selected"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">References:</span>
              <p className="text-gray-900">{data.references.filter((ref) => ref.name).length} provided</p>
            </div>
          </div>
          {data.pastRoles && (
            <div>
              <span className="font-medium text-gray-700">Experience Summary:</span>
              <p className="text-gray-900 text-sm mt-1">{data.pastRoles.substring(0, 150)}...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Banking */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Banking Information</CardTitle>
            {isStepComplete(4) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Payout Method:</span>
              <p className="text-gray-900">{data.payoutPreference || "Not selected"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Bank Name:</span>
              <p className="text-gray-900">{data.bankName || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Account Holder:</span>
              <p className="text-gray-900">{data.accountHolderName || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Mobile Money:</span>
              <p className="text-gray-900">{data.mobileMoney || "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Portfolio</CardTitle>
            {isStepComplete(5) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(5)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Portfolio Items:</span>
            <p className="text-gray-900">{data.portfolioItems.length} items uploaded</p>
          </div>
        </CardContent>
      </Card>

      {/* Background Check */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Background Check</CardTitle>
            {isStepComplete(6) ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(6)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Consent Given:</span>
            <p className="text-gray-900">{data.backgroundCheckConsent ? "Yes" : "No"}</p>
            {data.policeDocument && <p className="text-gray-600 mt-1">Police clearance document uploaded</p>}
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Additional Details</CardTitle>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(7)}>
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Languages:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.languages.length > 0 ? (
                  data.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">None specified</p>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Work Radius:</span>
              <p className="text-gray-900">{data.workRadius || "Not specified"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="font-semibold text-blue-900 mb-2">Ready to Submit?</h3>
          <p className="text-sm text-blue-700 mb-4">
            Once you submit your application, our team will review it within 3-5 business days. You'll receive an email
            notification once the review is complete.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
            <CheckCircle className="w-4 h-4" />
            <span>All required information has been provided</span>
          </div>
        </div>
      </div>
    </div>
  )
}
