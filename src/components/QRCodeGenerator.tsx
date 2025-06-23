import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  invitationId: string;
}

export default function QRCodeGenerator({ invitationId }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const invitationUrl = `${window.location.origin}/invitation/${invitationId}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, invitationUrl, {
            width: 256,
            margin: 2,
            color: {
              dark: '#1f2937',
              light: '#ffffff'
            }
          });
        }

        const dataUrl = await QRCode.toDataURL(invitationUrl, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1f2937',
            light: '#ffffff'
          }
        });
        setQRCodeUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [invitationUrl]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `invitation-${invitationId}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Болзооны урилга',
          text: 'Болзооны урилга илгээж байна',
          url: invitationUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="text-center">
      {/* QR Code Display */}
      <div className="bg-white p-6 rounded-xl shadow-inner mb-6 inline-block">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Share URL */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Урилгын холбоос:</p>
        <div className="flex items-center bg-gray-100 rounded-lg p-3 text-sm">
          <span className="flex-1 truncate text-gray-700">
            {invitationUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
            title="Хуулах"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
        {copied && (
          <p className="text-xs text-green-600 mt-1">
            ✅ Холбоос хуулагдлаа!
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          title="QR код татах"
        >
          <Download className="h-4 w-4 mr-2" />
          Татах
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          title="Хуваалцах"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Хуваалцах
        </button>
      </div>
    </div>
  );
}