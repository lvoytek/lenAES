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

bool test192Encrypted(unsigned char encrypted[])
{
	return (
		encrypted[0x0] == 0xdd &&
		encrypted[0x1] == 0xa9 &&
		encrypted[0x2] == 0x7c &&
		encrypted[0x3] == 0xa4 &&
		encrypted[0x4] == 0x86 &&
		encrypted[0x5] == 0x4c &&
		encrypted[0x6] == 0xdf &&
		encrypted[0x7] == 0xe0 &&
		encrypted[0x8] == 0x6e &&
		encrypted[0x9] == 0xaf &&
		encrypted[0xA] == 0x70 &&
		encrypted[0xB] == 0xa0 &&
		encrypted[0xC] == 0xec &&
		encrypted[0xD] == 0x0d &&
		encrypted[0xE] == 0x71 &&
		encrypted[0xF] == 0x91
	);
}


bool test256Encrypted(unsigned char encrypted[])
{
	return (
		encrypted[0x0] == 0x8e &&
		encrypted[0x1] == 0xa2 &&
		encrypted[0x2] == 0xb7 &&
		encrypted[0x3] == 0xca &&
		encrypted[0x4] == 0x51 &&
		encrypted[0x5] == 0x67 &&
		encrypted[0x6] == 0x45 &&
		encrypted[0x7] == 0xbf &&
		encrypted[0x8] == 0xea &&
		encrypted[0x9] == 0xfc &&
		encrypted[0xA] == 0x49 &&
		encrypted[0xB] == 0x90 &&
		encrypted[0xC] == 0x4b &&
		encrypted[0xD] == 0x49 &&
		encrypted[0xE] == 0x60 &&
		encrypted[0xF] == 0x89
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
	AES aes = AES();

	char plaintext[16];
	unsigned char key[32];
	unsigned char encrypted[16];

	//AES-128 Encrypt
	plaintextInit(plaintext);
	keyInit(key);
	encryptedClear(encrypted);

	aes.aes128Encrypt(encrypted, plaintext, key);

	if(test128Encrypted(encrypted))
		printf("AES 128 Encryption Success\n");
	else
		printf("AES 128 Encryption Fail\n");
	
	//ARS-128 Decrypt
	plaintextClear(plaintext);
	aes.aes128Decrypt(plaintext, encrypted, key);

	if(testDecrypted(plaintext))
		printf("AES 128 Decryption Success\n");
	else
		printf("AES 128 Decryption Fail\n");	

	//AES-192 Encrypt
	plaintextInit(plaintext);
	keyInit(key);
	encryptedClear(encrypted);

	aes.aes192Encrypt(encrypted, plaintext, key);

	if(test192Encrypted(encrypted))
		printf("AES 192 Encryption Success\n");
	else
		printf("AES 192 Encryption Fail\n");
	
	//ARS-192 Decrypt
	plaintextClear(plaintext);
	aes.aes192Decrypt(plaintext, encrypted, key);

	if(testDecrypted(plaintext))
		printf("AES 192 Decryption Success\n");
	else
		printf("AES 192 Decryption Fail\n");

	//AES-256 Encrypt
	plaintextInit(plaintext);
	keyInit(key);
	encryptedClear(encrypted);

	aes.aes256Encrypt(encrypted, plaintext, key);

	if(test256Encrypted(encrypted))
		printf("AES 256 Encryption Success\n");
	else
		printf("AES 256 Encryption Fail\n");
	
	//ARS-256 Decrypt
	plaintextClear(plaintext);
	aes.aes256Decrypt(plaintext, encrypted, key);

	if(testDecrypted(plaintext))
		printf("AES 256 Decryption Success\n");
	else
		printf("AES 256 Decryption Fail\n");
	
	return 0;
}