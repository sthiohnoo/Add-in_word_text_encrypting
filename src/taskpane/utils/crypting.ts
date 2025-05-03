// Derive cryptographic key from password and salt
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(text: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const initializationVector = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const encodedText = new TextEncoder().encode(text);

  const cipherText = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: initializationVector },
    key,
    encodedText
  );

  const combined = new Uint8Array(
    salt.length + initializationVector.length + cipherText.byteLength
  );
  combined.set(salt, 0);
  combined.set(initializationVector, salt.length);
  combined.set(new Uint8Array(cipherText), salt.length + initializationVector.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decryptCipherText(encryptedText: string, password: string): Promise<string> {
  const decoded = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
  const salt = decoded.slice(0, 16);
  const initializationVector = decoded.slice(16, 28);
  const cipherText = decoded.slice(28);

  const key = await deriveKey(password, salt);

  try {
    const decryptedCipherText = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: initializationVector },
      key,
      cipherText
    );
    return new TextDecoder().decode(decryptedCipherText);
  } catch {
    throw new Error("Decryption failed. Invalid text or password.");
  }
}
