import React from 'react';
import { Hero } from './components/Hero';
import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Chat Section */}
      <section id="chat" className="min-h-screen">
        <ChatInterface />
      </section>
    </div>
  );
}

export default App;