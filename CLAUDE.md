# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**KN Learning Ecosystem** - A comprehensive educational technology platform enabling continuous learning from basic English literacy to advanced AI, cloud computing, and prompt engineering. Designed with empathy for non-native English speakers and learners with limited technology access.

**Core Philosophy:** Accessibility-first, privacy-focused, offline-capable learning applications that work on any device without registration or data collection.

## Codebase Architecture

### High-Level Structure

```
CLAUDE - Codes/
├── Beginner/                    # Entry-level ESL reading practice apps
├── Intermediate/                # Mid-level reading comprehension
├── Advance/                    # Advanced reading tools with PDF/DOCX support
├── Dual Panel - Fundamental AI Learning/  # Interactive AI fundamentals platform
├── KN Learning Ecosystem/      # Main ecosystem hub
│   ├── Cloud Technology/       # Cloud computing learning apps (AWS/GCP/Azure)
│   ├── Prompt Engineering - with Claude/  # Standalone prompt engineering trainer
│   ├── Advance Non Linear Learning on AI/
│   │   ├── Cloud Tech Learning - in HTML/     # HTML versions with voice instructor
│   │   ├── React Version - Cloud Tech/        # JSX implementations
│   │   └── A Dynamic AI Learning.../         # TSX dual-panel systems
│   ├── Dashboard/              # Progress tracking dashboard
│   └── GitHub -/ReadMe/        # Repository documentation
└── ESL - Structures/           # Course curriculum and teaching methodologies
```

### Application Categories

1. **Reading Practice Apps** (Beginner → Intermediate → Advanced)
   - Voice-enabled ESL reading practice
   - Web Speech API for text-to-speech and speech recognition
   - Progressive difficulty with gamification

2. **AI Learning Platforms** (Dual-panel, Non-linear, User-driven)
   - Interactive learning with flashcards and dynamic references
   - Module-based curriculum with achievement systems
   - Available in HTML, JSX, and TSX versions

3. **Cloud Technology Trainers**
   - Platform comparison (AWS/GCP/Azure)
   - Interactive concept learning with typed answers or voice input
   - Service selection and architecture fundamentals

4. **Prompt Engineering Apps**
   - Standalone single-file applications
   - Interactive prompt practice with real-time feedback
   - No external dependencies required

## Technology Stack

### Primary Technologies

- **HTML5/CSS3/Vanilla JavaScript (ES6+)** - 99% of applications
- **React (JSX)** - Advanced cloud learning components
- **TypeScript + React (TSX)** - Dual-panel AI learning systems
- **Web Speech API** - Text-to-speech and speech recognition across all reading apps
- **LocalStorage API** - Client-side progress tracking and preferences

### External Dependencies (Optional, CDN-based)

- **PDF.js** (v3.11.174) - Apache License 2.0 - PDF reading in advanced apps
- **Mammoth.js** (v1.6.0) - BSD 2-Clause - Word document reading
- **Lucide React** - Icons for React components

**Key Principle:** Applications are standalone single-file HTML documents that work offline with no build process.

## Development Workflow

### Working with HTML Applications (Primary)

**No build process required:**

1. Open `.html` files directly in browser to run
2. Edit inline CSS (in `<style>` tags), HTML, and JavaScript (in `<script>` tags) in the same file
3. Refresh browser to see changes
4. Test across different browsers (Chrome, Edge, Safari)

**Optional local server for testing:**
```bash
python -m http.server 8000
# OR
npx http-server
```

### Working with React/TypeScript Applications

**Setup (first time):**
```bash
# Install Node.js if not already installed (see Run TSX -Typescript - Install Node.js/)

# Install dependencies
npm install
npm install lucide-react
```

**Development:**
```bash
# For JSX files
npm run dev

# For TSX files
npx tsc --init   # Initialize TypeScript config
tsx App.tsx      # Run TypeScript + React
```

**Production:**
```bash
npm run build
```

### Testing Applications

**Browser Compatibility Check:**
- **Primary:** Chrome 25+, Edge 79+, Safari 14.1+, iOS Safari 14.5+
- **Limited:** Firefox (Speech Recognition not fully supported)
- **Not Supported:** Internet Explorer

**Speech API Testing:**
1. Test microphone permissions flow
2. Verify text-to-speech playback
3. Test speech recognition accuracy
4. Check consent screens display properly

**Responsive Testing:**
- Desktop browsers (1920x1080, 1366x768)
- Tablets (768px width)
- Mobile devices (375px width)
- iOS-specific versions for Safari compatibility

## Code Organization Patterns

### Standard HTML Application Structure

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Metadata, charset, viewport -->
</head>
<body>
    <!-- HTML structure -->

    <style>
        /* CSS custom properties (variables) */
        /* Component-specific styles */
        /* Responsive media queries */
        /* Animations */
    </style>

    <script>
        // State management variables
        // Initialization functions
        // Event handlers
        // Web API integrations (Speech, LocalStorage)
        // Helper functions
        // UI update functions
    </script>
</body>
</html>
```

### Common Application Features

**Every learning application includes:**
- **Consent Screens** - Privacy-first microphone permission explanations
- **Progress Tracking** - Points, badges, streaks, completion percentages (LocalStorage)
- **Gamification** - XP rewards, level progression, achievement unlocks
- **Responsive Design** - Mobile-first, touch-friendly, iOS optimizations
- **Voice Integration** - Text-to-speech for content, speech recognition for practice

### Naming Conventions

**File versioning pattern:**
- `app-name.html` - Stable version
- `app-name_1.html`, `app-name_2.html` - Development iterations
- `app-name_g.html`, `app-name_g1.html` - Good/working versions
- `app-name - descriptive feature.html` - Feature-specific versions

**Version directories:**
- Dated folders (e.g., "December Read-it/") contain latest iterations
- "Voice Instructor Guided - version/" for feature-specific variants

## Key Architecture Patterns

### Dual-Panel Learning Pattern

Used in AI learning platforms:

**Left Panel:** Content hub
- Module selection
- Learning content display
- Resource library
- Progress tracking

**Right Panel:** Interactive practice
- Chat interface or exercises
- Flashcard practice
- Real-time feedback
- Context-aware suggestions

**Navigation:** Three methods
1. Button-based module selection
2. Chat commands (e.g., "!module ai-fundamentals")
3. Flashcard review system

### Voice-Enabled Reading Pattern

Used across all reading practice apps:

1. **Consent → Setup → Practice → Assessment → Feedback**
2. Web Speech API initialization after user consent
3. Text-to-speech reads passage to user
4. User repeats passage (recorded via speech recognition)
5. Comparison algorithm scores accuracy
6. Visual and audio feedback with progress updates

### Standalone Application Pattern

Used in prompt engineering and cloud learning apps:

- **Self-contained** - All code, styles, and logic in single HTML file
- **No external dependencies** - Works offline immediately
- **Progressive enhancement** - Advanced features when APIs available
- **Responsive by default** - Mobile-first CSS Grid/Flexbox layouts

## Privacy and Data Handling

**No data collection principles:**
- No user accounts or authentication
- No server-side data transmission
- No analytics or tracking
- No cookies (except browser cache/LocalStorage)
- All processing happens client-side in browser

**LocalStorage usage:**
- Progress tracking (points, badges, completions)
- User preferences (voice settings, theme)
- Session data (current lesson, streaks)
- All data remains on user's device

**Voice processing:**
- Web Speech API processes entirely in browser
- No audio recordings sent to external servers
- Users control microphone permissions

## Learning Path Structure

### Skill Progression

```
Beginner ESL → Intermediate ESL → Advanced Reading
     ↓              ↓                    ↓
Basic Vocab    Complex Passages    AI Fundamentals
                                        ↓
                                   Cloud Tech / Prompt Engineering
```

### Content Organization by Level

**Beginner:** Simple sentences, basic vocabulary, phonics practice
**Intermediate:** Grade 3-4 passages, comprehension questions, story reading
**Advanced:** Document reading (PDF/DOCX), technical content, specialized vocabulary

**AI/Tech Modules:**
- AI Fundamentals (What is AI?, Types, Applications)
- Prompt Engineering (Structure, Specificity, Iteration)
- Cloud Technology (Platform comparison, Services, Architecture)
- LLM Exploration (Model capabilities, Use cases, Best practices)

## Common Development Tasks

### Adding a New Reading Level

1. Copy the closest existing level template (e.g., `intermediate-reading-practice.html`)
2. Update content array with new passages appropriate to level
3. Adjust scoring thresholds in `assessAccuracy()` function
4. Modify gamification parameters (XP values, badge requirements)
5. Test speech recognition with target vocabulary
6. Create iOS-optimized version if needed

### Creating a New Learning Module

1. For standalone: Copy `prompt-engineering-mastery-standalone_v1.html` as template
2. Update module data structure with new content
3. Modify navigation commands and button labels
4. Adjust progress tracking variables
5. Update achievement criteria
6. Test responsive layout on mobile devices

### Modifying Voice Features

**Text-to-Speech adjustments:**
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 0.9;  // Speaking speed (0.1 to 10)
utterance.pitch = 1;   // Voice pitch (0 to 2)
utterance.volume = 1;  // Volume (0 to 1)
```

**Speech Recognition adjustments:**
```javascript
recognition.continuous = false;  // Single result vs continuous
recognition.interimResults = false;  // Show interim vs final only
recognition.lang = 'en-US';  // Language/accent
```

### Integrating New Cloud Platforms

When adding platforms beyond AWS/GCP/Azure:

1. Add platform to `platforms` array in cloud learning apps
2. Create module data for each service category (compute, storage, database, etc.)
3. Add platform-specific colors and branding to CSS
4. Update navigation and selection UI
5. Create comparison tables for decision-making features

## Documentation Locations

**Technical Implementation:**
- `KN Learning Ecosystem/Advance Non Linear Learning on AI/React Version - Cloud Tech/IMPLEMENTATION_GUIDE.md` - React setup
- `KN Learning Ecosystem/Advance Non Linear Learning on AI/Cloud Tech Learning - in HTML/HTML_VERSION_GUIDE.md` - HTML quick start

**Feature Guides:**
- `Dual Panel - Fundamental AI Learning/NAVIGATION_GUIDE.md` - UI navigation methods
- `KN Learning Ecosystem/Advance Non Linear Learning on AI/Cloud Tech Learning - in HTML/VOICE_FEATURES_GUIDE.md` - Voice capabilities

**Project Documentation:**
- `KN Learning Ecosystem/GitHub -/ReadMe/README.md` - Official project overview
- `KN Learning Ecosystem/Ecosystem - Documentation/licensing-and-dependencies-analysis.md` - Legal compliance

**Update Logs:**
- Various `RECENT_UPDATES.md`, `CHANGES_SUMMARY.md` files throughout subdirectories
- `LLM-EXPLORER-UPDATE-CHANGELOG.md` in prompt engineering directories

## Browser API Usage

### Web Speech API

**Critical for functionality:**
- Used in ALL reading practice applications
- Required for AI learning voice instructor versions
- Browser compatibility: Chrome/Edge/Safari (not Firefox)

**Initialization pattern:**
```javascript
// Text-to-Speech
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance(text);
synth.speak(utterance);

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.start();
```

**Always include user consent before requesting microphone access.**

### LocalStorage API

**Used for all progress tracking:**
```javascript
// Save progress
localStorage.setItem('userProgress', JSON.stringify(progressData));

// Load progress
const saved = localStorage.getItem('userProgress');
const progressData = saved ? JSON.parse(saved) : defaultProgress;
```

**Never store sensitive data in LocalStorage.**

## File Distribution and Deployment

### GitHub Pages (Current Method)

Applications are deployed as static HTML files that run entirely in the browser.

### Alternative Distribution

**For offline access:**
- USB drives or local network sharing
- Email attachments (single HTML files)
- Cloud storage (Google Drive, Dropbox)
- School network file servers

**For React/TypeScript versions:**
- Build to static files: `npm run build`
- Deploy build output to static hosting (Netlify, Vercel)
- Or bundle to single file for offline distribution

## Licensing and Attribution

**Third-party dependencies require attribution:**

When using PDF.js or Mammoth.js, include in comments:
```javascript
/* PDF.js - Apache License 2.0 - Mozilla Foundation
 * Mammoth.js - BSD 2-Clause License - Michael Williamson
 */
```

**Project licensing:** Consider specifying an open-source license (e.g., MIT) for the educational mission.

## Unique Considerations

### Empathy-Driven Design

When adding or modifying content:
- Use clear, simple language (avoid idioms for non-native speakers)
- Provide audio support for all text content
- Include visual progress indicators for motivation
- Design for low-bandwidth environments (minimize external resources)
- Support older devices (avoid cutting-edge APIs without fallbacks)

### Gamification Balance

- Keep XP/points systems encouraging, not discouraging
- Achievement criteria should be attainable for target skill level
- Provide multiple paths to progress (not just one right answer)
- Celebrate small wins frequently

### Accessibility Principles

- High contrast ratios (WCAG AA minimum)
- Large touch targets (44x44px minimum for mobile)
- Keyboard navigation support where applicable
- Clear error messages and feedback
- No time limits on exercises (respect different learning paces)

## Version Control Strategy

**Current approach:** Manual file versioning with descriptive names

**When creating new versions:**
1. Test thoroughly before creating "stable" version
2. Use descriptive suffixes for feature variants
3. Keep dated folders for major iterations
4. Document changes in accompanying .md files
5. Preserve working versions with "_g" suffix

**For significant changes:** Create update logs (CHANGES_SUMMARY.md) documenting what changed and why.
