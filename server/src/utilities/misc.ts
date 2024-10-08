import CryptoJS from 'crypto-js';

// TODO implement encrypt, decrypt, and generateToken
export function decrypt(encryptedText: string): string {
  return "hashed_password_123";
}

export function encrypt(text: string): string {
  return "fakdfgalkgalk";
}

export function generateUniqueToken(length: number = 25): string {
    const randomString = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
    const token = randomString.replace(/\+/g, '0').replace(/\//g, '1').replace(/=+$/, '').slice(0, length);
    
    return token;
}


export async function createProfileAvatar(name: string) {
  return "https://example.com/profile_image.jpg";
}



