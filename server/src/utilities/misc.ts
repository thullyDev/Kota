import CryptoJS from 'crypto-js';
import slugify from 'slugify';
import { SECRET_KEY } from './config';

// TODO implement encrypt, decrypt, and generateToken
export function decrypt(encryptedText: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    
    if (bytes.sigBytes > 0) {
      return bytes.toString(CryptoJS.enc.Utf8) // returns the decrypted text
    }

    return null
  } catch (err) {
    console.error(err)
    console.log("DECRYPTION FAILED")
  }
  return null
}

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
}

export function generateUniqueToken(length: number = 25): string {
    const randomString = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
    const token = randomString.replace(/\+/g, '0').replace(/\//g, '1').replace(/=+$/, '').slice(0, length);
    
    return token;
}


export async function createProfileAvatar(name: string) {
  const slug = slugify(name)
  return `https://robohash.org/${slug}`;
}



