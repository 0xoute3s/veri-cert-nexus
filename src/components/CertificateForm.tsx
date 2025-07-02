
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Certificate {
  id: string;
  recipientName: string;
  courseName: string;
  issueDate: string;
  issuerName: string;
  hash: string;
  verificationUrl: string;
}

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    courseName: '',
    issueDate: '',
    issuerName: ''
  });
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/issue-cert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to issue certificate');
      }

      const result = await response.json();
      setCertificate(result);
      
      toast({
        title: "Certificate Issued Successfully!",
        description: `Certificate ID: ${result.id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Issue New Certificate</CardTitle>
          <CardDescription>Create a blockchain-verified digital certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="issuerName">Issuer Name</Label>
                <Input
                  id="issuerName"
                  name="issuerName"
                  value={formData.issuerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Issuing Certificate...
                </>
              ) : (
                'Issue Certificate'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {certificate && (
        <Card>
          <CardHeader>
            <CardTitle>Certificate Issued Successfully!</CardTitle>
            <CardDescription>Your certificate has been created and secured on the blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Certificate ID (CID)</Label>
                <div className="p-2 bg-gray-100 rounded font-mono text-sm break-all">
                  {certificate.id}
                </div>
              </div>
              <div>
                <Label>SHA-256 Hash</Label>
                <div className="p-2 bg-gray-100 rounded font-mono text-sm break-all">
                  {certificate.hash}
                </div>
              </div>
            </div>
            <div>
              <Label>Verification URL</Label>
              <div className="p-2 bg-blue-50 rounded">
                <a 
                  href={certificate.verificationUrl} 
                  className="text-blue-600 hover:underline break-all"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {certificate.verificationUrl}
                </a>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <div className="p-4 bg-white border-2 border-gray-200 rounded">
                <div className="text-center text-sm text-gray-500 mb-2">QR Code</div>
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  QR Code for<br/>{certificate.id.substring(0, 10)}...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CertificateForm;
