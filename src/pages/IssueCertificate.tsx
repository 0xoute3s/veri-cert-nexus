
import CertificateForm from '@/components/CertificateForm';

const IssueCertificate = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Issue Certificate</h1>
          <p className="text-xl text-muted-foreground">Create blockchain-verified digital certificates</p>
        </div>
        <CertificateForm />
      </div>
    </div>
  );
};

export default IssueCertificate;
