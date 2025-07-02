
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Award, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Veri-Cert Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure, blockchain-verified digital certificates. Issue, verify, and manage educational credentials with unmatched security and authenticity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/issue">Issue Certificate</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/verify">Verify Certificate</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Blockchain Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every certificate is secured with SHA-256 hashing and blockchain verification
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Easy Issuance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create professional digital certificates in seconds with our intuitive interface
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Instant Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Verify any certificate instantly using its unique blockchain identifier
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Powered by modern web technologies for near-instant certificate operations
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Certificate</h3>
              <p className="text-gray-600">
                Fill in the certificate details including recipient, course, and issuer information
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Blockchain Storage</h3>
              <p className="text-gray-600">
                Certificate data is hashed and stored securely with a unique blockchain identifier
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Verify Anytime</h3>
              <p className="text-gray-600">
                Anyone can verify the certificate's authenticity using the provided certificate ID
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using Veri-Cert Hub to issue and verify authentic digital certificates.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/issue">Issue Your First Certificate</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/verify">Try Certificate Verification</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
