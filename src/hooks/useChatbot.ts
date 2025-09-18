import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

// Portfolio Data
const PORTFOLIO_DATA = {
  name: "Aashmit Salunke",
  title: "Information Science Engineering Student",
  college: "RNS Institute of Technology",
  github: "https://github.com/aashmitsalunke",
  email: "aashmit.salunke@example.com",
  linkedin: "https://linkedin.com/in/aashmitsalunke",
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
      description: "Full-stack apps with Node.js + Express.js",
      tech: ["Node.js", "Express.js", "EJS", "JavaScript", "CSS"],
      github: "https://github.com/aashmitsalunke/web-projects"
    },
    {
      name: "Data Structures & Algorithms",
      description: "Implemented DSA concepts in Java & C++",
      tech: ["Core Java", "C++", "Python"],
      github: "https://github.com/aashmitsalunke/dsa-practice"
    }
  ]
};

// 🔹 Casual system prompt
const createSystemPrompt = () => `
You are speaking as Aashmit himself.
Keep replies short, casual, and human-like — like real chat messages.
Never say “I’m an AI assistant”. No intros unless asked “who are you”.

Info you can use:
- Name: ${PORTFOLIO_DATA.name}
- College: ${PORTFOLIO_DATA.college}
- Skills: ${PORTFOLIO_DATA.skills.programming.join(', ')}, web: ${PORTFOLIO_DATA.skills.web.join(', ')}, db: ${PORTFOLIO_DATA.skills.database.join(', ')}, tools: ${PORTFOLIO_DATA.skills.tools.join(', ')}
- Projects: ${PORTFOLIO_DATA.projects.map(p => `${p.name} (${p.github})`).join(' | ')}
- GitHub: ${PORTFOLIO_DATA.github}
- Email: ${PORTFOLIO_DATA.email}
- LinkedIn: ${PORTFOLIO_DATA.linkedin}

Rules:
1. Answer only what’s asked.
2. Keep it natural, short, and specific.
3. No formal tone. Example style:
   - Q: "skills?" → "Python, Java, C++, JS. Do web dev with Node + Express."
   - Q: "college?" → "RNSIT, Info Science Engg."
   - Q: "projects?" → "Few web apps + DSA practice. GitHub has details."
   - Q: "contact?" → "Mail: ${PORTFOLIO_DATA.email}, LinkedIn too."
`;

const generateAIResponse = async (input: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return generateFallbackResponse(input);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${createSystemPrompt()}\n\nUser: ${input}\nReply like Aashmit:`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return generateFallbackResponse(input);
  }
};

// 🔹 Super short fallback answers
const generateFallbackResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hey 👋";

  if (lower.includes("who"))
    return "I’m Aashmit, doing Info Science Engg at RNSIT.";

  if (lower.includes("github"))
    return `Check my GitHub → ${PORTFOLIO_DATA.github}`;

  if (lower.includes("skills"))
    return `Python, Java, C++, JS. Web dev with Node + Express.`;

  if (lower.includes("projects"))
    return `Built some web apps + DSA practice. GitHub’s got them.`;

  if (lower.includes("contact") || lower.includes("email"))
    return `Mail: ${PORTFOLIO_DATA.email}, LinkedIn: ${PORTFOLIO_DATA.linkedin}`;

  if (lower.includes("college"))
    return `RNSIT, Info Science Engg.`;

  return "Not sure what you mean 🤔. Wanna know about skills, projects, or GitHub?";
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey 👋 I’m Aashmit. Ask me about my skills, projects, or GitHub.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const responseText = await generateAIResponse(text);

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  }, []);

  return { messages, isTyping, sendMessage };
};
