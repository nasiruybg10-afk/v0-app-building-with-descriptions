import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  AL-MURATTAL NETWORK ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  platform.
                </p>
                <p>
                  By using AL-MURATTAL NETWORK, you agree to the collection and use of information in accordance with
                  this policy. If you do not agree with our policies and practices, please do not use our platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="mb-2">We may collect the following personal information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>School registration and verification documents</li>
                    <li>Payment and donation information</li>
                    <li>Event registration details</li>
                    <li>User-generated content (reviews, board posts)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                  <p className="mb-2">When you use our platform, we automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use the collected information for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing and maintaining our platform services</li>
                  <li>Processing school verifications and registrations</li>
                  <li>Facilitating event registrations and donations</li>
                  <li>Sending notifications and updates about your account</li>
                  <li>Improving user experience and platform functionality</li>
                  <li>Preventing fraud and ensuring platform security</li>
                  <li>Complying with legal obligations</li>
                  <li>Communicating with you about services and support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">With Schools:</strong> When you register for events or make
                    inquiries
                  </li>
                  <li>
                    <strong className="text-foreground">Service Providers:</strong> Third-party vendors who assist in
                    platform operations
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect
                    rights and safety
                  </li>
                  <li>
                    <strong className="text-foreground">Business Transfers:</strong> In connection with mergers or
                    acquisitions
                  </li>
                  <li>
                    <strong className="text-foreground">With Your Consent:</strong> When you explicitly authorize
                    sharing
                  </li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal
                  information, including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure payment processing through trusted providers</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your
                  information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Export your data in a portable format</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at almurattalinstitute@gmail.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookie
                  preferences through your browser settings. Note that disabling cookies may affect platform
                  functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our platform is not intended for children under 13. We do not knowingly collect personal information
                  from children. If you believe we have collected information from a child, please contact us
                  immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Your information may be transferred to and processed in countries other than your country of
                  residence. We ensure appropriate safeguards are in place for such transfers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy periodically. We will notify you of significant changes by posting
                  the new policy on this page and updating the "Last updated" date. Your continued use of the platform
                  after changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong className="text-foreground">Email:</strong> almurattalinstitute@gmail.com
                  </p>
                  <p>
                    <strong className="text-foreground">Phone:</strong> +234 803 458 5973
                  </p>
                  <p>
                    <strong className="text-foreground">Address:</strong> M07 Western Transformer Line, Bomala Quarters,
                    Gombe State, Nigeria
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
