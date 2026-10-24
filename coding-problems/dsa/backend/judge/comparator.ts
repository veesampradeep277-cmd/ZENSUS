/**
 * Reliable output comparator for competitive programming problems.
 * Normalizes trailing whitespace, carriage returns, token sequences.
 */
export interface ComparisonResult {
  passed: boolean;
  expectedNormalized: string;
  actualNormalized: string;
}

export function normalizeTokens(text: string): string[] {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .split(/\s+/)
    .filter(token => token.length > 0);
}

export function normalizeLines(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

export function compareOutputs(
  actual: string,
  expected: string,
  mode: 'token' | 'exact' | 'float' = 'token',
  tolerance: number = 1e-6
): ComparisonResult {
  const actualTrimmed = actual.replace(/\r\n/g, '\n').trim();
  const expectedTrimmed = expected.replace(/\r\n/g, '\n').trim();

  // Fast JSON / Structured value match (e.g. arrays, objects, booleans, numbers)
  try {
    const actJson = JSON.parse(actualTrimmed.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false'));
    const expJson = JSON.parse(expectedTrimmed.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false'));
    if (JSON.stringify(actJson) === JSON.stringify(expJson)) {
      return {
        passed: true,
        expectedNormalized: expectedTrimmed,
        actualNormalized: actualTrimmed,
      };
    }
  } catch {}

  if (mode === 'exact') {
    const passed = actualTrimmed === expectedTrimmed;
    return {
      passed,
      expectedNormalized: expectedTrimmed,
      actualNormalized: actualTrimmed,
    };
  }

  if (mode === 'float') {
    const actTokens = normalizeTokens(actual);
    const expTokens = normalizeTokens(expected);
    if (actTokens.length !== expTokens.length) {
      return { passed: false, expectedNormalized: expectedTrimmed, actualNormalized: actualTrimmed };
    }

    let allMatch = true;
    for (let i = 0; i < actTokens.length; i++) {
      const actNum = parseFloat(actTokens[i]);
      const expNum = parseFloat(expTokens[i]);
      if (isNaN(actNum) || isNaN(expNum)) {
        if (actTokens[i] !== expTokens[i]) {
          allMatch = false;
          break;
        }
      } else {
        if (Math.abs(actNum - expNum) > tolerance) {
          allMatch = false;
          break;
        }
      }
    }

    return {
      passed: allMatch,
      expectedNormalized: expTokens.join(' '),
      actualNormalized: actTokens.join(' '),
    };
  }

  // Default: token-normalized comparison
  const actualTokens = normalizeTokens(actual);
  const expectedTokens = normalizeTokens(expected);

  if (actualTokens.length !== expectedTokens.length) {
    return {
      passed: false,
      expectedNormalized: expectedTokens.join(' '),
      actualNormalized: actualTokens.join(' '),
    };
  }

  const passed = actualTokens.every((token, idx) => token === expectedTokens[idx]);
  return {
    passed,
    expectedNormalized: expectedTokens.join(' '),
    actualNormalized: actualTokens.join(' '),
  };
}
