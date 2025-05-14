/**
 * Utility functions for encrypting and decrypting environment variables
 */

// In a real app, you would use a proper encryption library
// This is a simplified example for demonstration purposes

export async function encryptData(
  data: string,
  password: string
): Promise<string> {
  // In a real app, you would use a proper encryption algorithm
  // For example, using the Web Crypto API:

  // Convert the password to a key
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  // Generate a salt
  const salt = window.crypto.getRandomValues(new Uint8Array(16));

  // Derive a key from the password
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  // Generate an initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedContent = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(data)
  );

  // Combine the salt, iv, and encrypted content
  const encryptedArray = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedContent.byteLength
  );
  encryptedArray.set(salt, 0);
  encryptedArray.set(iv, salt.byteLength);
  encryptedArray.set(
    new Uint8Array(encryptedContent),
    salt.byteLength + iv.byteLength
  );

  // Convert to base64 for storage or transmission
  return btoa(String.fromCharCode(...encryptedArray));
}

export async function decryptData(
  encryptedData: string,
  password: string
): Promise<string> {
  // In a real app, you would use a proper decryption algorithm
  // For example, using the Web Crypto API:

  // Convert the base64 string back to an array
  const encryptedArray = new Uint8Array(
    atob(encryptedData)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  // Extract the salt, iv, and encrypted content
  const salt = encryptedArray.slice(0, 16);
  const iv = encryptedArray.slice(16, 28);
  const encryptedContent = encryptedArray.slice(28);

  // Convert the password to a key
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  // Derive the key from the password and salt
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // Decrypt the data
  const decryptedContent = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encryptedContent
  );

  // Convert the decrypted content to a string
  return new TextDecoder().decode(decryptedContent);
}
