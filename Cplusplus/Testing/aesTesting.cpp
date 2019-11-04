#include "lenAES.h"
#include <stdio.h>

//Init plaintext array to 00112233445566778899AABBCCDDEEFF
void plaintextInit(char plaintext[])
{
	for(int i = 0; i < 0x10; i++)
	{
		plaintext[i] = (i << 4) ^ i;
	}
}

//Clear plaintext to all 0's
void plaintextClear(char plaintext[])
{
	for(int i = 0; i < 0x10; i++)
	{
		plaintext[i] = 0x0;
	}
}

//Initialize the key
void keyInit(unsigned char key[])
{
	for(int i = 0; i < 0x20; i++)
	{
		key[i] = i;
	}
}

//Clear encrypted area
void encryptedClear(unsigned char encrypted[])
{
	for(int i = 0; i < 0x10; i++)
	{
		encrypted[i] = 0x0;
	}
}

bool test128Encrypted(unsigned char encrypted[])
{
	return (
		encrypted[0x0] == 0x69 &&
		encrypted[0x1] == 0xc4 &&
		encrypted[0x2] == 0xe0 &&
		encrypted[0x3] == 0xd8 &&
		encrypted[0x4] == 0x6a &&
		encrypted[0x5] == 0x7b &&
		encrypted[0x6] == 0x04 &&
		encrypted[0x7] == 0x30 &&
		encrypted[0x8] == 0xd8 &&
		encrypted[0x9] == 0xcd &&
		encrypted[0xA] == 0xb7 &&
		encrypted[0xB] == 0x80 &&
		encrypted[0xC] == 0x70 &&
		encrypted[0xD] == 0xb4 &&
		encrypted[0xE] == 0xc5 &&
		encrypted[0xF] == 0x5a
	);
}

bool testDecrypted(char plaintext[])
{
	for(int i = 0; i < 0x10; i++)
	{
		if(plaintext[i] != ((i << 4) ^ i))
			return false;
	}

	return true;
}

int main()
{
	AES * aes = new AES();

	char plaintext[16];
	unsigned char key[32];
	unsigned char encrypted[16];

	//AES-128 Encrypt
	plaintextInit(plaintext);
	keyInit(key);
	encryptedClear(encrypted);

	aes->aes128Encrypt(encrypted, plaintext, key);

	if(test128Encrypted(encrypted))
		printf("AES 128 Encryption Success\n");
	else
		printf("AES 128 Encryption Fail\n");
	

	plaintextClear(plaintext);
	aes->aes128Decrypt(plaintext, encrypted, key);

	if(testDecrypted(plaintext))
		printf("AES 128 Decryption Success\n");
	else
		printf("AES 128 Decryption Fail\n");	


		//getHexArrayAsString(getStringAsHexArray("dda97ca4864cdfe06eaf70a0ec0d7191")),

		//getHexArrayAsString(getStringAsHexArray("8ea2b7ca516745bfeafc49904b496089")),

	return 0;
}