
import CertificateVerifier from '@/components/CertificateVerifier';

const VerifyCertificate = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Verify Certificate</h1>
          <p className="text-xl text-muted-foreground">Authenticate digital certificates on the blockchain</p>
        </div>
        <CertificateVerifier />
      </div>
    </div>
  );
};

export default VerifyCertificate;
