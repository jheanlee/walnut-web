import {
  decryptItem,
  type DecryptItemProps,
} from "@/services/crypto/item-decryption.ts";
import {
  encryptItem,
  type EncryptItemProps,
} from "@/services/crypto/item-encryption.ts";
import {
  getDecryptedKey,
  type GetDecryptedKeyProps,
} from "@/services/crypto/key-decryption.ts";
import {
  getEncryptedKey,
  type GetEncryptedKeyProps,
} from "@/services/crypto/key-encryption.ts";

export interface ItemDecryptionRequest {
  id: string;
  type: "item-decryption";
  payload: DecryptItemProps;
}
export interface ItemEncryptionRequest {
  id: string;
  type: "item-encryption";
  payload: EncryptItemProps;
}
export interface KeyDecryptionRequest {
  id: string;
  type: "key-decryption";
  payload: GetDecryptedKeyProps;
}
export interface KeyEncryptionRequest {
  id: string;
  type: "key-encryption";
  payload: GetEncryptedKeyProps;
}

export type CryptoWorkerRequest =
  | ItemDecryptionRequest
  | ItemEncryptionRequest
  | KeyDecryptionRequest
  | KeyEncryptionRequest;

export type CryptoWorkerResponse =
  | {
      id: string;
      success: true;
      result: string;
    }
  | {
      id: string;
      success: false;
      error: string;
    };

self.onmessage = async (event: MessageEvent<CryptoWorkerRequest>) => {
  const { id, type, payload } = event.data;

  try {
    let result: string;

    switch (type) {
      case "item-decryption":
        result = await decryptItem(payload);
        break;
      case "item-encryption":
        result = await encryptItem(payload);
        break;
      case "key-decryption":
        result = await getDecryptedKey(payload);
        break;
      case "key-encryption":
        result = await getEncryptedKey(payload);
        break;
    }

    self.postMessage({
      id,
      success: true,
      result,
    } satisfies CryptoWorkerResponse);
  } catch (err) {
    self.postMessage({
      id,
      success: false,
      error: err instanceof Error ? err.message : "unknown error",
    } satisfies CryptoWorkerResponse);
  }
};
