import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Download,
  ExternalLink,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  ShoppingCart,
  Palette,
  Gauge,
  Repeat,
  Mail,
  Copy,
  Check,
  RotateCcw,
  Plus,
  ChevronRight,
  X,
  Send,
  Building2,
  BarChart3,
  Globe,
  Tag,
  ShieldCheck,
  Bot,
  Lightbulb,
  ArrowUpRight,
  Layers,
  Eye,
  Smartphone,
  MousePointerClick,
  LayoutTemplate,
} from 'lucide-react';
import {
  Lead,
  Candidate,
  scanDomain,
  runPageSpeed,
  scoreLead,
  analyzeLead,
  discoverCandidates,
  leadsToCsv,
  DiscoveryCriteria,
} from '../services/prospectorService';
import { CURATED_PROSPECT_LEADS } from '../data/curatedLeads';
import { hasPiApiKey } from '../services/aiService';

const STORAGE_PIPELINE_KEY = 'cro_lab_prospect_pipeline_v2_design';

export const StoreProspectorPage: React.FC = () => {
  // Main Leads Pipeline State
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PIPELINE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Strictly retain only verified Shopify stores
          const valid = parsed.filter((l: Lead) => l.scan?.isShopify && l.status !== 'rejected');
          if (valid.length > 0) return valid;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved leads, using curated defaults:', e);
    }
    return CURATED_PROSPECT_LEADS;
  });

  // Selected Lead for Detail Modal / Teardown View
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Quick Single-Domain Scan State
  const [manualDomain, setManualDomain] = useState('');
  const [isManualScanning, setIsManualScanning] = useState(false);
  const [manualScanError, setManualScanError] = useState<string | null>(null);

  // AI Discovery Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiCriteria, setAiCriteria] = useState<DiscoveryCriteria>({
    niche: 'Boutique Coffee, Ceramics & Craft Goods',
    market: 'US / North America',
    priceTier: 'Boutique & Craft ($30–$120)',
    size: 'Sweet Spot (300–20,000 monthly visitors)',
    count: 5,
    notes: 'Look for boutique stores with 300 to 20,000 monthly visitors and visible design flaws (stock theme feel, wrapping navigation menus, unstyled flavor/material notes, missing sticky mobile buy bar).',
  });
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);
  const [discoveryStatusText, setDiscoveryStatusText] = useState('');

  // Copy Feedback State
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Re-analyzing individual lead state
  const [analyzingLeadId, setAnalyzingLeadId] = useState<string | null>(null);

  // Persist pipeline to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PIPELINE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Failed to persist leads to localStorage:', e);
    }
  }, [leads]);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Export to CSV
  const handleExportCsv = () => {
    const csv = leadsToCsv(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopify-design-prospects-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to Curated
  const handleResetToCurated = () => {
    if (window.confirm('Reset your prospect pipeline back to the 5 curated boutique stores (300–20k visitors with obvious design leaks)?')) {
      setLeads(CURATED_PROSPECT_LEADS);
      setSelectedLeadId(null);
    }
  };

  // Process a candidate domain: Live Scan -> Score Design Flaws -> AI Teardown
  const processCandidate = async (candidate: Candidate): Promise<Lead> => {
    const leadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newLead: Lead = {
      id: leadId,
      candidate,
      status: 'scanning',
      addedAt: new Date().toISOString(),
    };

    try {
      // Step 1: Live Storefront & API Scan
      const scan = await scanDomain(candidate.domain);
      newLead.scan = scan;

      if (!scan.reachable || !scan.isShopify) {
        newLead.status = 'rejected';
        newLead.scores = {
          traffic: 0,
          trafficTier: 'Unverified',
          estimatedMonthlyVisitsRange: 'Unverified',
          designScore: 0,
          catalog: 0,
          opportunity: 0,
          fit: 0,
          grade: 'D',
          trafficEvidence: [scan.reachable ? 'Not recognized as a Shopify store' : (scan.error || 'Domain unreachable')],
          designEvidence: [],
          qualified: false,
          disqualifyReason: scan.reachable ? 'Non-Shopify platform' : 'Site unreachable',
        };
        return newLead;
      }

      // Step 2: Deterministic Scoring (Prioritizes Visual Design Flaws + 300-20k Traffic Sweet Spot)
      newLead.status = 'scored';
      const { scores, gaps } = scoreLead(scan);
      newLead.scores = scores;
      newLead.gaps = gaps;

      // Step 3: Run AI Grounded Teardown Analysis if API Key available
      if (hasPiApiKey() && scores.qualified) {
        try {
          newLead.status = 'analyzing';
          const insight = await analyzeLead(newLead);
          newLead.insight = insight;
        } catch (err: any) {
          console.warn('AI Analysis failed for', candidate.domain, err);
          newLead.insightError = err.message || 'AI analysis timed out';
        }
      }

      newLead.status = 'done';
      return newLead;
    } catch (err: any) {
      newLead.status = 'error';
      newLead.scores = {
        traffic: 0,
        trafficTier: 'Unverified',
        estimatedMonthlyVisitsRange: 'Unverified',
        designScore: 0,
        catalog: 0,
        opportunity: 0,
        fit: 0,
        grade: 'D',
        trafficEvidence: [err.message || 'Scan network failure'],
        designEvidence: [],
        qualified: false,
        disqualifyReason: err.message,
      };
      return newLead;
    }
  };

  // Run Manual Domain Scan
  const handleManualScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanDomain = manualDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!cleanDomain || !cleanDomain.includes('.')) {
      setManualScanError('Please enter a valid domain (e.g. brand.com)');
      return;
    }

    setManualScanError(null);
    setIsManualScanning(true);

    try {
      const candidate: Candidate = {
        domain: cleanDomain,
        brand: cleanDomain.split('.')[0].toUpperCase(),
        reason: 'User submitted store domain for storefront design & visual flaw scan.',
        source: 'manual',
      };

      const completedLead = await processCandidate(candidate);

      if (!completedLead.scan?.reachable) {
        setManualScanError(`Could not connect to ${cleanDomain}. Domain is unreachable.`);
        return;
      }
      if (!completedLead.scan?.isShopify) {
        const detected = completedLead.scan?.detectedPlatform || 'WordPress/WooCommerce, Squarespace, or custom';
        setManualScanError(`"${cleanDomain}" is not built on Shopify (Detected: ${detected}). The Store Leads Finder strictly requires Shopify stores.`);
        return;
      }

      setLeads((prev) => [completedLead, ...prev.filter((l) => l.scan?.domain !== cleanDomain)]);
      setManualDomain('');
      setSelectedLeadId(completedLead.id);
    } catch (err: any) {
      setManualScanError(err.message || 'Scan failed');
    } finally {
      setIsManualScanning(false);
    }
  };

  // Run AI Discovery Generator
  const handleRunAiDiscovery = async () => {
    setDiscoveryError(null);
    setIsDiscovering(true);
    setDiscoveryStatusText('Discovering boutique Shopify stores with 300–20,000 monthly visitors...');

    try {
      const existingDomains = leads.map((l) => l.scan?.domain || l.candidate.domain);
      const candidates = await discoverCandidates(aiCriteria, existingDomains);

      if (candidates.length === 0) {
        throw new Error('AI could not identify new candidate stores matching these criteria. Try broadening the niche or market.');
      }

      setDiscoveryStatusText(`Auditing candidates against live Shopify detection...`);

      const verifiedShopifyList: Lead[] = [];
      for (let i = 0; i < candidates.length; i++) {
        const c = candidates[i];
        setDiscoveryStatusText(`Verifying Shopify storefront (${i + 1}/${candidates.length}): ${c.domain}... (${verifiedShopifyList.length}/${aiCriteria.count} verified)`);
        const lead = await processCandidate(c);

        // STRICT GATEKEEPING: Only add 100% verified Shopify stores!
        if (lead.scan?.reachable && lead.scan?.isShopify && lead.status !== 'rejected') {
          verifiedShopifyList.push(lead);
          if (verifiedShopifyList.length >= aiCriteria.count) {
            break; // Target count of verified Shopify stores met
          }
        } else {
          console.warn(`[Prospector] Filtered out non-Shopify store: ${c.domain}`);
        }
      }

      if (verifiedShopifyList.length === 0) {
        throw new Error('None of the candidate stores were verified as active Shopify stores. Try another niche or market.');
      }

      setLeads((prev) => [...verifiedShopifyList, ...prev]);
      setIsAiModalOpen(false);
      if (verifiedShopifyList[0]) setSelectedLeadId(verifiedShopifyList[0].id);
    } catch (err: any) {
      setDiscoveryError(err.message || 'Discovery failed');
    } finally {
      setIsDiscovering(false);
      setDiscoveryStatusText('');
    }
  };

  // Trigger individual lead AI analysis if missing or failed
  const handleTriggerAnalysis = async (leadId: string) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead || !targetLead.scan) return;

    setAnalyzingLeadId(leadId);
    try {
      const insight = await analyzeLead(targetLead);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, insight, insightError: undefined } : l))
      );
    } catch (err: any) {
      alert(`AI Analysis failed: ${err.message}`);
    } finally {
      setAnalyzingLeadId(null);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    // STRICT GATEKEEPING: Never display non-Shopify or rejected stores in the prospect cards/table
    if (lead.scan && !lead.scan.isShopify) return false;
    if (lead.status === 'rejected') return false;

    const d = lead.scan?.domain || lead.candidate.domain;
    const b = lead.scan?.shop.name || lead.candidate.brand || '';
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.toLowerCase().includes(q) || b.toLowerCase().includes(q);

    const matchesGrade =
      selectedGrade === 'all' || (lead.scores && lead.scores.grade === selectedGrade);

    const matchesArea =
      selectedArea === 'all' ||
      (selectedArea === 'SweetSpot' && lead.scores?.trafficTier === 'Sweet Spot (300–20k)') ||
      (lead.gaps && lead.gaps.some((g) => g.area.toLowerCase() === selectedArea.toLowerCase()));

    return matchesSearch && matchesGrade && matchesArea;
  });

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  // Pipeline Summary Stats
  const sweetSpotCount = leads.filter((l) => l.scores?.trafficTier === 'Sweet Spot (300–20k)').length;
  const gradeACount = leads.filter((l) => l.scores?.grade === 'A').length;
  const avgDesignScore =
    leads.length > 0
      ? Math.round(leads.reduce((acc, l) => acc + (l.scores?.designScore || l.scores?.opportunity || 0), 0) / leads.length)
      : 0;

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.35)',
              }}
            >
              <Eye size={18} color="#fff" />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 24,
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Shopify Store Design Scout & Lead Finder
            </h1>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '3px 9px',
                borderRadius: 999,
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#a855f7',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              Sweet Spot: 300–20k Visitors · Design-First
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            Identify boutique Shopify stores with proven active traffic (300 to 20,000 monthly visitors) that have obvious visual design flaws the store owner can see and immediately agree to fix.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            <Sparkles size={16} />
            <span>Discover Stores with AI</span>
          </button>

          <button
            onClick={handleExportCsv}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: 13,
              fontWeight: 600,
              border: '1px solid var(--border-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleResetToCurated}
            title="Reset pipeline to 5 curated boutique sweet-spot stores"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Target Traffic Sweet Spot
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#10b981' }}>
              {sweetSpotCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              stores in 300–20k visits/mo range
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Prime Visual Redesign Targets
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#8b5cf6' }}>
              {gradeACount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Grade A (Highest visual redesign fit)
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Avg Design Opportunity Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>
              {avgDesignScore}%
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Density of visible UI & layout flaws
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Design Signal Engine
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
              Active (Theme, Nav, Sticky ATC, Powered-By)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Scan Input Bar */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-muted)',
          borderRadius: 'var(--radius-lg)',
          padding: 16,
          marginBottom: 24,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        }}
      >
        <form
          onSubmit={handleManualScan}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200 }}>
            <Palette size={18} color="#8b5cf6" />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              Scan Store for Design Flaws:
            </span>
          </div>

          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <input
              type="text"
              value={manualDomain}
              onChange={(e) => setManualDomain(e.target.value)}
              placeholder="Enter Shopify store domain (e.g. parlorcoffee.com, craighill.co, brand.com)"
              disabled={isManualScanning}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-app)',
                border: '1px solid var(--border-muted)',
                color: 'var(--text-primary)',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isManualScanning || !manualDomain.trim()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              background: isManualScanning ? 'var(--bg-surface-active)' : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: isManualScanning || !manualDomain.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isManualScanning ? (
              <>
                <Clock size={16} className="spin-animation" />
                <span>Scanning Design Signals...</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>Audit Storefront Design</span>
              </>
            )}
          </button>
        </form>

        {manualScanError && (
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <AlertTriangle size={14} />
            <span>{manualScanError}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              flex: 1,
              maxWidth: 360,
            }}
          >
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name or domain..."
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: 12.5,
                outline: 'none',
                width: '100%',
              }}
            />
            {searchQuery && (
              <X
                size={14}
                color="var(--text-muted)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>

          {/* Grade Filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: 12,
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Grades</option>
            <option value="A">Grade A (Prime Redesign Target)</option>
            <option value="B">Grade B (Good Visual Opportunities)</option>
            <option value="C">Grade C (Moderate)</option>
            <option value="D">Grade D (Low)</option>
          </select>

          {/* Focus Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: 12,
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Focus Areas</option>
            <option value="SweetSpot">🎯 Sweet Spot (300–20k Visits)</option>
            <option value="Design">🎨 Visual & Layout Flaws</option>
            <option value="CRO">⚡ Secondary CRO Notes</option>
            <option value="AOV">💰 Secondary AOV Notes</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: 2,
          }}
        >
          <button
            onClick={() => setViewMode('cards')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: viewMode === 'cards' ? 'var(--bg-surface-active)' : 'transparent',
              color: viewMode === 'cards' ? 'var(--text-primary)' : 'var(--text-muted)',
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cards View
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: viewMode === 'table' ? 'var(--bg-surface-active)' : 'transparent',
              color: viewMode === 'table' ? 'var(--text-primary)' : 'var(--text-muted)',
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Main Results View */}
      {filteredLeads.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px dashed var(--border-muted)',
            borderRadius: 'var(--radius-lg)',
            padding: 48,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Search size={22} color="#8b5cf6" />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            No stores match the current filter
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 16px' }}>
            Try clearing the search query or use the AI Discovery tool above to find fresh boutique stores with 300–20,000 monthly visitors.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGrade('all');
              setSelectedArea('all');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-active)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-muted)',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Cards View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))',
            gap: 18,
          }}
        >
          {filteredLeads.map((lead) => {
            const scan = lead.scan;
            const scores = lead.scores;
            const gradeColor =
              scores?.grade === 'A'
                ? '#8b5cf6'
                : scores?.grade === 'B'
                ? '#10b981'
                : scores?.grade === 'C'
                ? '#f59e0b'
                : '#ef4444';

            const isSweetSpot = scores?.trafficTier === 'Sweet Spot (300–20k)';

            return (
              <div
                key={lead.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: isSweetSpot ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  position: 'relative',
                  boxShadow: isSweetSpot ? '0 4px 20px rgba(139, 92, 246, 0.06)' : undefined,
                }}
              >
                {/* Card Top: Brand, Domain, Grade */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          margin: 0,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {scan?.shop.name || lead.candidate.brand || lead.candidate.domain}
                      </h3>
                      {scan?.shop.country && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: 4,
                            background: 'var(--bg-surface-active)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {scan.shop.country}
                        </span>
                      )}
                    </div>

                    <a
                      href={`https://${scan?.domain || lead.candidate.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        color: 'var(--accent-primary)',
                        textDecoration: 'none',
                        marginTop: 2,
                      }}
                    >
                      <span>{scan?.domain || lead.candidate.domain}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Fit Grade Pill */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: `${gradeColor}18`,
                        border: `1px solid ${gradeColor}40`,
                        color: gradeColor,
                        fontSize: 12,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>Grade {scores?.grade || 'N/A'}</span>
                      <span style={{ fontSize: 10, opacity: 0.85 }}>({scores?.fit || 0}% Fit)</span>
                    </div>
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: isSweetSpot ? '#10b981' : 'var(--text-muted)',
                        marginTop: 3,
                      }}
                    >
                      {scores?.trafficTier || '300–20k Visitors'}
                    </span>
                  </div>
                </div>

                {/* Visual Signals / Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                  {/* Sweet Spot Traffic Badge */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    🎯 {scores?.estimatedMonthlyVisitsRange || '300–20,000 / mo'}
                  </span>

                  {/* Powered By Shopify Badge */}
                  {scan?.signals.hasPoweredByShopify && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: 'rgba(239, 68, 68, 0.12)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      ⚠️ "Powered by Shopify" in footer
                    </span>
                  )}

                  {/* Theme Info */}
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'var(--bg-surface-active)',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    Theme: {scan?.theme.schemaName || scan?.theme.name || (scan?.theme.isDawnFamily ? 'Dawn-Family' : 'Custom')}
                  </span>
                </div>

                {/* Measured Catalog & Design Indicators */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 8,
                    background: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Design Score</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#8b5cf6', marginTop: 2 }}>
                      {scores?.designScore ?? 75}/100
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Catalog Items</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                      {scan?.shop.publishedProducts ?? scan?.catalog.sampled ?? 'N/A'} products
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Median Price</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                      {scan?.shop.currency || '$'}{scan?.catalog.medianPrice ?? 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Obvious Visual Design Flaws List */}
                <div style={{ flex: 1, marginBottom: 16 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Eye size={13} color="#8b5cf6" />
                    <span>Clear Visual Flaws Owner Can See ({lead.insight?.visualDesignProblems?.length || lead.gaps?.length || 0})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {lead.insight?.visualDesignProblems ? (
                      lead.insight.visualDesignProblems.slice(0, 3).map((vdp, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            padding: '7px 9px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-app)',
                            borderLeft: '2px solid #8b5cf6',
                          }}
                        >
                          <Palette size={13} color="#8b5cf6" style={{ marginTop: 2, flexShrink: 0 }} />
                          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                            <strong style={{ color: 'var(--text-primary)' }}>{vdp.flaw}:</strong> {vdp.whatOwnerSees}
                          </div>
                        </div>
                      ))
                    ) : (
                      lead.gaps?.slice(0, 3).map((gap) => (
                        <div
                          key={gap.id}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            padding: '6px 8px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-app)',
                            borderLeft: `2px solid ${gap.severity === 'high' ? 'var(--danger)' : '#8b5cf6'}`,
                          }}
                        >
                          <span style={{ marginTop: 2 }}>
                            {gap.area === 'Design' ? <Palette size={12} color="#8b5cf6" /> : <Eye size={12} color="#10b981" />}
                          </span>
                          <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                            <strong style={{ color: 'var(--text-primary)' }}>[{gap.area}]</strong> {gap.title}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => setSelectedLeadId(lead.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '9px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(139, 92, 246, 0.12)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>Inspect Visual Design Flaws & Pitch</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-app)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Grade</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Store / Domain</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Traffic Window</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Catalog Depth</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Primary Visual Design Flaw</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const s = lead.scores;
                const sc = lead.scan;
                const topFlaw = lead.insight?.visualDesignProblems?.[0]?.flaw || lead.gaps?.[0]?.title || 'Stock theme polish needed';
                return (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background 0.1s ease',
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          background:
                            s?.grade === 'A'
                              ? 'rgba(139, 92, 246, 0.15)'
                              : s?.grade === 'B'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(245, 158, 11, 0.15)',
                          color:
                            s?.grade === 'A'
                              ? '#8b5cf6'
                              : s?.grade === 'B'
                              ? '#10b981'
                              : '#f59e0b',
                        }}
                      >
                        Grade {s?.grade || 'D'} ({s?.fit || 0}%)
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {sc?.shop.name || lead.candidate.brand}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {sc?.domain || lead.candidate.domain}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>
                        {s?.estimatedMonthlyVisitsRange || s?.trafficTier}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                      {sc?.shop.publishedProducts ?? sc?.catalog.sampled ?? 'N/A'} items
                    </td>
                    <td style={{ padding: '12px 16px', maxWidth: 360 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>
                        {topFlaw}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => setSelectedLeadId(lead.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(139, 92, 246, 0.12)',
                          color: '#8b5cf6',
                          border: 'none',
                          fontSize: 11.5,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Open Dossier
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAILED TEARDOWN & COLD PITCH MODAL / DRAWER */}
      {selectedLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setSelectedLeadId(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 920,
              maxHeight: '92vh',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-app)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {selectedLead.scan?.shop.name || selectedLead.candidate.brand} — Visual Redesign Dossier
                  </h2>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(139, 92, 246, 0.15)',
                      color: '#8b5cf6',
                    }}
                  >
                    Grade {selectedLead.scores?.grade} ({selectedLead.scores?.fit}% Fit)
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                    }}
                  >
                    🎯 Sweet Spot: {selectedLead.insight?.estimatedMonthlyVisits || selectedLead.scores?.estimatedMonthlyVisitsRange || '300–20,000 / mo'}
                  </span>
                </div>
                <a
                  href={`https://${selectedLead.scan?.domain || selectedLead.candidate.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    marginTop: 4,
                  }}
                >
                  <span>https://{selectedLead.scan?.domain || selectedLead.candidate.domain}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <button
                onClick={() => setSelectedLeadId(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 6,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {/* Executive Summary */}
              {selectedLead.insight ? (
                <div
                  style={{
                    background: 'rgba(139, 92, 246, 0.06)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', marginBottom: 4 }}>
                    Storefront Design Teardown Summary
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-primary)', margin: 0, lineHeight: 1.55 }}>
                    {selectedLead.insight.summary}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 16,
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: '1px solid rgba(139, 92, 246, 0.15)',
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Monthly Visitor Sweet Spot: </span>
                      <strong style={{ color: '#10b981' }}>{selectedLead.insight.estimatedMonthlyVisits || '300–20,000 / mo'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Estimated Revenue: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedLead.insight.estimatedMonthlyRevenue || '$15k–$70k / mo'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Pitch Angle: </span>
                      <strong style={{ color: '#8b5cf6' }}>{selectedLead.insight.pitchAngle || 'Direct Visual Polish'}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 14,
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                    AI deep-dive design teardown has not been generated for this store yet.
                  </div>
                  <button
                    onClick={() => handleTriggerAnalysis(selectedLead.id)}
                    disabled={analyzingLeadId === selectedLead.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#8b5cf6',
                      color: '#fff',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: analyzingLeadId === selectedLead.id ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Sparkles size={14} />
                    <span>{analyzingLeadId === selectedLead.id ? 'Analyzing...' : 'Generate AI Design Teardown'}</span>
                  </button>
                </div>
              )}

              {/* Verified Store Metrics Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div style={{ background: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Store Traffic Window</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981', marginTop: 2 }}>
                    {selectedLead.scores?.estimatedMonthlyVisitsRange || '300–20,000 / mo'}
                  </div>
                </div>
                <div style={{ background: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Active Catalog</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
                    {selectedLead.scan?.shop.publishedProducts ?? selectedLead.scan?.catalog.sampled} items
                  </div>
                </div>
                <div style={{ background: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Median Price</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
                    {selectedLead.scan?.shop.currency || '$'}{selectedLead.scan?.catalog.medianPrice}
                  </div>
                </div>
                <div style={{ background: 'var(--bg-app)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Design Flaw Score</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#8b5cf6', marginTop: 2 }}>
                    {selectedLead.scores?.designScore ?? 80}/100 opportunity
                  </div>
                </div>
              </div>

              {/* PRIMARY FOCUS: Obvious Visual Design Problems (What the owner can see) */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Palette size={16} color="#8b5cf6" />
                  <span>Obvious Visual Design Flaws (Store Owner Can Instantly See)</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedLead.insight?.visualDesignProblems && selectedLead.insight.visualDesignProblems.length > 0 ? (
                    selectedLead.insight.visualDesignProblems.map((prob, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-app)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: 16,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)' }}>
                            {idx + 1}. {prob.flaw}
                          </span>
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 4,
                              background: 'rgba(139, 92, 246, 0.15)',
                              color: '#8b5cf6',
                            }}
                          >
                            {prob.expectedVisualImpact}
                          </span>
                        </div>
                        <div style={{ fontSize: 12.5, color: '#ef4444', marginBottom: 8, background: 'rgba(239, 68, 68, 0.06)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                          <strong>What the Owner Sees:</strong> {prob.whatOwnerSees}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', background: 'rgba(16, 185, 129, 0.06)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                          <strong style={{ color: '#10b981' }}>Proposed Design Fix:</strong> {prob.proposedDesignFix}
                        </div>
                      </div>
                    ))
                  ) : (
                    selectedLead.gaps?.map((gap) => (
                      <div
                        key={gap.id}
                        style={{
                          background: 'var(--bg-app)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: 12,
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                          [{gap.area}] {gap.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {gap.evidence}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Visual Design Wins */}
              {selectedLead.insight?.quickDesignWins && selectedLead.insight.quickDesignWins.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LayoutTemplate size={15} color="#10b981" />
                    <span>Quick Visual Polish Wins (High Visibility / Low Effort)</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 8 }}>
                    {selectedLead.insight.quickDesignWins.map((win, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-app)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: 12,
                          color: 'var(--text-primary)',
                        }}
                      >
                        <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0 }} />
                        <span>{win}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECONDARY SECTION: Subtle CRO & AOV Notes (LITTLE IMPORTANCE) */}
              {selectedLead.insight?.secondaryOpportunities && selectedLead.insight.secondaryOpportunities.length > 0 && (
                <div style={{ marginBottom: 24, opacity: 0.85 }}>
                  <h3 style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <TrendingUp size={13} color="var(--text-muted)" />
                    <span>Secondary Opportunities (CRO & AOV Notes — Minor Importance)</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 8 }}>
                    {selectedLead.insight.secondaryOpportunities.map((sec, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-app)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '10px 12px',
                        }}
                      >
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 3 }}>
                          [{sec.area}] {sec.title}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {sec.fix}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cold Email Pitch Leading with Visual Observations */}
              {selectedLead.insight?.coldEmail && (
                <div
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Mail size={16} color="#8b5cf6" />
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
                        Copy-Paste Design Outreach Email (Leads with Visible Storefront Flaws)
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `Subject: ${selectedLead.insight?.coldEmail.subject}\n\n${selectedLead.insight?.coldEmail.body}`,
                          'email'
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: 11.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {copiedKey === 'email' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      <span>{copiedKey === 'email' ? 'Copied Email!' : 'Copy Script'}</span>
                    </button>
                  </div>

                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                    <strong>Subject:</strong> {selectedLead.insight.coldEmail.subject}
                  </div>
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: 14,
                      borderRadius: 'var(--radius-md)',
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {selectedLead.insight.coldEmail.body}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-app)',
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Target Redesign Offer:{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {selectedLead.insight?.redesignOffer || 'Storefront Visual Polish & Mobile PDP Redesign'}
                </strong>
              </div>

              <button
                onClick={() => setSelectedLeadId(null)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-muted)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI DISCOVERY CRITERIA MODAL */}
      {isAiModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => {
            if (!isDiscovering) setIsAiModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 640,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-app)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={16} color="#fff" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  AI Store Scout (300–20k Visitors & Design Flaws)
                </h3>
              </div>

              <button
                onClick={() => setIsAiModalOpen(false)}
                disabled={isDiscovering}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: isDiscovering ? 'not-allowed' : 'pointer',
                  padding: 4,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 0, marginBottom: 18 }}>
                The AI will search and identify real, active boutique Shopify stores with <strong>300 to 20,000 monthly visitors</strong> that have obvious visual storefront flaws the owner can immediately see and will want help fixing.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    Niche / Product Category
                  </label>
                  <input
                    type="text"
                    value={aiCriteria.niche}
                    onChange={(e) => setAiCriteria({ ...aiCriteria, niche: e.target.value })}
                    placeholder="e.g. Boutique Coffee, Ceramics, Pet Gear"
                    disabled={isDiscovering}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: 12.5,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    Geographic Market
                  </label>
                  <input
                    type="text"
                    value={aiCriteria.market}
                    onChange={(e) => setAiCriteria({ ...aiCriteria, market: e.target.value })}
                    placeholder="e.g. United States, UK, Canada"
                    disabled={isDiscovering}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: 12.5,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    Traffic Sweet Spot Window
                  </label>
                  <input
                    type="text"
                    value={aiCriteria.size}
                    onChange={(e) => setAiCriteria({ ...aiCriteria, size: e.target.value })}
                    placeholder="Sweet Spot: 300–20,000 monthly visitors"
                    disabled={isDiscovering}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: 12.5,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                    Store Count
                  </label>
                  <select
                    value={aiCriteria.count}
                    onChange={(e) => setAiCriteria({ ...aiCriteria, count: Number(e.target.value) })}
                    disabled={isDiscovering}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: 12.5,
                      outline: 'none',
                    }}
                  >
                    <option value={3}>3 stores</option>
                    <option value={5}>5 stores (Recommended)</option>
                    <option value={8}>8 stores</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                  Visual Design Target Instructions
                </label>
                <textarea
                  value={aiCriteria.notes}
                  onChange={(e) => setAiCriteria({ ...aiCriteria, notes: e.target.value })}
                  placeholder="Specify design flaws: e.g. 'Look for stores with stock free Dawn theme, cluttered navigation, missing sticky mobile buy bar, or plain text product specs.'"
                  rows={3}
                  disabled={isDiscovering}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: 12.5,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {discoveryError && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: 'var(--danger)',
                    fontSize: 12,
                    marginBottom: 16,
                  }}
                >
                  {discoveryError}
                </div>
              )}

              {isDiscovering && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#8b5cf6',
                    fontSize: 12.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <Clock size={16} className="spin-animation" />
                  <span>{discoveryStatusText}</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  disabled={isDiscovering}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: isDiscovering ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRunAiDiscovery}
                  disabled={isDiscovering}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 700,
                    border: 'none',
                    cursor: isDiscovering ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Sparkles size={15} />
                  <span>{isDiscovering ? 'Finding & Auditing...' : 'Launch Store Scout'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spinning Keyframes for icons */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};
