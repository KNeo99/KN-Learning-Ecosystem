import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Award, Target, BookOpen, TrendingUp, Zap, ChevronRight } from 'lucide-react';

const AILearningEcosystem = () => {
  // State Management
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [transcription, setTranscription] = useState('');
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Lesson Structure
  const lessons = [
    {
      id: 1,
      title: "What is AI?",
      concept: "Artificial Intelligence Basics",
      description: "Understanding the fundamentals of AI",
      questions: [
        "What is Artificial Intelligence?",
        "Can you name a type of AI that learns from past data?",
        "What's the difference between Reactive AI and Generative AI?"
      ]
    },
    {
      id: 2,
      title: "AI in Everyday Life",
      concept: "Real-world AI Applications",
      description: "Discovering AI in your daily activities",
      questions: [
        "Name three AI systems you use daily",
        "How does a voice assistant work?",
        "What AI powers your social media feed?"
      ]
    },
    {
      id: 3,
      title: "Introduction to Prompting",
      concept: "Effective AI Communication",
      description: "Learning to communicate with AI systems",
      questions: [
        "What makes a good prompt?",
        "Try creating a prompt to ask AI about weather",
        "How can you make your prompts more specific?"
      ]
    }
  ];

  const badgesList = [
    { id: 'novice', name: 'AI Novice', points: 100, icon: '🌱' },
    { id: 'explorer', name: 'AI Explorer', points: 250, icon: '🔍' },
    { id: 'prompt_master', name: 'Prompt Master', points: 500, icon: '⚡' },
    { id: 'ai_champion', name: 'AI Champion', points: 1000, icon: '🏆' }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Welcome message
    addAIMessage("Welcome to your AI Learning Journey! 🎓 I'm your AI Instructor. Let's start by exploring what Artificial Intelligence really is. Are you ready to begin?");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Badge checking
  useEffect(() => {
    badgesList.forEach(badge => {
      if (points >= badge.points && !badges.find(b => b.id === badge.id)) {
        setBadges([...badges, badge]);
        addAIMessage(`🎉 Congratulations! You've earned the ${badge.icon} ${badge.name} badge!`);
      }
    });
  }, [points]);

  const addAIMessage = (text, shouldSpeak = true) => {
    setMessages(prev => [...prev, { type: 'ai', text, timestamp: new Date() }]);
    if (shouldSpeak) {
      speak(text);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Wait a moment before speaking to ensure cancellation is complete
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for voice features.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscription('Listening...');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        setTranscription('');
        alert('Could not start voice recognition. Please try again or use text input.');
      }
    }
  };

  const processUserInput = (text) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setInputText('');
    setTranscription('');

    // Award points for participation
    const earnedPoints = Math.floor(Math.random() * 20) + 10;
    setPoints(prev => prev + earnedPoints);

    // Simple AI response logic
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = '';

      // Lesson 1 responses
      if (lowerText.includes('ready') || lowerText.includes('yes') || lowerText.includes('start')) {
        response = "Excellent! Let's dive in. 🚀\n\nArtificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence. There are different types:\n\n• **Reactive AI**: Responds to current situations\n• **Limited Memory AI**: Learns from past data\n• **Generative AI**: Creates new content\n\nNow, here's your first question: Which type of AI learns from past data to improve its performance?";
        setUserProgress(20);
      } else if (lowerText.includes('limited memory') || lowerText.includes('memory')) {
        response = `Perfect! 🎯 You're absolutely right! Limited Memory AI learns from historical data to make better decisions.\n\n+${earnedPoints} points!\n\nLet's continue: Can you think of an example of AI you use in your everyday life?`;
        setUserProgress(40);
      } else if (lowerText.includes('assistant') || lowerText.includes('siri') || lowerText.includes('alexa') || lowerText.includes('chatbot')) {
        response = `Excellent example! 🌟 Voice assistants and chatbots are great examples of AI in daily life.\n\n+${earnedPoints} points!\n\nNow let's talk about prompting. A good prompt is:\n• Clear and specific\n• Provides context\n• States the desired format\n\nTry creating a prompt to ask an AI about tomorrow's weather!`;
        setUserProgress(60);
        setStreak(prev => prev + 1);
      } else if (lowerText.includes('weather') || lowerText.includes('forecast')) {
        response = `Great job! 🎉 You're getting the hang of prompting!\n\n+${earnedPoints} points!\n\nA good weather prompt might be: "What's the weather forecast for tomorrow in [city]?"\n\nYou've completed the beginner lessons! Keep practicing to unlock more advanced challenges.`;
        setUserProgress(100);
        setCurrentLesson(prev => Math.min(prev + 1, lessons.length - 1));
      } else if (lowerText.includes('help') || lowerText.includes('hint')) {
        response = "No problem! Think about the key concepts we just discussed. If you're stuck, try rephrasing your answer or ask me to repeat the question. You've got this! 💪";
      } else {
        response = `Interesting response! Let me give you some feedback: ${
          lowerText.length > 50 
            ? "You're being detailed, which is great! Try to focus on the key concept." 
            : "Good thinking! Can you elaborate a bit more?"
        }\n\n+${earnedPoints} points for participating!`;
      }

      addAIMessage(response);
    }, 1000);
  };

  const handleSend = () => {
    processUserInput(inputText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Repeat', action: () => addAIMessage("Let me repeat: " + messages.filter(m => m.type === 'ai').slice(-2)[0]?.text) },
    { label: 'Hint', action: () => addAIMessage("Here's a hint: Think about AI systems that remember your preferences or past interactions!") },
    { label: 'Next Topic', action: () => {
      if (currentLesson < lessons.length - 1) {
        setCurrentLesson(prev => prev + 1);
        addAIMessage(`Great! Moving to ${lessons[currentLesson + 1].title}. ${lessons[currentLesson + 1].description}`);
      }
    }}
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Panel 1: Instructor Chat */}
      <div className="w-1/2 flex flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-7 h-7" />
            AI Instructor Chat
          </h1>
          <p className="text-blue-100 text-sm mt-1">Your interactive learning companion</p>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none shadow-sm'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Voice Transcription Display */}
        {transcription && (
          <div className="px-6 py-2 bg-yellow-50 border-t border-yellow-200">
            <p className="text-sm text-yellow-800">
              <Mic className="w-4 h-4 inline mr-2" />
              {transcription}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3 items-end">
            <button
              onClick={toggleListening}
              className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white shadow-lg`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use the microphone..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                rows="2"
              />
            </div>
            <button
              onClick={handleSend}
              className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Panel 2: Learning Dashboard */}
      <div className="w-1/2 flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 p-8 overflow-y-auto">
        {/* Current Lesson */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Current Lesson</h2>
              <p className="text-sm text-gray-600">Master the fundamentals</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4">
            <h3 className="font-bold text-lg text-indigo-900">{lessons[currentLesson].title}</h3>
            <p className="text-indigo-700 text-sm mt-1">{lessons[currentLesson].concept}</p>
          </div>
        </div>

        {/* Progress Bar & Streak */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-800">Your Progress</h3>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{userProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${userProgress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-orange-600">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">{streak} Day Streak! 🔥</span>
          </div>
        </div>

        {/* Gamification Zone */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Total Points</p>
            <p className="text-4xl font-bold text-orange-600">{points}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Earned Badges</h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {badges.map(badge => (
                  <div key={badge.id} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 text-center">
                    <span className="text-3xl">{badge.icon}</span>
                    <p className="text-xs font-semibold text-gray-800 mt-1">{badge.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Keep learning to earn badges!</p>
            )}
          </div>
        </div>

        {/* Concept Library */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Learning Path
          </h2>
          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <div 
                key={lesson.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  idx === currentLesson 
                    ? 'border-blue-500 bg-blue-50' 
                    : idx < currentLesson 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{lesson.description}</p>
                  </div>
                  {idx < currentLesson ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : idx === currentLesson ? (
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  ) : (
                    <span className="text-gray-400">🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearningEcosystem;