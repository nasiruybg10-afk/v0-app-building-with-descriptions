import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About AL-MURATTAL NETWORK</h1>
            <p className="text-xl text-muted-foreground">
              Connecting the global Muslim community through verified Islamic education
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                AL-MURATTAL NETWORK is dedicated to creating a global ecosystem of verified Islamic educational
                institutions. We believe that quality Islamic education should be accessible, transparent, and
                trustworthy for families worldwide.
              </p>
              <p className="text-muted-foreground">
                Through our rigorous Know Your School (KYS) verification process, we ensure that every institution on
                our platform meets high standards of authenticity, safety, and educational excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's most trusted platform for Islamic education, connecting students, parents,
                educators, and institutions across continents while preserving the authentic teachings of the Qur'ān and
                Sunnah.
              </p>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">✅</span>
                  </div>
                  <CardTitle className="text-lg">Authenticity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every school undergoes rigorous verification to ensure authentic Islamic education
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <CardTitle className="text-lg">Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Building confidence through transparency and community-driven reviews
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <CardTitle className="text-lg">Global Unity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connecting the worldwide Muslim community through education
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">📚</span>
                  </div>
                  <CardTitle className="text-lg">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Promoting high standards in Islamic education worldwide
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Founded in Gombe, Nigeria, AL-MURATTAL NETWORK emerged from a simple observation: parents struggled to
                find trustworthy information about Islamic schools, and quality institutions lacked visibility to reach
                families who needed them.
              </p>
              <p className="text-muted-foreground">
                What started as a local directory has grown into a global platform serving thousands of schools across
                15 countries. Our team combines expertise in Islamic education, technology, and community building to
                create a platform that serves the entire Muslim educational ecosystem.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to facilitate connections between students and schools, organize educational events,
                enable charitable giving through Zakat calculations, and provide a space for community engagement
                through our public boards.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 p-8 bg-primary/5 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              Whether you're a school administrator, educator, parent, or supporter of Islamic education, there's a
              place for you in the AL-MURATTAL NETWORK community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/kys" className="inline-block">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">
                  Register Your School
                </button>
              </a>
              <a href="/contact" className="inline-block">
                <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
