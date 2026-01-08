import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Award, Target, BookOpen, TrendingUp, Zap, ChevronRight, RotateCcw, ExternalLink, FileText } from 'lucide-react';

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
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [dynamicReferences, setDynamicReferences] = useState([]);
  const [topicOffered, setTopicOffered] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Lesson Structure with Flashcards
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
      ],
      flashcards: [
        { front: "What is AI?", back: "Artificial Intelligence enables machines to perform tasks requiring human intelligence" },
        { front: "What is Reactive AI?", back: "AI that responds to current situations without memory of past events" },
        { front: "What is Limited Memory AI?", back: "AI that learns from historical data to improve decision-making" },
        { front: "What is Generative AI?", back: "AI that creates new content like text, images, or code" }
      ],
      references: [
        { title: "IBM - What is Artificial Intelligence?", url: "https://www.ibm.com/topics/artificial-intelligence", type: "Article" },
        { title: "Stanford AI Index Report", url: "https://aiindex.stanford.edu/", type: "Research" },
        { title: "AI Types Explained", url: "https://www.coursera.org/articles/types-of-artificial-intelligence", type: "Guide" }
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
      ],
      flashcards: [
        { front: "Voice Assistants Example", back: "Siri, Alexa, Google Assistant use natural language processing" },
        { front: "Recommendation Systems", back: "Netflix, Spotify use AI to suggest content based on your preferences" },
        { front: "Email Filtering", back: "Gmail uses AI to detect spam and categorize emails" }
      ],
      references: [
        { title: "AI in Daily Life - Examples", url: "https://www.forbes.com/ai-applications/", type: "Article" },
        { title: "How Voice Assistants Work", url: "https://www.wired.com/story/voice-assistants-ai/", type: "Explainer" },
        { title: "AI Behind Social Media", url: "https://www.technologyreview.com/topic/ai/", type: "Article" }
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
      ],
      flashcards: [
        { front: "Good Prompt Elements", back: "Clear, specific, contextual, and states desired format" },
        { front: "Prompt Example", back: "Instead of 'weather?', try 'What's tomorrow's weather forecast in Seattle?'" },
        { front: "Why Context Matters", back: "Context helps AI understand your intent and provide relevant answers" }
      ],
      references: [
        { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "Guide" },
        { title: "OpenAI Prompt Best Practices", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "Documentation" },
        { title: "Learn Prompting", url: "https://learnprompting.org/", type: "Course" }
      ]
    }
  ];

  const badgesList = [
    { id: 'novice', name: 'AI Novice', points: 100, icon: '🌱' },
    { id: 'explorer', name: 'AI Explorer', points: 250, icon: '🔍' },
    { id: 'prompt_master', name: 'Prompt Master', points: 500, icon: '⚡' },
    { id: 'ai_champion', name: 'AI Champion', points: 1000, icon: '🏆' }
  ];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  };

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

    // Welcome message with topic offer
    addAIMessage("Welcome to your AI Learning Journey! 🎓 I'm your AI Instructor. I'd like to start with 'What is AI?' - this covers AI basics and types. Does this sound good, or would you like to explore a different topic? Say 'yes' to start, or 'skip' to see other options.", true);
    setTopicOffered(true);
    updateDynamicReferences(0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Badge checking
  useEffect(() => {
    badgesList.forEach(badge => {
      if (points >= badge.points && !badges.find(b => b.id === badge.id)) {
        setBadges([...badges, badge]);
        addAIMessage(`🎉 Congratulations! You've earned the ${badge.icon} ${badge.name} badge!`, true);
      }
    });
  }, [points]);

  // Update dynamic references based on current lesson
  const updateDynamicReferences = (lessonIndex) => {
    const lesson = lessons[lessonIndex];
    setDynamicReferences(lesson.references);
  };

  const addAIMessage = (text, shouldSpeak = true) => {
    setMessages(prev => [...prev, { type: 'ai', text, timestamp: new Date() }]);
    if (shouldSpeak) {
      speak(text);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
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

  const offerNextTopic = () => {
    const nextLesson = currentLesson + 1;
    if (nextLesson < lessons.length) {
      const nextTopic = lessons[nextLesson];
      addAIMessage(`Great! The next topic is "${nextTopic.title}" - ${nextTopic.description}. Would you like to learn about this? Say 'yes' to continue, 'skip' for the next option, or 'flashcards' to review what you've learned.`, true);
      setTopicOffered(true);
    } else {
      addAIMessage("You've completed all available lessons! 🎉 Try the flashcards to review, or we can revisit any topic.", true);
    }
  };

  const processUserInput = (text) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setInputText('');
    setTranscription('');

    const lowerText = text.toLowerCase();

    // Handle skip/next commands
    if (lowerText.includes('skip') || lowerText.includes('next topic')) {
      if (currentLesson < lessons.length - 1) {
        setCurrentLesson(prev => prev + 1);
        updateDynamicReferences(currentLesson + 1);
        const nextTopic = lessons[currentLesson + 1];
        addAIMessage(`Skipping ahead! Let's try "${nextTopic.title}" - ${nextTopic.description}. Ready to start? Say 'yes' or 'skip' for another option.`, true);
        setTopicOffered(true);
        setUserProgress(0);
      } else {
        addAIMessage("We're at the last topic! Would you like to review with flashcards or restart from the beginning?", true);
      }
      return;
    }

    // Handle flashcard request
    if (lowerText.includes('flashcard') || lowerText.includes('flash card') || lowerText.includes('review')) {
      setShowFlashcard(true);
      setCurrentFlashcardIndex(0);
      setFlashcardFlipped(false);
      addAIMessage("Great! Opening flashcards for you. Click on any card to flip it and see the answer. This is a great way to reinforce your learning!", false);
      return;
    }

    // Award points for participation
    const earnedPoints = Math.floor(Math.random() * 20) + 10;
    setPoints(prev => prev + earnedPoints);

    // Topic acceptance
    if (topicOffered && (lowerText.includes('yes') || lowerText.includes('start') || lowerText.includes('sure') || lowerText.includes('ok'))) {
      setTopicOffered(false);
      
      setTimeout(() => {
        const currentTopic = lessons[currentLesson];
        let intro = '';
        
        if (currentLesson === 0) {
          intro = "Excellent! Let's dive in. 🚀\n\nArtificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence. There are different types:\n\n• Reactive AI: Responds to current situations\n• Limited Memory AI: Learns from past data\n• Generative AI: Creates new content\n\nNow, here's your first question: Which type of AI learns from past data to improve its performance?";
          setUserProgress(20);
        } else if (currentLesson === 1) {
          intro = "Perfect! AI in Everyday Life. 🌟\n\nYou interact with AI more than you might realize! From voice assistants to recommendation algorithms, AI is everywhere.\n\nQuestion: Can you name three AI systems you use in your daily life?";
          setUserProgress(20);
        } else if (currentLesson === 2) {
          intro = "Wonderful! Let's master AI Prompting. 💬\n\nPrompting is how we communicate with AI systems effectively. A good prompt is clear, specific, and provides context.\n\nQuestion: What makes a good prompt?";
          setUserProgress(20);
        }
        
        addAIMessage(intro, true);
      }, 1000);
      return;
    }

    // Learning content responses
    setTimeout(() => {
      let response = '';

      // Lesson 1 responses
      if (lowerText.includes('limited memory') || lowerText.includes('memory')) {
        response = `Perfect! 🎯 You're absolutely right! Limited Memory AI learns from historical data to make better decisions.\n\n+${earnedPoints} points!\n\nLet's continue: Can you think of an example of AI you use in your everyday life?`;
        setUserProgress(40);
      } else if (lowerText.includes('assistant') || lowerText.includes('siri') || lowerText.includes('alexa') || lowerText.includes('chatbot') || lowerText.includes('netflix') || lowerText.includes('spotify')) {
        response = `Excellent example! 🌟 Voice assistants, streaming services, and chatbots are great examples of AI in daily life.\n\n+${earnedPoints} points!\n\nYou're making great progress! Would you like to continue to the next topic, or would you like to review with flashcards?`;
        setUserProgress(60);
        setStreak(prev => prev + 1);
      } else if (lowerText.includes('clear') || lowerText.includes('specific') || lowerText.includes('context')) {
        response = `Great job! 🎉 You understand the key elements of good prompting!\n\n+${earnedPoints} points!\n\nA good prompt is clear, specific, and provides context. Now try creating a prompt to ask an AI about tomorrow's weather!`;
        setUserProgress(80);
      } else if (lowerText.includes('weather') || lowerText.includes('forecast')) {
        response = `Excellent! 🎊 You're getting the hang of prompting!\n\n+${earnedPoints} points!\n\nA good weather prompt might be: "What's the weather forecast for tomorrow in Seattle?"\n\nYou've completed this lesson!`;
        setUserProgress(100);
        setTimeout(() => offerNextTopic(), 2000);
      } else if (lowerText.includes('help') || lowerText.includes('hint')) {
        response = "No problem! Think about the key concepts we just discussed. If you're stuck, try rephrasing your answer or ask me to repeat the question. You've got this! 💪";
      } else {
        response = `Interesting response! Let me give you some feedback: ${
          lowerText.length > 50 
            ? "You're being detailed, which is great! Try to focus on the key concept." 
            : "Good thinking! Can you elaborate a bit more?"
        }\n\n+${earnedPoints} points for participating!`;
      }

      addAIMessage(response, true);
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

  const flipFlashcard = () => {
    setFlashcardFlipped(!flashcardFlipped);
  };

  const nextFlashcard = () => {
    const currentCards = lessons[currentLesson].flashcards;
    if (currentFlashcardIndex < currentCards.length - 1) {
      setCurrentFlashcardIndex(prev => prev + 1);
      setFlashcardFlipped(false);
    } else {
      setCurrentFlashcardIndex(0);
      setFlashcardFlipped(false);
    }
  };

  const previousFlashcard = () => {
    const currentCards = lessons[currentLesson].flashcards;
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(prev => prev - 1);
      setFlashcardFlipped(false);
    } else {
      setCurrentFlashcardIndex(currentCards.length - 1);
      setFlashcardFlipped(false);
    }
  };

  const quickActions = [
    { label: 'Repeat', action: () => {
      const lastAIMessage = messages.filter(m => m.type === 'ai').slice(-1)[0]?.text;
      if (lastAIMessage) {
        addAIMessage("Let me repeat: " + lastAIMessage, true);
      }
    }},
    { label: 'Hint', action: () => addAIMessage("Here's a hint: Think about AI systems that remember your preferences or past interactions!", true) },
    { label: 'Skip Topic', action: () => {
      processUserInput('skip');
    }},
    { label: 'Flashcards', action: () => {
      processUserInput('flashcards');
    }}
  ];

  const currentCards = lessons[currentLesson].flashcards;
  const currentCard = currentCards[currentFlashcardIndex];

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
          <div className="flex gap-2 flex-wrap">
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

        {/* Flashcards Section */}
        {showFlashcard && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Flashcards
              </h2>
              <button
                onClick={() => setShowFlashcard(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            <div className="perspective-1000">
              <div 
                onClick={flipFlashcard}
                className={`relative h-64 cursor-pointer transition-all duration-500 transform-style-3d ${
                  flashcardFlipped ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 flex items-center justify-center text-white backface-hidden ${
                  flashcardFlipped ? 'invisible' : 'visible'
                }`}>
                  <div className="text-center">
                    <p className="text-sm opacity-80 mb-2">Question</p>
                    <p className="text-2xl font-bold">{currentCard.front}</p>
                    <p className="text-sm opacity-80 mt-4">Click to reveal answer</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 flex items-center justify-center text-white ${
                  flashcardFlipped ? 'visible' : 'invisible'
                }`}
                style={{ transform: 'rotateY(180deg)' }}>
                  <div className="text-center">
                    <p className="text-sm opacity-80 mb-2">Answer</p>
                    <p className="text-xl font-semibold">{currentCard.back}</p>
                    <p className="text-sm opacity-80 mt-4">Click to see question</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={previousFlashcard}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                {currentFlashcardIndex + 1} / {currentCards.length}
              </span>
              <button
                onClick={nextFlashcard}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Dynamic References */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-blue-600" />
            Learning Resources
          </h2>
          <p className="text-sm text-gray-600 mb-4">Explore these curated resources for {lessons[currentLesson].title}</p>
          <div className="space-y-3">
            {dynamicReferences.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all border border-blue-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{ref.title}</h4>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {ref.type}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                </div>
              </a>
            ))}
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