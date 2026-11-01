// PiAPI AI Service for CRO Lab
// Endpoint: https://api.piapi.ai/v1/chat/completions
// Model: gpt-4o-mini (default, configurable via PIAPI_MODEL or VITE_PIAPI_MODEL)

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiCompletionOptions {
  messages: ChatMessage[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

const API_URL = 'https://api.piapi.ai/v1/chat/completions';
export const DEFAULT_AI_MODEL =
  import.meta.env.PIAPI_MODEL || import.meta.env.VITE_PIAPI_MODEL || 'gpt-4o-mini';

/**
 * Get active PiAPI Key from environment (.env / Vercel env)
 */
export function getPiApiKey(): string {
  return (
    import.meta.env.PIAPI_API_KEY ||
    import.meta.env.VITE_PIAPI_API_KEY ||
    ''
  ).trim();
}

/**
 * Check if a valid API key is currently configured
 */
export function hasPiApiKey(): boolean {
  const key = getPiApiKey();
  return Boolean(key && key.length >= 8);
}

/**
 * Test API key connection with a lightweight prompt
 */
export async function testPiApiConnection(): Promise<{ success: boolean; message: string }> {
  const activeKey = getPiApiKey();
  if (!activeKey) {
    return {
      success: false,
      message: 'PIAPI_API_KEY is not defined in your environment (.env).',
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeKey}`,
        'X-API-KEY': activeKey,
      },
      body: JSON.stringify({
        model: DEFAULT_AI_MODEL,
        messages: [
          { role: 'user', content: 'Say "CRO Lab AI Connected" and nothing else.' }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return {
        success: false,
        message: `API returned status ${response.status}: ${errorText.slice(0, 120) || response.statusText}`,
      };
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'Connected successfully';
    return { success: true, message: reply };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error connecting to PiAPI endpoint' };
  }
}

/**
 * Execute chat completion with PiAPI gpt-4o-mini with intelligent fallback
 */
export async function callPiApiChat(options: AiCompletionOptions): Promise<string> {
  const apiKey = getPiApiKey();

  const fullMessages: ChatMessage[] = [];
  if (options.systemPrompt) {
    fullMessages.push({ role: 'system', content: options.systemPrompt });
  }
  fullMessages.push(...options.messages);

  if (apiKey) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-API-KEY': apiKey,
        },
        body: JSON.stringify({
          model: DEFAULT_AI_MODEL,
          messages: fullMessages,
          temperature: options.temperature ?? 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errMsg = errorData?.error?.message || errorData?.message || `HTTP error ${response.status}`;
        console.warn(`PiAPI error (${response.status}):`, errMsg);
        // Fallback to specialized offline CRO response
        return generateOfflineCroResponse(fullMessages);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content && typeof content === 'string') {
        return content.trim();
      }
    } catch (err) {
      console.warn('PiAPI call failed, falling back to simulated intelligence:', err);
      return generateOfflineCroResponse(fullMessages);
    }
  }

  // If no API key provided or network fails, run offline simulated expert mode
  return generateOfflineCroResponse(fullMessages);
}

/**
 * Domain-specific offline CRO engine providing high-fidelity responses when offline or before API key setup
 */
function generateOfflineCroResponse(messages: ChatMessage[]): string {
  const systemMsg = messages.find((m) => m.role === 'system')?.content || '';
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const lower = lastUserMsg.toLowerCase();

  // Check if this inquiry originates from a specific lesson
  const lessonMatch = systemMsg.match(/lesson "([^"]+)"/i) || systemMsg.match(/lesson: "([^"]+)"/i);
  const lessonTitle = lessonMatch ? lessonMatch[1] : '';

  if (lessonTitle) {
    if (lower.includes('analogy') || lower.includes('explain simply') || lower.includes('simple')) {
      return `### 💡 Real-World Analogy for "${lessonTitle}"

Think of your Shopify storefront like a **high-end physical retail boutique on a busy shopping street**:

1. **The Window Display (Top of Funnel / First Impression)**:
   Visitors walk past quickly. If your storefront window is cluttered with 10 different neon discount signs, people assume it's low quality and keep walking. If you clearly present your hero product with an obvious price and value proposition, qualified buyers step inside.

2. **The Sales Assistant (Friction Removal)**:
   In our lesson on **${lessonTitle}**, we're designing the digital equivalent of an attentive assistant. Rather than making the customer search through the store for their size or carry a heavy basket across three floors, we place the sizing tools and checkout actions directly in their natural path.

3. **The Checkout Counter (Moment of Commitment)**:
   Every extra obstacle—a hidden size chart, unexpected shipping fees, or an unresponsive button—is like an unexpected queue at the cash register. By implementing the principles from this lesson, you eliminate the cognitive hesitation that causes 70%+ of shoppers to walk out empty-handed.`;
    }

    if (lower.includes('liquid') || lower.includes('code') || lower.includes('javascript') || lower.includes('implement')) {
      return `### 🛍️ Production Shopify Liquid & JS Pattern: ${lessonTitle}

Here is a modular, production-ready pattern for implementing **${lessonTitle}** within a Shopify Online Store 2.0 theme:

\`\`\`liquid
{% comment %}
  snippets/cro-${lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.liquid
  Optimized implementation pattern with zero layout shift (CLS)
{% endcomment %}

<div 
  class="cro-enhanced-surface"
  data-cro-feature="${lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"
  id="CroFeature-{{ section.id }}"
>
  {% if section.settings.heading != blank %}
    <h3 class="cro-heading">{{ section.settings.heading | escape }}</h3>
  {% endif %}

  <div class="cro-surface-body">
    {% comment %} Core interactive logic for this lesson {% endcomment %}
    <button 
      type="button" 
      class="btn btn-primary cro-action-btn"
      data-action="execute-intent"
    >
      {{ section.settings.button_label | default: 'Take Action' }}
    </button>
  </div>
</div>

<script>
(() => {
  const container = document.getElementById('CroFeature-{{ section.id }}');
  if (!container) return;

  // Use Section Rendering API to preserve state asynchronously
  const actionBtn = container.querySelector('[data-action="execute-intent"]');
  actionBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      // Execute optimized action without full page reload
      const res = await fetch(\`\${window.Shopify.routes.root}?sections={{ section.id }}\`);
      const data = await res.json();
      console.log('Section updated asynchronously:', data);
    } catch (err) {
      console.error('Async update error:', err);
    }
  });
})();
</script>
\`\`\`

**Key Architecture Guardrails:**
- Enclose within schema blocks in \`sections/*.liquid\` so merchants can configure copy without code edits.
- Defer non-critical JavaScript to safeguard **Largest Contentful Paint (LCP)**.
- Ensure all touch targets meet Apple's **44x44px minimum** requirement for mobile Safari.`;
    }

    if (lower.includes('quiz') || lower.includes('test') || lower.includes('question')) {
      return `### 🧠 Scenario Challenge on "${lessonTitle}"

Let's test your practical CRO engineering skills with a realistic client scenario:

**The Scenario:**
> A Shopify Plus apparel brand with 80,000 monthly sessions ($85 AOV, 2.1% baseline CVR) implements a change based on **${lessonTitle}**. 
> After 14 days of testing, their variant shows:
> - **Add-to-Cart (ATC) rate:** +18% lift (p < 0.01)
> - **Checkout Completion rate:** -14% drop (p < 0.02)
> - **Overall Orders:** Flat (+0.8%, p = 0.42)
> 
> The marketing director wants to deploy the change immediately because *"ATC is up by +18%, so it's a huge win!"*

**Your Question:**
1. Why is the marketing director wrong to declare this test a winner?
2. What specific friction leak or cognitive trap was likely introduced between the Cart and Checkout stages?

*Reply below with your diagnosis and how you would explain this to the merchant!*`;
    }

    if (lower.includes('pitch') || lower.includes('client') || lower.includes('merchant') || lower.includes('founder')) {
      return `### 💼 Executive Pitch Script: "${lessonTitle}"

When pitching this test to a store founder or agency client, frame the proposal in **annualized gross profit**, not technical jargon:

> *"Right now, on your store's ~50,000 monthly visitors at an $80 Average Order Value, even a small 8% relative lift in conversion from this optimization adds **+$38,400 in net new revenue every single year**—without spending a single extra dollar on Meta or Google ads.*
>
> *Specifically regarding **${lessonTitle}**, we observed that visitors are experiencing significant friction right before completing their purchase. By removing this barrier and streamlining the technical interaction, we capture buyers who already have intent but are currently dropping off.*
>
> *We will test this as a clean, zero-flicker A/B test with statistical significance guardrails, so there is zero downside risk to your live revenue."*

**Pro-Tip:** Always pair this pitch with an estimated timeline: 3 days to build, 14 days of test runtime, and a conclusive reporting presentation.`;
    }

    if (lower.includes('math') || lower.includes('calculate') || lower.includes('formula') || lower.includes('rps')) {
      return `### 📐 Telemetry & Financial Modeling: ${lessonTitle}

Here is the exact conversion math model used to evaluate the commercial viability of this test:

#### 1. The Core Metrics Equation
- **Conversion Rate (CVR):** $\\text{CVR} = \\frac{\\text{Orders}}{\\text{Sessions}} \\times 100$
- **Revenue Per Session (RPS):** $\\text{RPS} = \\frac{\\text{Total Revenue}}{\\text{Total Sessions}} = \\left(\\frac{\\text{CVR}}{100}\\right) \\times \\text{AOV}$

#### 2. Worked 50,000 Session Case Study
- **Baseline:** 50,000 sessions × 2.0% CVR = 1,000 orders. At $80 AOV $\\rightarrow$ **$80,000 Gross Revenue** (RPS = $1.60).
- **Variant (+10% relative lift):** 50,000 sessions × 2.2% CVR = 1,100 orders. At $80 AOV $\\rightarrow$ **$88,000 Gross Revenue** (RPS = $1.76).
- **Monthly Net Lift:** +$8,000 / month.
- **Annualized Value:** **+$96,000 / year** in compounding revenue.

*Guardrail Metric: Always monitor Refund Rate and AOV to confirm that the CVR lift does not erode net contribution margin!*`;
    }
  }

  // Knowledge testing / Socratic evaluation
  if (lower.includes('srm') || lower.includes('sample ratio')) {
    return `### 🔍 Analysis of Sample Ratio Mismatch (SRM)

**What it means:**
A Sample Ratio Mismatch occurs when the observed traffic split between Variant A and Variant B deviates statistically from the intended allocation (e.g. expecting 50/50 but observing 54/46 with p < 0.001).

**Why it's fatal in CRO:**
1. **Selection Bias**: The traffic difference is rarely random. It usually means one variant crashed on a specific browser (e.g., Safari iOS), redirected bots differently, or took longer to load.
2. **Invalidates Results**: You cannot trust *any* conversion uplift if an SRM exists. Any observed win is likely an artifact of unequal user filtering.

**How to handle this with a client:**
> *"We cannot declare this test a winner because our statistical telemetry detected an SRM (p < 0.001). This indicates a technical glitch in how users were assigned, likely filtering out specific mobile devices. We must fix the tracking implementation before trusting the numbers."*

**Your Next Step**: Always run a Pearson's Chi-Square Goodness-of-Fit test on visitor counts before reading conversion rates!`;
  }

  if (lower.includes('client') && (lower.includes('redesign') || lower.includes('pretty'))) {
    return `### 💼 Handling the "I Just Want to Redesign Everything" Client

This is one of the most common client traps in Shopify ecommerce. Here is how senior CRO consultants handle this objection:

#### 1. Acknowledge and Validate First
*"I completely understand why you want a fresh, modern aesthetic for the brand. Looking at newer competitors creates an urgency to revamp."*

#### 2. Introduce the "Airplane Mid-Flight" Analogy
*"Redesigning an entire store without isolated A/B testing is like replacing the engine, wings, and cockpit of an airplane while it's in the air with passengers. If conversion drops by 20% after launch, which specific change caused it? The new header? The font size? The removed trust badges? It's impossible to diagnose."*

#### 3. Propose the "De-risked Iterative Redesign" Framework:
1. **Benchmark current conversion drivers**: Map what is currently making money so we don't accidentally delete high-converting assets.
2. **Modular Rollout**: Test the new Product Detail Page (PDP) hero block first as Variant B vs Current.
3. **Compound Wins**: Prove a +12% lift on PDP before touching the cart or checkout.

This protects their revenue while delivering the modern aesthetic they crave!`;
  }

  if (lower.includes('stop') && (lower.includes('day') || lower.includes('early'))) {
    return `### 🛑 Handling "Can We Stop The Test Early?"

**The Client Scenario:**
Your client sees Variant B is +35% higher after only 3 days and says: *"Stop the test now, deploy it to 100%, and let's start making money!"*

#### Why this will kill their store revenue:
1. **Day-of-Week Effect**: Weekend shoppers convert very differently from Monday-to-Wednesday work-break shoppers. A 3-day test misses weekly seasonality.
2. **Regression to the Mean (Peeking Problem)**: Tests naturally experience wild variance in early hours. Early winners frequently regress to flat or even negative as sample size matures.
3. **Novelty Effect**: Existing repeat customers click unfamiliar new buttons out of curiosity, not long-term intent.

#### The Script to Send the Client:
> *"I'm thrilled to see the early positive signals on Variant B! However, stopping early would be like calling a marathon after the first 2 miles. We need at least 1 full business cycle (minimum 14 days) and 350+ conversions per variation to prevent 'false positives' caused by weekly shopping habits. Let's let this run so we are 95% confident this revenue is real and permanent."*`;
  }

  // General CRO assistance fallback
  return `### 🧠 CRO Lab Expert Mentor Insights

You are analyzing:
*"${lastUserMsg.slice(0, 140)}${lastUserMsg.length > 140 ? '...' : ''}"*

Here are the 3 core CRO principles to apply immediately:

1. **Root-Cause Telemetry over Opinion**:
   - Never debate opinions with store owners or developers. Always ground the decision in Google Analytics 4 drop-off funnels, session heatmaps, or page speed metrics (LCP, INP).
2. **Heuristic Hierarchy (MECLABS Conversion Formula)**:
   - Motivation > Value Proposition > Incentive minus Friction > Anxiety.
   - Most merchants try to reduce anxiety (adding seals) when their real problem is weak value proposition above the fold.
3. **Clear Scientific Hypothesis Structure**:
   - *"If we [implement specific change], then [primary KPI] will increase by [X]%, because [consumer psychology / reduction of cognitive load]."*

*Tip: Connect a valid API key in .env (\`PIAPI_API_KEY\`) to enable live real-time completions with the **${DEFAULT_AI_MODEL}** model!*`;
}
