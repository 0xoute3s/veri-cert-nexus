
const crypto = require('crypto-js');

// In a real application, this would be stored in a database
// For demo purposes, we'll use a simple in-memory store
const certificateStore = new Map();

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const certificateId = event.queryStringParameters?.id;
    
    if (!certificateId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Certificate ID is required' })
      };
    }

    // In a real application, you would fetch from database
    // For demo, we'll simulate verification
    const mockCertificate = {
      id: certificateId,
      recipientName: 'Demo User',
      courseName: 'Sample Course',
      issueDate: '2024-01-01',
      issuerName: 'Demo Institution',
      timestamp: new Date().toISOString(),
      verified: true
    };

    // Generate hash for verification
    const dataString = JSON.stringify({
      id: mockCertificate.id,
      recipientName: mockCertificate.recipientName,
      courseName: mockCertificate.courseName,
      issueDate: mockCertificate.issueDate,
      issuerName: mockCertificate.issuerName,
      timestamp: mockCertificate.timestamp
    });
    
    const hash = crypto.SHA256(dataString).toString();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...mockCertificate,
        hash,
        status: 'verified'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Verification failed' })
    };
  }
};
