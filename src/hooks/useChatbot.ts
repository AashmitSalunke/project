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

  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return `Hey 👋 what's up?`;
  }

  if (lowerInput.includes("who") || lowerInput.includes("about")) {
    return `I’m Aashmit, studying Info Science Engg at RNSIT. Mostly into coding, projects, and just building stuff that interests me.`;
  }

  if (lowerInput.includes("github")) {
    return `Yeah, I’ve got my stuff on GitHub → ${PORTFOLIO_DATA.github}. You’ll see my web projects and some DSA practice there.`;
  }

  if (lowerInput.includes("skills") || lowerInput.includes("technologies")) {
    return `So tech-wise, I know ${PORTFOLIO_DATA.skills.programming.join(", ")}.  
I also mess around with web dev using ${PORTFOLIO_DATA.skills.web.join(", ")}.  
But honestly, I enjoy solving problems and building small projects more than just listing skills 😅.`;
  }

  if (lowerInput.includes("projects")) {
    return `I’ve done a couple:  
- **${PORTFOLIO_DATA.projects[0].name}** → ${PORTFOLIO_DATA.projects[0].description} (GitHub: ${PORTFOLIO_DATA.projects[0].github})  
- **${PORTFOLIO_DATA.projects[1].name}** → ${PORTFOLIO_DATA.projects[1].description} (GitHub: ${PORTFOLIO_DATA.projects[1].github})  

Nothing crazy, but I keep experimenting and learning through them.`;
  }

  if (lowerInput.includes("contact") || lowerInput.includes("email")) {
    return `You can just mail me at ${PORTFOLIO_DATA.email} or hit me up on LinkedIn → ${PORTFOLIO_DATA.linkedin}.`;
  }

  if (lowerInput.includes("college") || lowerInput.includes("education")) {
    return `I’m doing my Info Science Engg at ${PORTFOLIO_DATA.college}. College is fine, but I mostly focus on coding outside classes.`;
  }

  return `Hmm, not sure what you mean 😅. I can tell you about my skills, projects, college, or maybe share my GitHub — what do you wanna know?`;
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