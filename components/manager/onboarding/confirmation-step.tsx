"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Mail, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function ConfirmationStep() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
        <p className="text-lg text-gray-600">
          Thank you for applying to become a service provider. Your application is now under review.
        </p>
      </div>

      {/* Status Cards */}
      <div className="space-y-4 mb-8">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Application Received</h3>
                <p className="text-sm text-green-700">
                  Your application has been successfully submitted and is in our review queue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Review in Progress</h3>
                <p className="text-sm text-blue-700">Our team will review your application within 3-5 business days.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Email Notification</h3>
                <p className="text-sm text-purple-700">
                  You'll receive an email once your application has been reviewed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Document Verification</h4>
                <p className="text-sm text-gray-600">We'll verify your identity documents and certifications.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Background Check</h4>
                <p className="text-sm text-gray-600">A third-party service will conduct your background check.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Reference Verification</h4>
                <p className="text-sm text-gray-600">We may contact your references to verify your work history.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Approval & Dashboard Access</h4>
                <p className="text-sm text-gray-600">
                  Once approved, you'll get access to your service provider dashboard.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link href="/">
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </Button>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Link href="/dashboard/service-provider">
            View Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Contact Info */}
      <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Have questions about your application?{" "}
          <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
