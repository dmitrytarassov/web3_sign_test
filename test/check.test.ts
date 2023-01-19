import { ethers } from 'ethers';
import { checkSignature, sign } from '../src';

const signer = ethers.Wallet.createRandom();

describe('check sign', function () {
  it('should sign return string', async function () {
    expect(typeof (await sign(signer, 'message'))).toEqual('string');
  });

  it('sign returns the same results for the same args', async function () {
    const message = 'Sign me';
    const result1 = await sign(signer, message);
    const result2 = await sign(signer, message);

    expect(result1).toEqual(result2);
  });

  it('sign returns different results for different messages', async function () {
    const message1 = 'Sign me';
    const result1 = await sign(signer, message1);
    const message2 = 'Sign me again';
    const result2 = await sign(signer, message2);

    expect(result1).not.toEqual(result2);
  });

  it('sign returns different results for different signers', async function () {
    const message = 'Sign me';
    const anotherSigner = ethers.Wallet.createRandom();

    const result1 = await sign(signer, message);
    const result2 = await sign(anotherSigner, message);

    expect(result1).not.toEqual(result2);
  });

  it('check signature verification', async function () {
    const message = 'Sign me please';
    const result = await sign(signer, message);

    expect(await checkSignature(signer.address, result, message)).toBeTruthy();

    const anotherSigner = ethers.Wallet.createRandom();
    expect(
      await checkSignature(anotherSigner.address, result, message),
    ).toBeFalsy();

    const anotherMessage = '42';
    const anotherResult = await sign(anotherSigner, anotherMessage);

    expect(
      await checkSignature(
        anotherSigner.address,
        anotherResult,
        anotherMessage,
      ),
    ).toBeTruthy();
    expect(
      await checkSignature(signer.address, anotherResult, anotherMessage),
    ).toBeFalsy();
  });
});
