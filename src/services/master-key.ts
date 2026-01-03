import { getDecryptedKey } from "@/services/crypto/key-decryption.ts";

export let masterKey: string | undefined = undefined;

interface GetMasterKeyProps {
  masterPassword: string;
}
export const setMasterKey = async ({ masterPassword }: GetMasterKeyProps) => {
  const encryptedKey = localStorage.getItem("branch_vault_master_key");
  if (encryptedKey === null) return 404;

  masterKey = await getDecryptedKey({
    masterPassword: masterPassword,
    key: encryptedKey,
  });
  return 200;
};
