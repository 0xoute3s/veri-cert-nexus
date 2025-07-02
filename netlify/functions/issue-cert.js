
const crypto = require('crypto-js');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { recipientName, courseName, issueDate, issuerName } = JSON.parse(event.body);

    // Generate certificate ID
    const certificateId = crypto.lib.WordArray.random(16).toString();
    
    // Create certificate data
    const certificateData = {
      id: certificateId,
      recipientName,
      courseName,
      issueDate,
      issuerName,
      timestamp: new Date().toISOString()
    };

    // Generate hash (simplified blockchain concept)
    const dataString = JSON.stringify(certificateData);
    const hash = crypto.SHA256(dataString).toString();
    
    // In a real application, you would store this in a database
    // For now, we'll return the certificate with hash
    const certificate = {
      ...certificateData,
      hash,
      verificationUrl: `${process.env.URL || 'http://localhost:8080'}/verify/${certificateId}`
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(certificate)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to issue certificate' })
    };
  }
};
