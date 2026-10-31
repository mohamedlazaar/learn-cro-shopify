import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  Lightbulb,
  ShoppingBag,
  HelpCircle,
  Briefcase,
  Calculator,
  MessageSquare,
} from 'lucide-react';
import { Lesson, Module, Phase } from '../../types/curriculum';
import { callPiApiChat, ChatMessage, hasPiApiKey, DEFAULT_AI_MODEL } from '../../services/aiService';
import './LessonAiChat.css';

interface LessonAiChatProps {
  lesson: Lesson;
  module: Module;
  phase: Phase;
}

export const LessonAiChat: React.FC<LessonAiChatProps> = ({ lesson, module, phase }) => {
  const isAiOnline = hasPiApiKey();
  const storageKey = useMemo(() => `cro_lesson_chat_v1_${lesson.id}`, [lesson.id]);

  const defaultGreeting: ChatMessage = useMemo(
    () => ({
      role: 'assistant',
      content: `👋 Hello! I am your **AI CRO Mentor** for this lesson: **"${lesson.title}"**.

I can help you master the material covered here:
- Explain complex concepts using intuitive real-world analogies
- Walk through production Shopify Liquid and JavaScript code
- Model the mathematical Revenue Per Session (RPS) equations
- Quiz your knowledge with challenging ecommerce scenarios
- Teach you how to pitch this optimization to a store founder or client

Ask me any question below, or select a quick starter prompt to begin!`,
    }),
    [lesson.title]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [defaultGreeting];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // When switching lessons, load this lesson's conversation
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {}
    setMessages([defaultGreeting]);
  }, [storageKey, defaultGreeting]);

  // Save conversation to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Dynamic starter prompts tailored directly to this lesson
  const quickPrompts = useMemo(() => {
    return [
      {
        icon: Lightbulb,
        label: 'Explain with an Analogy',
        prompt: `Can you explain the core concept of "${lesson.title}" using a simple, intuitive real-world analogy?`,
      },
      {
        icon: ShoppingBag,
        label: 'Shopify Liquid Code Walkthrough',
        prompt: `Show me a production-ready Shopify Liquid and JavaScript code example for implementing "${lesson.title}" in an Online Store 2.0 theme.`,
      },
      {
        icon: Calculator,
        label: 'Financial & Conversion Math',
        prompt: `How do I calculate the exact Revenue Per Session (RPS) and gross profit impact of "${lesson.title}" for a store with 50,000 monthly visitors?`,
      },
      {
        icon: HelpCircle,
        label: 'Test My Knowledge (Quiz)',
        prompt: `Test my understanding of "${lesson.title}" with a realistic, challenging ecommerce client scenario question. Do not give the answer away yet.`,
      },
      {
        icon: Briefcase,
        label: 'Client Pitch Script',
        prompt: `How should I explain the business value and ROI of testing "${lesson.title}" to a skeptical Shopify merchant or agency client?`,
      },
    ];
  }, [lesson.title]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    // Build specialized, comprehensive system prompt grounded in the current lesson
    const systemPrompt = `You are the specialized Senior Shopify CRO Mentor for the lesson "${lesson.title}".
Curriculum Context:
- Phase: Phase ${phase.order} (${phase.title})
- Module: Module ${module.order} (${module.title})
- Estimated Read Time: ${lesson.estimatedMinutes} mins
- Core Learning Objectives:
${lesson.objectives.map((o) => `  * ${o}`).join('\n')}

Key Content Headings in this Lesson:
${lesson.sections.map((s) => `  * ${s.heading}`).join('\n')}

Common Pitfalls & Mistakes Covered:
${lesson.mistakes.map((m) => `  * ${m}`).join('\n')}

Instructions:
1. Always ground your explanations directly in this lesson's concepts and modern Shopify ecommerce best practices.
2. Provide technical, actionable details (mentioning specific Liquid tags, APIs, GA4 telemetry, or behavioral psychology when relevant).
3. Keep explanations structured, easy to read, and formatted with clean markdown (headers, bold highlights, lists, and code blocks).
4. If asked for code, provide clean, production-grade snippets with comments.
5. If asked to quiz the user, present 1 scenario and wait for their response before grading.`;

    try {
      const reply = await callPiApiChat({
        messages: updatedMessages.slice(-8),
        systemPrompt,
        temperature: 0.7,
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered a temporary connection issue. Please try asking again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Reset this lesson chat back to the beginning?')) {
      setMessages([defaultGreeting]);
      try {
        localStorage.removeItem(storageKey);
      } catch {}
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="lac-card" aria-label="Lesson AI Tutor">
      {/* Top Header */}
      <div className="lac-header">
        <div className="lac-header-left">
          <div className="lac-bot-avatar">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="lac-title-row">
              <h2 className="lac-title">AI Lesson Mentor &amp; CRO Tutor</h2>
              <span className={`lac-status-badge ${isAiOnline ? 'is-live' : 'is-local'}`}>
                {isAiOnline ? `● Live (${DEFAULT_AI_MODEL})` : '● Expert CRO Mentor Mode'}
              </span>
            </div>
            <p className="lac-subtitle">
              Interactive discussion tailored specifically to <strong>{lesson.title}</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="lac-reset-btn"
          title="Reset conversation for this lesson"
        >
          <RotateCcw size={13} />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="lac-prompts-bar">
        <span className="lac-prompts-label">Quick Prompts:</span>
        <div className="lac-prompts-list">
          {quickPrompts.map((qp, i) => {
            const Icon = qp.icon;
            return (
              <button
                key={i}
                type="button"
                className="lac-prompt-chip"
                onClick={() => handleSend(qp.prompt)}
                disabled={isLoading}
              >
                <Icon size={12} className="lac-prompt-icon" />
                <span>{qp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="lac-messages-container">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`lac-msg-row ${isUser ? 'is-user' : 'is-bot'}`}>
              {!isUser && (
                <div className="lac-msg-avatar" aria-hidden="true">
                  <Bot size={14} />
                </div>
              )}

              <div className="lac-bubble-wrapper">
                <div className="lac-bubble">
                  <div className="lac-bubble-text">{msg.content}</div>

                  {!isUser && (
                    <div className="lac-bubble-footer">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.content, idx)}
                        className="lac-copy-btn"
                        title="Copy message to clipboard"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check size={11} color="var(--success, #10b981)" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="lac-user-avatar" aria-hidden="true">
                  <User size={14} />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="lac-msg-row is-bot">
            <div className="lac-msg-avatar" aria-hidden="true">
              <Bot size={14} />
            </div>
            <div className="lac-bubble-wrapper">
              <div className="lac-bubble lac-typing-bubble">
                <span className="lac-typing-dot" />
                <span className="lac-typing-dot" />
                <span className="lac-typing-dot" />
                <span className="lac-typing-text">AI Mentor is analyzing lesson context…</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="lac-input-bar">
        <textarea
          ref={textareaRef}
          rows={2}
          className="lac-textarea"
          placeholder={`Ask anything about "${lesson.title}" (e.g. "How does this work in Liquid?", "Explain with an analogy")...`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />

        <div className="lac-input-actions">
          <div className="lac-input-hint">
            <span>Press</span> <kbd>Enter</kbd> <span>to send,</span> <kbd>Shift+Enter</kbd> <span>for new line</span>
          </div>
          <button
            type="button"
            className="lac-send-btn"
            onClick={() => handleSend()}
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send size={14} />
            <span>Ask Mentor</span>
          </button>
        </div>
      </div>
    </section>
  );
};
