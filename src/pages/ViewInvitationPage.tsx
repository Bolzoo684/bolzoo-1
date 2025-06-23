import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Hash, User, MessageSquare, Heart, ArrowLeft, Check, X } from 'lucide-react';
import { useInvitations, Invitation } from '../context/InvitationContext';

export default function ViewInvitationPage() {
  const { id } = useParams<{ id: string }>();
  const { getInvitation, sendResponse } = useInvitations();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    if (!id) return;
    getInvitation(id).then(inv => {
      setInvitation(inv || null);
      setLoading(false);
    });
  }, [id, getInvitation]);

  const handleResponse = async (response: 'accepted' | 'declined') => {
    if (!id || !invitation) return;
    
    setResponding(true);
    try {
      await sendResponse(id, response);
      // Хариулт амжилттай илгээгдсэн бол invitation state-г шинэчилнэ
      setInvitation(prev => prev ? { ...prev, response, responseDate: new Date().toISOString() } : null);
    } catch (error) {
      console.error('Хариулт илгээхэд алдаа гарлаа:', error);
      alert('Хариулт илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-gray-500">Уншиж байна...</div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Урилга олдсонгүй
            </h2>
            <p className="text-gray-600 mb-6">
              Энэ урилга устгагдсан эсвэл байхгүй байна
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-shadow"
            >
              Нүүр хуудас руу буцах
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Нүүр хуудас
          </Link>
        </div>

        {/* Invitation Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-rose-200">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 px-8 py-12 text-center text-white">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl font-bold mb-2">
              Болзооны урилга
            </h1>
            <p className="text-rose-100">
              Та урилгад оролцохыг урьж байна
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Greeting */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Эрхэм хүндэт {invitation.guestName}
              </h2>
              <p className="text-lg text-gray-700">
                Таныг дараах болзоонд урьж байна:
              </p>
            </div>

            {/* Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 p-4 bg-rose-50 rounded-xl">
                <MapPin className="h-6 w-6 text-rose-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Газар</h3>
                  <p className="text-gray-700">{invitation.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                <Calendar className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Огноо ба цаг</h3>
                  <p className="text-gray-700">
                    {formatDate(invitation.date)} - {formatTime(invitation.time)}
                  </p>
                </div>
              </div>

              {invitation.tableNumber && (
                <div className="flex items-start space-x-4 p-4 bg-pink-50 rounded-xl">
                  <Hash className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ширээний дугаар</h3>
                    <p className="text-gray-700">№{invitation.tableNumber}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                <User className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Урьсан</h3>
                  <p className="text-gray-700">{invitation.hostName}</p>
                </div>
              </div>

              {invitation.message && (
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-gradient bg-gradient-to-r from-rose-500 to-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Хувийн мессеж</h3>
                    <p className="text-gray-700 italic">"{invitation.message}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              
              {invitation.response ? (
                // Хариулт өгөгдсөн бол
                <div className="mb-6">
                  {invitation.response === 'accepted' ? (
                    <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
                      <Check className="h-5 w-5 mr-2" />
                      <span className="font-semibold">✅ Ирэх болно гэж хариулсан</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-800 rounded-full">
                      <X className="h-5 w-5 mr-2" />
                      <span className="font-semibold">❌ Ирж чадахгүй гэж хариулсан</span>
                    </div>
                  )}
                  {invitation.responseDate && (
                    <p className="text-sm text-gray-500 mt-2">
                      Хариулсан: {new Date(invitation.responseDate).toLocaleDateString('mn-MN')}
                    </p>
                  )}
                </div>
              ) : (
                // Хариулт өгөөгүй бол
                <>
                  <p className="text-lg text-gray-700 mb-6">
                    Тавтай морилно уу! ❤️
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => handleResponse('accepted')}
                      disabled={responding}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {responding ? 'Илгээж байна...' : '✅ Ирэх болно'}
                    </button>
                    <button 
                      onClick={() => handleResponse('declined')}
                      disabled={responding}
                      className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {responding ? 'Илгээж байна...' : '❌ Уучлаарай ирж чадахгүй'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500">
            Урилга үүсгэсэн: {new Date(invitation.createdAt).toLocaleDateString('mn-MN')}
          </div>
        </div>
      </div>
    </div>
  );
}