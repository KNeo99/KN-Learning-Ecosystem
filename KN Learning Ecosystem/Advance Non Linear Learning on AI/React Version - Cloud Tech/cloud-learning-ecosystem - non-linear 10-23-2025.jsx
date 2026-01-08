import React, { useState, useEffect } from 'react';
import { Mic, Send, Award, TrendingUp, BookOpen, Star, Zap, Trophy, Target, MessageCircle, Cloud, Server, Database, Lock, Globe } from 'lucide-react';

const CloudLearningEcosystem = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(1);
  const [badges, setBadges] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [userInterests, setUserInterests] = useState([]);
  const [platformSelectionMade, setPlatformSelectionMade] = useState(false);

  const platforms = {
    aws: {
      name: 'Amazon Web Services (AWS)',
      icon: '☁️',
      color: 'from-orange-500 to-yellow-600',
      tools: {
        compute: { name: 'EC2 (Elastic Compute Cloud)', desc: 'Virtual servers in the cloud' },
        storage: { name: 'S3 (Simple Storage Service)', desc: 'Scalable object storage' },
        database: { name: 'RDS (Relational Database Service)', desc: 'Managed relational databases' },
        serverless: { name: 'Lambda', desc: 'Run code without servers' },
        networking: { name: 'VPC (Virtual Private Cloud)', desc: 'Isolated cloud resources' }
      }
    },
    gcp: {
      name: 'Google Cloud Platform (GCP)',
      icon: '🔵',
      color: 'from-blue-500 to-green-500',
      tools: {
        compute: { name: 'Compute Engine', desc: 'Virtual machines on Google infrastructure' },
        storage: { name: 'Cloud Storage', desc: 'Object storage for any data' },
        database: { name: 'Cloud SQL', desc: 'Fully managed relational databases' },
        serverless: { name: 'Cloud Functions', desc: 'Event-driven serverless compute' },
        networking: { name: 'Cloud VPC', desc: 'Global virtual network' }
      }
    },
    azure: {
      name: 'Microsoft Azure',
      icon: '🔷',
      color: 'from-blue-600 to-cyan-500',
      tools: {
        compute: { name: 'Virtual Machines', desc: 'On-demand scalable computing' },
        storage: { name: 'Blob Storage', desc: 'Massively scalable object storage' },
        database: { name: 'Azure SQL Database', desc: 'Intelligent managed database' },
        serverless: { name: 'Azure Functions', desc: 'Serverless compute service' },
        networking: { name: 'Virtual Network', desc: 'Private network in Azure' }
      }
    }
  };

  const lessons = [
    {
      id: 0,
      title: "Welcome to Cloud Learning",
      concept: "Getting Started",
      description: "Choose your cloud platform journey",
      completed: false
    },
    {
      id: 1,
      title: "What is Cloud Computing?",
      concept: "Cloud Fundamentals",
      description: "Understanding IaaS, PaaS, SaaS, and cloud benefits",
      completed: false
    },
    {
      id: 2,
      title: "Cloud Storage Solutions",
      concept: "Data Storage in the Cloud",
      description: "Learn about object storage, block storage, and file systems",
      completed: false
    },
    {
      id: 3,
      title: "Compute Services",
      concept: "Virtual Machines & Containers",
      description: "Deploy and manage compute resources",
      completed: false
    },
    {
      id: 4,
      title: "Serverless Computing",
      concept: "Event-Driven Architecture",
      description: "Build applications without managing servers",
      completed: false
    },
    {
      id: 5,
      title: "Cloud Security Basics",
      concept: "Protecting Your Resources",
      description: "Identity, access management, and encryption",
      completed: false
    }
  ];

  const badgeDefinitions = [
    { id: 'first-step', name: 'Cloud Explorer', icon: '🚀', condition: (p) => p >= 10 },
    { id: 'cloud-novice', name: 'Cloud Novice', icon: '☁️', condition: (p) => p >= 50 },
    { id: 'platform-master', name: 'Platform Master', icon: '🏆', condition: (p) => p >= 100 },
    { id: 'architect', name: 'Cloud Architect', icon: '🏗️', condition: (p) => p >= 150 },
    { id: 'streak-keeper', name: 'Consistent Learner', icon: '🔥', condition: (p) => streak >= 3 }
  ];

  const lessonContent = {
    0: {
      greeting: "Welcome to KN Cloud Learning! I'm your Cloud Technology Instructor, and I'm thrilled to guide you through the exciting world of cloud computing. Whether you're looking to build your first application, migrate existing systems, or become a certified cloud professional, you're in the right place!",
      question: "First, let's personalize your learning journey. Which cloud platform are you most interested in exploring?\n\n☁️ AWS (Amazon Web Services)\n🔵 GCP (Google Cloud Platform)\n🔷 Azure (Microsoft Azure)\n\nOr type 'all' if you want to learn about multiple platforms!",
      responses: {
        aws: "Excellent choice! AWS is the world's most comprehensive cloud platform. You'll learn about EC2, S3, Lambda, and more. Let's begin your AWS journey!",
        gcp: "Great pick! Google Cloud Platform excels in data analytics and machine learning. You'll master Compute Engine, Cloud Storage, BigQuery, and more. Let's get started!",
        azure: "Fantastic! Microsoft Azure is perfect for enterprise solutions and hybrid cloud. You'll explore Virtual Machines, Blob Storage, Azure Functions, and more. Let's dive in!",
        all: "Ambitious! Learning multiple platforms will make you incredibly versatile. I'll teach you concepts that apply across AWS, GCP, and Azure. This will be an exciting journey!",
        default: "I can see you're ready to explore the cloud! Let me know which platform interests you (AWS, GCP, Azure, or 'all'), and we'll customize your learning path."
      }
    },
    1: {
      greeting: "Lesson 1: What is Cloud Computing? Cloud computing delivers computing services over the internet, allowing you to access resources on-demand without owning physical infrastructure.",
      info: "📚 Three Main Service Models:\n\n• IaaS (Infrastructure as a Service): Virtual machines, storage, networks\n  Example: Running your own server in the cloud\n\n• PaaS (Platform as a Service): Development platforms without managing infrastructure\n  Example: Hosting a web app without configuring servers\n\n• SaaS (Software as a Service): Ready-to-use applications\n  Example: Gmail, Office 365, Salesforce\n\n☁️ Key Benefits: Scalability, cost savings, global reach, and disaster recovery!",
      question: "Here's your first challenge: If you want to deploy a web application but don't want to manage operating systems or servers, which service model would you use?",
      correctAnswer: "paas",
      responses: {
        correct: "Perfect! Platform as a Service (PaaS) is exactly right! It lets you focus on your application code while the cloud provider manages the infrastructure. You've earned 20 points! 🎉",
        hint: "Think about the model that provides a platform for development without worrying about the underlying infrastructure...",
        wrong: "Good thinking, but not quite. Remember, we're looking for the model where you can deploy apps without managing servers. Would you like a hint?"
      }
    },
    2: null, // Will be dynamically generated
    3: null, // Will be dynamically generated
    4: null, // Will be dynamically generated
    5: {
      greeting: "Lesson 5: Cloud Security Fundamentals. Security in the cloud is a shared responsibility between you and your cloud provider. Understanding this is crucial!",
      info: "🔒 Core Security Concepts:\n\n• Identity & Access Management (IAM): Control who can access what\n• Encryption: Protect data at rest and in transit\n• Network Security: Firewalls, security groups, and private networks\n• Monitoring & Logging: Track activities and detect threats\n\n🛡️ Best Practices:\n- Use principle of least privilege\n- Enable multi-factor authentication (MFA)\n- Regularly audit permissions\n- Encrypt sensitive data",
      question: "Security scenario: You're setting up access for a new team member. They only need to view logs, not modify anything. What security principle should you follow?",
      correctAnswer: "least privilege",
      responses: {
        correct: "Excellent! The principle of least privilege means giving users only the minimum permissions they need. This reduces security risks. You've earned 30 points and you're now a Cloud Architect! 🏗️🎉",
        hint: "Think about giving users the minimum access they need to do their job...",
        wrong: "Good attempt! The key is to give only the necessary permissions, nothing more. Want a hint?"
      }
    }
  };

  const generatePlatformSpecificContent = (lessonId, platform) => {
    if (!platform) return lessonContent[lessonId];

    const platformData = platforms[platform];
    
    if (lessonId === 2) {
      return {
        greeting: `Lesson 2: Cloud Storage with ${platformData.name}. Storage is fundamental to any cloud application. Let's explore how ${platform.toUpperCase()} handles data storage!`,
        info: `📦 ${platformData.tools.storage.name}:\n${platformData.tools.storage.desc}\n\n🔑 Key Features:\n• Unlimited scalability\n• 99.999999999% (11 nines) durability\n• Multiple storage classes for cost optimization\n• Built-in security and compliance\n\n💡 Common Use Cases:\n- Website hosting and static content\n- Backup and disaster recovery\n- Data lakes for analytics\n- Application data storage\n\n${platform === 'aws' ? '📝 Example: Creating an S3 bucket to host a static website' : platform === 'gcp' ? '📝 Example: Using Cloud Storage for video streaming' : '📝 Example: Storing user uploads in Blob Storage'}`,
        question: `Real-world scenario: Your company needs to store millions of user photos that are rarely accessed but must be kept for compliance. Which ${platform.toUpperCase()} storage approach would you recommend for cost optimization?`,
        correctAnswer: platform === 'aws' ? 'glacier' : platform === 'gcp' ? 'coldline' : 'cool',
        responses: {
          correct: `Brilliant! ${platform === 'aws' ? 'S3 Glacier' : platform === 'gcp' ? 'Coldline storage' : 'Cool Blob Storage'} is perfect for archival data - much cheaper than standard storage for rarely accessed files. That's 25 points for smart cost optimization! 💰`,
          hint: `Look for the storage class designed for archival or infrequently accessed data in ${platformData.name}...`,
          wrong: "Good thinking about storage! But for rarely accessed archival data, there's a more cost-effective option. Want a hint?"
        }
      };
    }

    if (lessonId === 3) {
      return {
        greeting: `Lesson 3: Compute Services with ${platformData.name}. Compute power is the engine of the cloud. Let's learn how to deploy virtual machines and containers!`,
        info: `💻 ${platformData.tools.compute.name}:\n${platformData.tools.compute.desc}\n\n⚙️ What You Can Do:\n• Launch virtual machines in minutes\n• Choose from hundreds of instance types\n• Auto-scale based on demand\n• Pay only for what you use\n\n🎯 Instance Types:\n- General Purpose: Balanced compute, memory, networking\n- Compute Optimized: High-performance processors\n- Memory Optimized: Large datasets in memory\n- Storage Optimized: High disk throughput\n\n${platform === 'aws' ? '📝 Example: Launching an EC2 t3.micro for a web server' : platform === 'gcp' ? '📝 Example: Creating a Compute Engine e2-micro VM' : '📝 Example: Deploying a B1s Virtual Machine for development'}`,
        question: `You need to host a web application that typically handles 100 users but spikes to 10,000 during product launches. What ${platform.toUpperCase()} feature should you use?`,
        correctAnswer: 'auto scaling',
        responses: {
          correct: `Perfect! Auto Scaling (or Autoscaling) automatically adjusts capacity to maintain performance and minimize costs. During spikes, it adds instances; during quiet times, it scales down. That's 30 points! 📈`,
          hint: "Think about a feature that automatically adds or removes compute resources based on demand...",
          wrong: "Good thought! But there's a feature that automatically handles these traffic spikes. Would you like a hint?"
        }
      };
    }

    if (lessonId === 4) {
      return {
        greeting: `Lesson 4: Serverless Computing with ${platformData.name}. Serverless doesn't mean "no servers" - it means you don't manage them! Let's explore this game-changing approach.`,
        info: `⚡ ${platformData.tools.serverless.name}:\n${platformData.tools.serverless.desc}\n\n✨ Serverless Benefits:\n• No server management\n• Automatic scaling from zero to thousands\n• Pay per execution (not per hour)\n• Built-in high availability\n\n🎯 Perfect For:\n- API backends\n- Data processing pipelines\n- Scheduled tasks (cron jobs)\n- Event-driven workflows\n- Image/video processing\n\n${platform === 'aws' ? '📝 Example: Lambda function triggered by S3 upload to resize images' : platform === 'gcp' ? '📝 Example: Cloud Function processing Pub/Sub messages' : '📝 Example: Azure Function triggered by blob storage'}`,
        question: `Your startup needs to process uploaded images (resize, compress) but uploads are unpredictable - sometimes 10/day, sometimes 1000/hour. Why is ${platformData.tools.serverless.name} ideal for this?`,
        correctAnswer: 'scale',
        responses: {
          correct: `Exactly! Serverless scales automatically from zero to thousands, and you only pay for actual executions - perfect for unpredictable workloads! That's 30 points! ⚡`,
          hint: "Think about how serverless handles variable workloads and what you pay for...",
          wrong: "You're on the right track! Consider the automatic scaling and pay-per-use nature of serverless. Want a hint?"
        }
      };
    }

    return lessonContent[lessonId];
  };

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([{
        sender: 'ai',
        message: lessonContent[0].greeting + '\n\n' + lessonContent[0].question,
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    badgeDefinitions.forEach(badge => {
      if (!badges.includes(badge.id) && badge.condition(points)) {
        setBadges([...badges, badge.id]);
        addMessage('ai', `🎉 Achievement Unlocked: ${badge.name} ${badge.icon}`);
      }
    });
  }, [points]);

  const addMessage = (sender, message) => {
    setChatHistory(prev => [...prev, {
      sender,
      message,
      timestamp: new Date()
    }]);
  };

  const handlePlatformSelection = (input) => {
    const inputLower = input.toLowerCase();
    let platform = null;
    
    if (inputLower.includes('aws') || inputLower.includes('amazon')) {
      platform = 'aws';
    } else if (inputLower.includes('gcp') || inputLower.includes('google')) {
      platform = 'gcp';
    } else if (inputLower.includes('azure') || inputLower.includes('microsoft')) {
      platform = 'azure';
    } else if (inputLower.includes('all') || inputLower.includes('multiple')) {
      platform = 'all';
    }
    
    return platform;
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      addMessage('ai', "🎤 Voice input activated! In a production environment, this would use speech recognition. For now, please type your response below.");
      setTimeout(() => setIsRecording(false), 2000);
    }
  };

  const checkAnswer = (input, lessonId) => {
    const lesson = selectedPlatform ? generatePlatformSpecificContent(lessonId, selectedPlatform) : lessonContent[lessonId];
    if (!lesson) return 'wrong';
    
    const inputLower = input.toLowerCase();
    
    if (lesson.correctAnswer && inputLower.includes(lesson.correctAnswer)) {
      return 'correct';
    }
    
    // Accept variations
    if (lessonId === 3 && (inputLower.includes('autoscale') || inputLower.includes('auto scale'))) {
      return 'correct';
    }
    
    if (lessonId === 4 && (inputLower.includes('automatic') || inputLower.includes('scaling') || inputLower.includes('pay') || inputLower.includes('cost'))) {
      return 'correct';
    }
    
    if (lessonId === 5 && (inputLower.includes('least') || inputLower.includes('minimum'))) {
      return 'correct';
    }
    
    return 'wrong';
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    addMessage('user', userInput);
    
    // Platform selection logic
    if (currentLesson === 0 && !platformSelectionMade) {
      const platform = handlePlatformSelection(userInput);
      
      if (platform) {
        setSelectedPlatform(platform);
        setPlatformSelectionMade(true);
        
        setTimeout(() => {
          const responseKey = platform === 'all' ? 'all' : platform;
          addMessage('ai', lessonContent[0].responses[responseKey]);
          
          setTimeout(() => {
            setCurrentLesson(1);
            setPoints(points + 10);
            const nextLesson = lessonContent[1];
            addMessage('ai', `${nextLesson.greeting}\n\n${nextLesson.info}\n\n${nextLesson.question}`);
          }, 1500);
        }, 500);
      } else {
        setTimeout(() => {
          addMessage('ai', lessonContent[0].responses.default);
        }, 500);
      }
      
      setUserInput('');
      return;
    }
    
    const lesson = generatePlatformSpecificContent(currentLesson, selectedPlatform);
    const result = checkAnswer(userInput, currentLesson);
    
    if (result === 'correct') {
      const pointsEarned = currentLesson === 1 ? 20 : currentLesson <= 3 ? 25 : 30;
      setPoints(points + pointsEarned);
      
      setTimeout(() => {
        addMessage('ai', lesson.responses.correct);
        
        if (currentLesson < lessons.length - 1) {
          setTimeout(() => {
            setCompletedLessons([...completedLessons, currentLesson]);
            const nextLesson = currentLesson + 1;
            setCurrentLesson(nextLesson);
            const nextContent = generatePlatformSpecificContent(nextLesson, selectedPlatform);
            addMessage('ai', `${nextContent.greeting}\n\n${nextContent.info}\n\n${nextContent.question}`);
          }, 2000);
        } else {
          setTimeout(() => {
            setCompletedLessons([...completedLessons, currentLesson]);
            const platformName = selectedPlatform === 'all' ? 'multi-cloud' : platforms[selectedPlatform]?.name || 'cloud';
            addMessage('ai', `🎊 Congratulations! You've completed the Cloud Fundamentals course! You're now a certified Cloud Architect with a strong foundation in ${platformName} concepts. Keep building, deploying, and scaling in the cloud! Your journey has just begun! 🚀☁️`);
          }, 2000);
        }
      }, 500);
    } else {
      setTimeout(() => {
        addMessage('ai', lesson.responses.wrong);
      }, 500);
    }
    
    setUserInput('');
  };

  const handleQuickAction = (action) => {
    const lesson = generatePlatformSpecificContent(currentLesson, selectedPlatform);
    if (action === 'hint' && lesson?.responses?.hint) {
      addMessage('ai', lesson.responses.hint);
    } else if (action === 'repeat' && lesson?.question) {
      addMessage('ai', lesson.question);
    } else if (action === 'example' && currentLesson > 1 && selectedPlatform) {
      const platformData = platforms[selectedPlatform];
      if (currentLesson === 2) {
        addMessage('ai', `💡 Example Use Case: A photo-sharing app uses ${platformData.tools.storage.name} to store user uploads. When a user uploads a photo, it's automatically stored with encryption and can be accessed globally via CDN for fast loading.`);
      } else if (currentLesson === 3) {
        addMessage('ai', `💡 Example Use Case: An e-commerce site runs on ${platformData.tools.compute.name}. During Black Friday, traffic increases 10x, and auto-scaling automatically adds more instances to handle the load.`);
      }
    }
  };

  const progressPercentage = ((currentLesson + 1) / lessons.length) * 100;

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-blue-100 font-sans">
      {/* Panel 1: The Instructor Chat */}
      <div className="w-2/3 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Cloud Technology Instructor</h1>
                <p className="text-blue-100 text-sm">Master AWS, GCP, Azure & more</p>
              </div>
            </div>
            {selectedPlatform && selectedPlatform !== 'all' && (
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${platforms[selectedPlatform].color} font-semibold text-white shadow-lg`}>
                {platforms[selectedPlatform].icon} {platforms[selectedPlatform].name}
              </div>
            )}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                  chat.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200 shadow-sm'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{chat.message}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleQuickAction('repeat')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm"
            >
              🔄 Repeat Question
            </button>
            <button
              onClick={() => handleQuickAction('hint')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm"
            >
              💡 Give Me a Hint
            </button>
            {currentLesson > 1 && selectedPlatform && (
              <button
                onClick={() => handleQuickAction('example')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-colors shadow-sm"
              >
                ✨ Show Example
              </button>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t-2 border-gray-200 bg-white">
          {isRecording && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-pulse">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-700 text-sm font-medium">🎤 Listening... (simulated)</span>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={handleMicClick}
              className={`p-4 rounded-full transition-all shadow-md hover:shadow-lg ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
              }`}
              title="Voice Input"
            >
              <Mic className="w-6 h-6" />
            </button>
            
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer here..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: The Learning Dashboard */}
      <div className="w-1/3 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Target className="w-7 h-7" />
            Learning Dashboard
          </h2>
          <p className="text-indigo-200 text-sm">Track your cloud mastery journey</p>
        </div>

        {/* Current Lesson */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold text-lg">Current Module</h3>
          </div>
          <h4 className="text-xl font-bold text-yellow-300 mb-2">
            {lessons[currentLesson]?.title}
          </h4>
          <p className="text-indigo-100 text-sm mb-3 font-semibold">{lessons[currentLesson]?.concept}</p>
          <p className="text-white/80 text-xs">{lessons[currentLesson]?.description}</p>
        </div>

        {/* Platform Selection Display */}
        {platformSelectionMade && selectedPlatform && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-green-300" />
              <h3 className="font-bold">Your Platform{selectedPlatform === 'all' ? 's' : ''}</h3>
            </div>
            {selectedPlatform === 'all' ? (
              <div className="space-y-2">
                {Object.entries(platforms).map(([key, platform]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-4xl">{platforms[selectedPlatform].icon}</span>
                <div>
                  <p className="font-bold text-lg">{platforms[selectedPlatform].name}</p>
                  <p className="text-xs text-white/70">Customized learning path</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Progress & Streak */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <h3 className="font-bold">Progress</h3>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-bold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="bg-white/20 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 h-full transition-all duration-500 rounded-full shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-300" />
            <span className="font-bold">Daily Streak:</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full font-bold text-sm shadow-md">
              🔥 {streak} Day{streak !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Gamification Zone */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold">Achievements</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Cloud Points</span>
              <span className="text-2xl font-bold text-yellow-300">⭐ {points}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold mb-3">Unlocked Badges:</p>
            <div className="grid grid-cols-2 gap-2">
              {badgeDefinitions.map(badge => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl text-center transition-all ${
                    badges.includes(badge.id)
                      ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg scale-105 animate-pulse'
                      : 'bg-white/5 text-white/30 border border-white/10'
                  }`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Tools Reference */}
        {platformSelectionMade && selectedPlatform && selectedPlatform !== 'all' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-cyan-300" />
              <h3 className="font-bold">Quick Tools Reference</h3>
            </div>
            <div className="space-y-3 text-sm">
              {Object.entries(platforms[selectedPlatform].tools).map(([key, tool]) => (
                <div key={key} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="font-semibold text-cyan-300 mb-1">{tool.name}</p>
                  <p className="text-xs text-white/70">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Map */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-blue-300" />
            <h3 className="font-bold">Course Roadmap</h3>
          </div>
          
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg transition-all ${
                  index === currentLesson
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-white shadow-lg scale-105'
                    : completedLessons.includes(index)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border border-green-300 shadow-md'
                    : 'bg-white/5 border border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                    index === currentLesson
                      ? 'bg-white text-blue-600'
                      : completedLessons.includes(index)
                      ? 'bg-white text-green-600'
                      : 'bg-white/10 text-white/50'
                  }`}>
                    {completedLessons.includes(index) ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{lesson.title}</p>
                    <p className="text-xs opacity-80">{lesson.concept}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudLearningEcosystem;
