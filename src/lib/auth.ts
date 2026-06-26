// Web Crypto API based JWT helper for Next.js App Router and Edge Middleware
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me-in-production-123456";

// Helper to convert string to Uint8Array
const textEncoder = new TextEncoder();

// Helper to convert ArrayBuffer to Base64URL string
function arrayBufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// Helper to convert Base64URL string to Uint8Array
function base64UrlToArrayBuffer(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Import key for HMAC-SHA256
async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = textEncoder.encode(JWT_SECRET);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface JWTPayload {
  userId: string;
  role: string;
  exp: number;
}

// Sign JWT
export async function signJWT(payload: Omit<JWTPayload, "exp">, expiresInSeconds: number = 86400): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload: JWTPayload = { ...payload, exp };

  const encodedHeader = arrayBufferToBase64Url(textEncoder.encode(JSON.stringify(header)));
  const encodedPayload = arrayBufferToBase64Url(textEncoder.encode(JSON.stringify(fullPayload)));

  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(signingInput)
  );

  const encodedSignature = arrayBufferToBase64Url(signature);
  return `${signingInput}.${encodedSignature}`;
}

// Verify JWT
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerPart, payloadPart, signaturePart] = parts;
    const signingInput = `${headerPart}.${payloadPart}`;

    const key = await getCryptoKey();
    const signature = base64UrlToArrayBuffer(signaturePart);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      textEncoder.encode(signingInput)
    );

    if (!isValid) return null;

    // Decode payload
    const decodedPayloadBytes = base64UrlToArrayBuffer(payloadPart);
    const decodedPayloadStr = new TextDecoder().decode(decodedPayloadBytes);
    const payload = JSON.parse(decodedPayloadStr) as JWTPayload;

    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
