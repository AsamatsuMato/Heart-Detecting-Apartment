import CryptoJS from "crypto-js";

const secretKey = "CHECK-HEART-DETECTING-APARTMENT-SECRETKEY";

export function encrypt(text: any) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}
