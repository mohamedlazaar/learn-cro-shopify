// Statistical calculation functions for A/B testing and sample size estimation

export function getZAlpha(confidencePercent: number): number {
  if (confidencePercent >= 99) return 2.576;
  if (confidencePercent >= 98) return 2.326;
  if (confidencePercent >= 95) return 1.960;
  if (confidencePercent >= 90) return 1.645;
  if (confidencePercent >= 80) return 1.282;
  return 1.960;
}

export function getZBeta(powerPercent: number): number {
  if (powerPercent >= 95) return 1.645;
  if (powerPercent >= 90) return 1.282;
  if (powerPercent >= 85) return 1.036;
  if (powerPercent >= 80) return 0.842;
  if (powerPercent >= 70) return 0.524;
  return 0.842;
}

/**
 * Calculates required sample size per variant using 2-sample proportions test
 * @param baselineCvr Decimal (e.g. 0.02 for 2%)
 * @param mdeRelative Decimal relative change (e.g. 0.10 for 10% lift)
 * @param confidence Confidence percentage (e.g. 95)
 * @param power Power percentage (e.g. 80)
 */
export function calculateSampleSizePerVariant(
  baselineCvr: number,
  mdeRelative: number,
  confidence: number = 95,
  power: number = 80
): number {
  if (baselineCvr <= 0 || mdeRelative <= 0) return 0;

  const p1 = baselineCvr;
  const p2 = baselineCvr * (1 + mdeRelative);

  if (p2 >= 1) return 0;

  const zAlpha = getZAlpha(confidence);
  const zBeta = getZBeta(power);

  const variance1 = p1 * (1 - p1);
  const variance2 = p2 * (1 - p2);
  const delta = Math.abs(p2 - p1);

  const numerator = Math.pow(zAlpha * Math.sqrt(2 * ((variance1 + variance2) / 2)) + zBeta * Math.sqrt(variance1 + variance2), 2);
  const sampleSize = Math.ceil(numerator / Math.pow(delta, 2));

  return Math.max(100, sampleSize);
}

export function calculateTestDurationDays(
  sampleSizePerVariant: number,
  dailySessions: number,
  variantsCount: number = 2
): number {
  if (dailySessions <= 0 || sampleSizePerVariant <= 0) return 0;
  const totalNeeded = sampleSizePerVariant * variantsCount;
  return Math.ceil(totalNeeded / dailySessions);
}

/**
 * Standard Normal Cumulative Distribution Function (Phi) approximation
 */
export function standardNormalCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
}

/**
 * Standard Normal Probability Density Function (Bell curve)
 */
export function standardNormalPdf(x: number, mean: number = 0, stdDev: number = 1): number {
  const m = stdDev * Math.sqrt(2 * Math.PI);
  const e = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
  return e / m;
}

export interface SignificanceResult {
  observedCvrA: number;
  observedCvrB: number;
  relativeLift: number;
  zScore: number;
  pValue: number;
  confidence: number;
  isSignificant: boolean;
  confidenceInterval: [number, number]; // [lowerLift, upperLift]
}

export function computeSignificance(
  visitorsA: number,
  conversionsA: number,
  visitorsB: number,
  conversionsB: number,
  confidenceThreshold: number = 95
): SignificanceResult {
  const cvrA = visitorsA > 0 ? conversionsA / visitorsA : 0;
  const cvrB = visitorsB > 0 ? conversionsB / visitorsB : 0;
  const relativeLift = cvrA > 0 ? ((cvrB - cvrA) / cvrA) * 100 : 0;

  const pooledP = (conversionsA + conversionsB) / (visitorsA + visitorsB);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / visitorsA + 1 / visitorsB));

  const zScore = se > 0 ? (cvrB - cvrA) / se : 0;
  const pValue = 2 * (1 - standardNormalCdf(Math.abs(zScore)));
  const confidence = (1 - pValue) * 100;
  const isSignificant = confidence >= confidenceThreshold;

  // 95% Confidence interval for relative lift
  const zCritical = getZAlpha(confidenceThreshold);
  const marginOfError = cvrA > 0 ? (zCritical * se / cvrA) * 100 : 0;

  return {
    observedCvrA: cvrA * 100,
    observedCvrB: cvrB * 100,
    relativeLift,
    zScore,
    pValue,
    confidence,
    isSignificant,
    confidenceInterval: [relativeLift - marginOfError, relativeLift + marginOfError],
  };
}
