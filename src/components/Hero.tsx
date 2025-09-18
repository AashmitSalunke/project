import React from 'react';
import { Github, Mail, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-blue-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
         {/* Logo/Avatar */}
<div className="flex justify-center items-center mb-8">
  <img
    src="dp1.jpg"
    alt="Logo"
    className="w-20 h-20 rounded-full object-cover 
               animate-pulse 
               transition-transform duration-300 
               hover:scale-110 hover:rotate-6"
  />
</div>



          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block animate-fadeInUp">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Aashmit Salunke
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Information Science Engineering Student
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            Ask my AI assistant anything about my programming skills, web development projects, GitHub, or academic journey at RNS Institute of Technology. 
            Powered by Gemini Flash 2.0 for intelligent conversations about my portfolio.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <a
              href="#chat"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Start Conversation
            </a>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/aashmitsalunke"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-full hover:border-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              
              <a
                href="mailto:aashmitsalunke@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-full hover:border-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Contact
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-400">Programming Languages</div>
            </div>
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
              <div className="text-3xl font-bold text-white mb-2">3+</div>
              <div className="text-gray-400">Years Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};