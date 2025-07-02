
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface VerificationResult {
  id: string;
  recipientName: string;
  courseName: string;
  issueDate: string;
  issuerName: string;
  hash: string;
  status: string;
  verified: boolean;
}

const CertificateVerifier = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a certificate ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/.netlify/functions/verify-cert?id=${encodeURIComponent(certificateId)}`);

      if (!response.ok) {
        throw new Error('Certificate not found or verification failed');
      }

      const result = await response.json();
      setVerificationResult(result);
      
      toast({
        title: result.verified ? "Certificate Verified!" : "Certificate Invalid",
        description: result.verified ? "This certificate is authentic and valid." : "This certificate could not be verified.",
        variant: result.verified ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Unable to verify certificate. Please check the ID and try again.",
        variant: "destructive"
      });
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Certificate</CardTitle>
          <CardDescription>Enter a certificate ID to verify its authenticity</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="certificateId">Certificate ID</Label>
              <Input
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID to verify..."
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Certificate'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationResult.verified ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Certificate Verified
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Certificate Invalid
                </>
              )}
            </CardTitle>
            <CardDescription>
              {verificationResult.verified 
                ? "This certificate is authentic and has been verified on the blockchain"
                : "This certificate could not be verified or may be fraudulent"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Certificate ID</Label>
                <div className="p-2 bg-gray-100 rounded font-mono text-sm break-all">
                  {verificationResult.id}
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <div className={`p-2 rounded text-sm font-medium ${
                  verificationResult.verified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {verificationResult.status.toUpperCase()}
                </div>
              </div>
              <div>
                <Label>Recipient</Label>
                <div className="p-2 bg-gray-100 rounded">
                  {verificationResult.recipientName}
                </div>
              </div>
              <div>
                <Label>Course</Label>
                <div className="p-2 bg-gray-100 rounded">
                  {verificationResult.courseName}
                </div>
              </div>
              <div>
                <Label>Issue Date</Label>
                <div className="p-2 bg-gray-100 rounded">
                  {verificationResult.issueDate}
                </div>
              </div>
              <div>
                <Label>Issuer</Label>
                <div className="p-2 bg-gray-100 rounded">
                  {verificationResult.issuerName}
                </div>
              </div>
            </div>
            <div>
              <Label>Blockchain Hash</Label>
              <div className="p-2 bg-gray-100 rounded font-mono text-sm break-all">
                {verificationResult.hash}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CertificateVerifier;
