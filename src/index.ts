import { ethers, Wallet } from 'ethers';
import { hashMessage } from 'ethers/lib/utils';

export async function sign(wallet: Wallet, message: string) {
  return wallet.signMessage(message);
}

export async function checkSignature(
  signerAddress: string,
  signature: string,
  message: string,
) {
  return (
    (await ethers.utils.recoverAddress(hashMessage(message), signature)) ===
    signerAddress
  );
}
