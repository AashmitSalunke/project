import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

// Your actual portfolio data
const PORTFOLIO_DATA = {
  name: "Aashmit Salunke",
  title: "Information Science Engineering Student",
  college: "RNS Institute of Technology",
  github: "https://github.com/aashmitsalunke", // Update with your actual GitHub
  email: "aashmit.salunke@example.com", // Update with your actual email
  linkedin: "https://linkedin.com/in/aashmitsalunke", // Update with your actual LinkedIn
  skills: {
    programming: ["Python", "Core Java", "C++", "C", "JavaScript"],
    web: ["HTML", "CSS", "Node.js", "Express.js", "EJS"],
    database: ["SQL"],
    tools: ["Git", "GitHub"],
    soft: ["Communication", "Analytical Skills"]
  },
  projects: [
    {
      name: "Web Development Projects",
      description: "Full-stack web applications using Node.js and Express.js",
      tech: ["Node.js", "Express.js", "EJS", "JavaScript", "CSS"],
      github: "https://github.com/aashmitsalunke/web-projects"
    },
    {
      name: "Data Structures & Algorithms",
      description: "Implementation of various DSA concepts in Java and C++",
      tech: ["Core Java", "C++", "Python"],
      github: "https://github.com/aashmitsalunke/dsa-practice"
    }
  ]
};

const createSystemPrompt = () => `
You are Aashmit Salunke's AI portfolio assistant. You should provide helpful, friendly, and informative responses about Aashmit's background, skills, and projects.

Key Information about Aashmit:
- Name: ${PORTFOLIO_DATA.name}
- Current Status: ${PORTFOLIO_DATA.title} at ${PORTFOLIO_DATA.college}
- Programming Languages: ${PORTFOLIO_DATA.skills.programming.join(', ')}
- Web Technologies: ${PORTFOLIO_DATA.skills.web.join(', ')}
- Database: ${PORTFOLIO_DATA.skills.database.join(', ')}
- Tools: ${PORTFOLIO_DATA.skills.tools.join(', ')}
- Soft Skills: ${PORTFOLIO_DATA.skills.soft.join(', ')}
- GitHub: ${PORTFOLIO_DATA.github}
- Email: ${PORTFOLIO_DATA.email}

Guidelines:
- Be conversational and friendly
- Provide specific details about Aashmit's skills and background
- Encourage visitors to check out his GitHub or contact him
- If asked about projects, mention his web development work and DSA practice
- Keep responses concise but informative
- Always be positive and professional
`;

const generateAIResponse = async (input: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return "I'm having trouble connecting to my AI brain right now. But I can tell you that Aashmit is a talented Information Science Engineering student at RNS Institute of Technology with strong skills in programming languages like Python, Java, C++, and web technologies like Node.js and Express.js!";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${createSystemPrompt()}\n\nUser question: ${input}\n\nPlease provide a helpful response about Aashmit Salunke:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return generateFallbackResponse(input);
  }
};

const generateFallbackResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return `Hello! 👋 I'm ${PORTFOLIO_DATA.name}'s AI assistant, powered by Gemini Flash 2.0. I'm here to tell you all about his skills, projects, and background as an Information Science Engineering student. What would you like to know?`;
  }
  
  if (lowerInput.includes('who') || lowerInput.includes('about')) {
    return `I'm ${PORTFOLIO_DATA.name}, an ${PORTFOLIO_DATA.title} at ${PORTFOLIO_DATA.college}. I'm passionate about programming and web development, with strong skills in languages like Python, Java, C++, and web technologies like Node.js and Express.js. I also have good analytical and communication skills!`;
  }
  
  if (lowerInput.includes('github')) {
    return `You can find ${PORTFOLIO_DATA.name}'s GitHub profile at: ${PORTFOLIO_DATA.github}\n\nHe has repositories showcasing his web development projects using Node.js and Express.js, as well as his practice with data structures and algorithms in Java and C++. Check it out to see his coding journey!`;
  }
  
  if (lowerInput.includes('skills') || lowerInput.includes('technologies')) {
    return `${PORTFOLIO_DATA.name} has a diverse skill set:\n\n🔹 Programming: ${PORTFOLIO_DATA.skills.programming.join(', ')}\n🔹 Web Development: ${PORTFOLIO_DATA.skills.web.join(', ')}\n🔹 Database: ${PORTFOLIO_DATA.skills.database.join(', ')}\n🔹 Tools: ${PORTFOLIO_DATA.skills.tools.join(', ')}\n🔹 Soft Skills: ${PORTFOLIO_DATA.skills.soft.join(', ')}\n\nHe's always learning and expanding his technical expertise!`;
  }
  
  if (lowerInput.includes('projects')) {
    return `Here are some of ${PORTFOLIO_DATA.name}'s notable projects:\n\n${PORTFOLIO_DATA.projects.map(project => 
      `🚀 ${project.name}\n${project.description}\nTech Stack: ${project.tech.join(', ')}\nGitHub: ${project.github}`
    ).join('\n\n')}\n\nHe's always working on new projects to improve his skills!`;
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('email')) {
    return `You can reach ${PORTFOLIO_DATA.name} at:\n📧 Email: ${PORTFOLIO_DATA.email}\n💼 LinkedIn: ${PORTFOLIO_DATA.linkedin}\n\nHe's always interested in discussing new opportunities, collaborations, or just talking about technology!`;
  }
  
  if (lowerInput.includes('college') || lowerInput.includes('education')) {
    return `${PORTFOLIO_DATA.name} is currently pursuing Information Science Engineering at ${PORTFOLIO_DATA.college}. He's building a strong foundation in computer science fundamentals while gaining practical experience through various programming projects and web development work.`;
  }
  
  return `That's a great question! I can tell you about ${PORTFOLIO_DATA.name}'s:\n• Programming skills (Python, Java, C++, JavaScript)\n• Web development experience (Node.js, Express.js)\n• GitHub projects and repositories\n• Educational background at RNS Institute of Technology\n• Contact information\n\nWhat specifically would you like to know more about?`;
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi there! 👋 I'm ${PORTFOLIO_DATA.name}'s AI assistant, powered by Gemini Flash 2.0. I can tell you all about his skills as an Information Science Engineering student, his programming projects, GitHub repositories, and much more. What would you like to know?`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate AI response
    const responseText = await generateAIResponse(text);

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  }, []);

  return { messages, isTyping, sendMessage };
};