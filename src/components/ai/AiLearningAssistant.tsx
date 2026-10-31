import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  Lightbulb,
  BookOpen,
  ChevronDown,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { callPiApiChat, ChatMessage, DEFAULT_AI_MODEL } from '../../services/aiService';

export const AiLearningAssistant: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I am your AI CRO Study Buddy. Ask me anything about this page, request a simple explanation, or let me test your knowledge!',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine contextual helper prompts based on route
  const getContextualPrompts = (): string[] => {
    const path = location.pathname;
    if (path.startsWith('/lesson/')) {
      return [
        'Explain this lesson simply with an analogy',
        'Give me a real-world Shopify Plus example',
        'Test me with 1 tricky question on this lesson',
        'How do I pitch this concept to an ecommerce client?',
      ];
    }
    if (path.startsWith('/exercises/')) {
      return [
        'Give me a subtle hint without revealing the solution',
        'Explain the underlying formula or logic step-by-step',
        'Why does this metric matter so much in conversion optimization?',
      ];
    }
    if (path.startsWith('/quiz/')) {
      return [
        'Explain the core principle tested in this module quiz',
        'What are the most common mistakes people make here?',
      ];
    }
    return [
      'What are the 3 highest ROI areas in Shopify CRO?',
      'How to explain A/B testing statistical significance to a merchant?',
      'Give me a rapid-fire CRO question to test my knowledge',
    ];
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isExpanded]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputMessage('');
    setIsLoading(true);

    const contextInfo = `The user is currently browsing the page URL: "${location.pathname}".
Provide clear, punchy, expert CRO and Shopify guidance. Keep explanations direct, practical, and formatted in clean markdown.`;

    try {
      const reply = await callPiApiChat({
        messages: updated.slice(-6),
        systemPrompt: contextInfo,
        temperature: 0.7,
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered a temporary connection issue. Please check your PiAPI key or network.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const contextPrompts = getContextualPrompts();

  // Floating button when closed
  if (!isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 900,
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 20px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
            fontSize: 14,
            fontWeight: 600,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <Sparkles size={18} />
          <span>Ask AI Mentor</span>
        </button>
      </div>
    );
  }

  // Floating Drawer / Panel when open
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: isExpanded ? 'min(760px, calc(100vw - 48px))' : 'min(450px, calc(100vw - 48px))',
        height: isExpanded ? 'min(820px, calc(100vh - 48px))' : 'min(620px, calc(100vh - 48px))',
        maxHeight: 'calc(100vh - 48px)',
        maxWidth: 'calc(100vw - 48px)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 999,
        overflow: 'hidden',
        transition: 'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Sparkles size={14} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>AI Study Mentor</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PiAPI {DEFAULT_AI_MODEL}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Restore standard size' : 'Expand chat'}
            aria-label={isExpanded ? 'Restore standard size' : 'Expand chat'}
            style={{
              background: isExpanded ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: isExpanded ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              color: isExpanded ? 'var(--accent-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '5px 7px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--border-subtle)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isExpanded) {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            title="Close chat"
            aria-label="Close chat"
            style={{
              background: 'transparent',
              border: '1px solid transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '5px 7px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'var(--border-subtle)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div
        style={{
          flex: 1,
          padding: isExpanded ? '18px 20px' : '16px',
          overflowY: 'auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Bot size={13} />
                </div>
              )}

              <div
                style={{
                  maxWidth: isExpanded ? '80%' : '86%',
                  padding: isExpanded ? '12px 16px' : '10px 14px',
                  borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  background: isUser ? 'var(--accent-primary)' : 'var(--bg-app)',
                  color: isUser ? '#fff' : 'var(--text-primary)',
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: isExpanded ? 13.5 : 13,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {m.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
            <Sparkles size={14} className="animate-spin" color="var(--accent-primary)" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Prompts */}
      <div
        style={{
          padding: '8px 14px',
          background: 'var(--bg-app)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {contextPrompts.slice(0, isExpanded ? 4 : 3).map((prompt, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            style={{
              padding: '5px 12px',
              borderRadius: '999px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: 11.5,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input field */}
      <div
        style={{
          padding: '11px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-surface)',
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask mentor about this page..."
          style={{
            flex: 1,
            padding: '9px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !inputMessage.trim()}
          title="Send message"
          aria-label="Send message"
          style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-primary)',
            color: '#fff',
            border: 'none',
            cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
