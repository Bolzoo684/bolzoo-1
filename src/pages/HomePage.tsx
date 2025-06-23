import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, QrCode, Calendar, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Heart className="h-8 w-8 text-rose-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Болзооны урилгаа бүтээгээрэй  
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <QrCode className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Романтик урилга үүсгээрэй
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Болзооны урилгаа QR код болгон хялбар үүсгээрэй
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <Calendar className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Цаг, газар тохируулах</h3>
              <p className="text-sm text-gray-600">Хэзээ, хаана уулзахаа нарийвчлан оруулна уу</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <Heart className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Хувийн мессеж</h3>
              <p className="text-sm text-gray-600">Романтик мессежээ урилгадаа хавсаргана уу</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <QrCode className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">QR кодоор илгээх</h3>
              <p className="text-sm text-gray-600">Урилгаа QR код болгон хялбар хуваалцана уу</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Heart className="h-5 w-5 mr-2" />
            Урилга үүсгэх
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-rose-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            ❤️ Хайртай хүнтэйгээ цагийг үнэтэй өнгөрүүлээрэй
          </p>
        </div>
      </footer>
    </div>
  );
}