import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, MapPin, User, MessageSquare, Hash, QrCode, ChevronDown, Phone } from 'lucide-react';
import { useInvitations } from '../context/InvitationContext';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function CreateInvitationPage() {
  const navigate = useNavigate();
  const { addInvitation } = useInvitations();
  const [showQR, setShowQR] = useState(false);
  const [invitationId, setInvitationId] = useState<string>('');
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [messageType, setMessageType] = useState<'predefined' | 'custom'>('predefined');
  
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    time: '',
    tableNumber: '',
    guestName: '',
    hostName: '',
    email: '',
    message: ''
  });

  // Бэлэн мессежүүд
  const predefinedMessages = [
    'Таньтай уулзхыг хүсч байна 💕',
    'Хамтдаа цагийг  өнгөрүүлье 💕',
    'Таныг хүлээж байна 🌹',
    'Романтик орой байх болно ✨',
    'Хамтдаа сайхан цагийг өнгөрүүлье 💫',
    
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMessageSelect = (message: string) => {
    setFormData({
      ...formData,
      message
    });
    setShowMessageOptions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await addInvitation(formData);
    setInvitationId(id);
    setShowQR(true);
  };

  // Ширээний дугаар заавал бөглөхгүй, бусад нь заавал
  const isFormValid = formData.location.trim() !== '' && 
                     formData.date !== '' && 
                     formData.time !== '' && 
                     formData.guestName.trim() !== '' && 
                     formData.hostName.trim() !== '' && 
                     formData.email.trim() !== '' &&
                     formData.message.trim() !== '';

  if (showQR) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-rose-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full mb-4">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Урилга бэлэн боллоо! 🎉
              </h2>
              <p className="text-gray-600">
                QR кодыг скан хийж урилгаа харна уу
              </p>
            </div>

            <QRCodeGenerator invitationId={invitationId} />

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowQR(false);
                  setFormData({
                    location: '',
                    date: '',
                    time: '',
                    tableNumber: '',
                    guestName: '',
                    hostName: '',
                    email: '',
                    message: ''
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Шинэ урилга
              </button>
              <Link
                to="/"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow text-center"
              >
                Нүүр хуудас
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Буцах
          </Link>
          <div className="text-center">
            <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Болзооны урилга үүсгэх
            </h1>
            <p className="text-gray-600">
              Дэлгэрэнгүй мэдээллээ оруулна уу
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-rose-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2 text-rose-500" />
                Болзооны газар
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="жишээ: Том н Томс кофе, Зайсан"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-rose-500" />
                  Огноо
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-rose-500" />
                  Цаг
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Table Number - Optional */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Hash className="h-4 w-4 mr-2 text-rose-500" />
                Ширээний дугаар <span className="text-gray-400 text-xs ml-1">(сонгохгүй байж болно)</span>
              </label>
              <input
                type="text"
                name="tableNumber"
                value={formData.tableNumber}
                onChange={handleInputChange}
                placeholder="жишээ: 5 (сонгохгүй байж болно)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
              />
            </div>

            {/* Names */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-rose-500" />
                  Таны нэр
                </label>
                <input
                  type="text"
                  name="hostName"
                  value={formData.hostName}
                  onChange={handleInputChange}
                  placeholder="Урьж байгаа хүний нэр"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-rose-500" />
                  Урих хүний нэр
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  placeholder="Урих гэж байгаа хүний нэр"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <svg className="h-4 w-4 mr-2 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1m8 0V7a4 4 0 00-8 0v5"></path></svg>
                Email хаяг (өөрийн)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="жишээ: example@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                required
              />
            </div>

            {/* Message with predefined options */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-rose-500" />
                Хувийн мессеж
              </label>
              
              {/* Message type selector */}
              <div className="flex space-x-2 mb-3">
                <button
                  type="button"
                  onClick={() => setMessageType('predefined')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    messageType === 'predefined'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Бэлэн мессеж сонгох
                </button>
                <button
                  type="button"
                  onClick={() => setMessageType('custom')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    messageType === 'custom'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Өөрийн үгийг бичих
                </button>
              </div>

              {messageType === 'predefined' ? (
                // Predefined message selector
                <div className="relative mb-3">
                  <button
                    type="button"
                    onClick={() => setShowMessageOptions(!showMessageOptions)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors bg-white flex items-center justify-between"
                  >
                    <span className={formData.message ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.message || 'Бэлэн мессеж сонгох...'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showMessageOptions ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showMessageOptions && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {predefinedMessages.map((message, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleMessageSelect(message)}
                          className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          {message}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Custom message input
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Өөрсдөө мессежээ бичнэ үү..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors resize-none"
                  required
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Heart className="h-5 w-5 inline mr-2" />
              Урилга үүсгэх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}