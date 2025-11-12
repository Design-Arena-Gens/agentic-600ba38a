'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>
          🌿 Futuristic QR Code Generator
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Generate an AI image of a person reading a futuristic QR code in a nature landscape
        </p>

        <button
          onClick={generateImage}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 32px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'white',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          {loading ? '🎨 Generating Image...' : '✨ Generate Image'}
        </button>

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            color: '#c33'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {imageUrl && (
          <div style={{
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <img
              src={imageUrl}
              alt="Generated futuristic QR code scene"
              style={{
                maxWidth: '100%',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }}
            />
            <div style={{ marginTop: '16px' }}>
              <a
                href={imageUrl}
                download="futuristic-qr-code.png"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#059669'}
                onMouseLeave={(e) => e.target.style.background = '#10b981'}
              >
                📥 Download Image
              </a>
            </div>
          </div>
        )}
      </div>

      <footer style={{
        marginTop: '30px',
        color: 'white',
        textAlign: 'center',
        opacity: 0.9
      }}>
        <p>Powered by AI Image Generation</p>
      </footer>
    </div>
  );
}
