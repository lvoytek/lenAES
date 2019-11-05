#include "lenAES.h"

void AES::addRoundKey(unsigned char * state, unsigned int * word)
{
	for(int c = 0; c < this->Nb; c++)
	{
		state[c * this->Nb] = (state[c * this->Nb] ^ ((word[c] >> 24) & 0XFF));
		state[c * this->Nb + 1] = (state[c * this->Nb + 1] ^ ((word[c] >> 16)& 0xFF));
		state[c * this->Nb + 2] = (state[c * this->Nb + 2] ^ ((word[c] >> 8) & 0xFF));
		state[c * this->Nb + 3] = (state[c * this->Nb + 3] ^ (word[c] & 0xFF));
	}
}

void AES::subBytes(unsigned char * state)
{
	for(int i = 0; i < this->Nb*4; i++)
		state[i] = SBox[(state[i] >> 4) & 0xF][state[i] & 0xF];
}

void AES::invSubBytes(unsigned char * state)
{
	for(int i = 0; i < this->Nb*4; i++)
		state[i] = ISBox[(state[i] >> 4) & 0xF][state[i] & 0xF];
}

void AES::shiftRows(unsigned char * state)
{
	unsigned char temp = 0;
	for(int i = 0; i < 4; i++)
	{
		for(int shiftNum = 0; shiftNum < i; shiftNum++)
		{
			temp = state[i];

			for(int shiftLoc = 0; shiftLoc < this->Nb - 1; shiftLoc++)
				state[i + shiftLoc * 4] = state[i + (shiftLoc + 1) * 4];

			state[i + (this->Nb - 1) * 4] = temp;
		}
	}
}

void AES::invShiftRows(unsigned char * state)
{
	unsigned char temp = 0;
	for(int i = 0; i < 4; i++)
	{
		for(int shiftNum = 0; shiftNum < i; shiftNum++)
		{
			temp = state[i + (this->Nb - 1) * 4];

			for(int shiftLoc = this->Nb-1; shiftLoc > 0; shiftLoc--)
				state[i + shiftLoc * 4] = state[i + (shiftLoc - 1) * 4];

			state[i] = temp;
		}
	}
}

void AES::mixColumns(unsigned char * state)
{
	for(int i = 0; i < this->Nb; i++)
	{
		unsigned char s0 = state[i*4];
		unsigned char s1 = state[i*4 + 1];
		unsigned char s2 = state[i*4 + 2];
		unsigned char s3 = state[i*4 + 3];

		unsigned char sprime0 = this->mul(s0, 2)	^ this->mul(s1, 3)	^ s2 		   		^ s3;
		unsigned char sprime1 = s0					^ this->mul(s1, 2)	^ this->mul(s2, 3) 	^ s3;
		unsigned char sprime2 = s0					^ s1		 	 	^ this->mul(s2, 2) 	^ this->mul(s3, 3);
		unsigned char sprime3 = this->mul(s0, 3)	^ s1 		  		^ s2 		 		^ this->mul(s3, 2);

		state[i*4] = sprime0;
		state[i*4 + 1] = sprime1;
		state[i*4 + 2] = sprime2;
		state[i*4 + 3] = sprime3;
	}
}

void AES::invMixColumns(unsigned char * state)
{
	for(int i = 0; i < this->Nb; i++)
	{
		unsigned char s0 = state[i*4];
		unsigned char s1 = state[i*4 + 1];
		unsigned char s2 = state[i*4 + 2];
		unsigned char s3 = state[i*4 + 3];

		unsigned char sprime0 = this->mul(s0, 0xe) ^ this->mul(s1, 0xb) ^ this->mul(s2, 0xd) ^ this->mul(s3, 0x9);
		unsigned char sprime1 = this->mul(s0, 0x9) ^ this->mul(s1, 0xe) ^ this->mul(s2, 0xb) ^ this->mul(s3, 0xd);
		unsigned char sprime2 = this->mul(s0, 0xd) ^ this->mul(s1, 0x9) ^ this->mul(s2, 0xe) ^ this->mul(s3, 0xb);
		unsigned char sprime3 = this->mul(s0, 0xb) ^ this->mul(s1, 0xd) ^ this->mul(s2, 0x9) ^ this->mul(s3, 0xe);

		state[i*4] = sprime0;
		state[i*4 + 1] = sprime1;
		state[i*4 + 2] = sprime2;
		state[i*4 + 3] = sprime3;
	}
}

unsigned char AES::mul(unsigned char s1, unsigned char scalar)
{
	//Base case of 1/0: send the original value
	if(scalar == 1 || scalar == 0)
		return s1;

	//Base case of 2: multiply by 2 and xor if needed
	if(scalar == 2)
	{
		int needsMod = ((s1 >> 7 & 1) == 1);

		if(needsMod)
			return ((s1 << 1) ^ 0x1b) & 0xFF;
		else
			return (s1 << 1) & 0xFF;
	}

	//Cases of powers of 2 (4, 8, 16)
	for(int i = 2; i < 5; i++)
	{
		if(scalar == pow(2,i))
		{
			return mul(mul(s1, pow(2, (i-1))), 2);
		}
	}

	unsigned char product = 0;

	//Reduce at each power of 2 starting at 0x10
	for(int i = 4; i >= 0; i--)
	{
		int temp = pow(2,i);
		if(scalar >= temp)
		{
			scalar -= temp;
			product ^= mul(s1, temp);
		}
	}

	return product;
}

unsigned int AES::subWord(unsigned int w)
{
	w = (SBox[((w >> 24) >> 4) & 0xF][(w >> 24) & 0xF] << 24) +
	(SBox[((w >> 16) >> 4) & 0xF][(w >> 16) & 0xF] << 16) +
	(SBox[((w >> 8) >> 4) & 0xF][(w >> 8) & 0xF] << 8)  +
	(SBox[((w) >> 4) & 0xF][(w) & 0xF]);

	return w;
}

unsigned int AES::rotWord(unsigned int w)
{
	w = ((w >> 24) & 0xFF) +
		(((w >> 16) & 0xFF) << 24) +
		(((w >> 8) & 0xFF) << 16) +
		((w & 0xFF) << 8);

	return w;
}

unsigned int AES::Rcon(unsigned char i)
{
	//get 2^(i-1)
	unsigned int expVal = 1;
	for(int j = 0; j < i - 1; j++)
	{
		expVal = expVal << 1;

		//XOR if too large
		if((expVal >> 8) & 1)
			expVal ^= 0x1b;
	}

	//Shift to first byte
	expVal = expVal << 24;

	return expVal;
}

void AES::cipher(unsigned char * inArr, unsigned int * wArr)
{
	//Nb * Four byte state array based on input
	unsigned char * state = inArr;

	this->addRoundKey(state, wArr);

	for(int round = 1; round < this->Nr; round++)
	{
		
		this->subBytes(state);
		this->shiftRows(state);
		this->mixColumns(state);
		this->addRoundKey(state, &wArr[round*this->Nb]);
	}

	this->subBytes(state);
	this->shiftRows(state);
	this->addRoundKey(state, &wArr[this->Nr*this->Nb]);
}

void AES::invCipher(unsigned char * inArr, unsigned int * wArr)
{
	unsigned char * state = inArr;

	this->addRoundKey(state, &wArr[this->Nr*this->Nb]);

	for(int round = this->Nr-1; round >= 1; round--)
	{
		this->invShiftRows(state);
		this->invSubBytes(state);
		this->addRoundKey(state, &wArr[round*Nb]);
		this->invMixColumns(state);
	}

	this->invShiftRows(state);
	this->invSubBytes(state);
	this->addRoundKey(state, wArr);
}

void AES::keyExpansion(unsigned int * expandedKey, unsigned char * key)
{
	//Temporary word used for each word calculation
	unsigned int temp = 0;

	//Build a new word for every 4 bytes
	for(int i = 0; i < this->Nk; i++)
	{
		expandedKey[i] = ((key[4*i] << 24) & 0xFF000000) 
			+ ((key[4*i + 1] << 16) & 0xFF0000) + ((key[4*i + 2] << 8) & 0xFF00) 
			+ ((key[4*i + 3]) & 0xFF); 
	}

	for(int i = this->Nk; i < this->Nb * (this->Nr+1); i++)
	{
		temp = expandedKey[i-1];

		if(i%this->Nk == 0)
			temp = this->subWord(this->rotWord(temp)) ^ this->Rcon(i/this->Nk);
		else if (this->Nk > 6 && i%this->Nk == 4)
			temp = this->subWord(temp);

		expandedKey[i] = expandedKey[i-this->Nk] ^ temp;
	}
}

unsigned char * AES::generalEncrypt(char * plaintext, unsigned int length, unsigned char * key)
{
	//Expand the key
	unsigned int * expandedKey = (unsigned int *) calloc(this->Nb * (this->Nr + 1), sizeof(unsigned int));
	this->keyExpansion(expandedKey, key);

	//Allocate exact amount necessary for fully encrypted array
	unsigned char * encryptedOutput = (unsigned char *) calloc(length + (this->Nb*4 - length%(this->Nb*4)), sizeof(unsigned char));

	//Copy the plaintext array over
	for(unsigned int i = 0; i < length; i++)
		encryptedOutput[i] = (unsigned char) plaintext[i];

	//Split plaintext up into 128-bit (Nb*4*8bit) chunks and encrypt each
	unsigned int i = 0;
	while(i + this->Nb*4 < length)
	{
		this->cipher(encryptedOutput + i, expandedKey);
		i += Nb*4;
	}

	//Add 0x0 bytes to the end to divide correctly
	if(i < length)
	{
		for(unsigned int j = i; j < length + (this->Nb*4 - length%(this->Nb*4)); j++)
			encryptedOutput[i] = 0x0;

		//Add last set
		cipher(encryptedOutput + i, expandedKey);			
	}

	//free the expanded key as it is useless now
	free(expandedKey);

	return encryptedOutput;
}

char * AES::generalDecrypt(unsigned char * input, unsigned int length, unsigned char * key)
{
	char * plaintext = (char *) calloc(length, sizeof(char));
	return plaintext;
}

unsigned char * AES::aes128Encrypt(char * plaintext, unsigned int length, unsigned char * key)
{
	this->Nk = 4;
	this->Nb = 4;
	this->Nr = 10;

	return this->generalEncrypt(plaintext, length, key);
}

unsigned char * AES::aes192Encrypt(char * plaintext, unsigned int length, unsigned char * key)
{
	this->Nk = 6;
	this->Nb = 4;
	this->Nr = 12;

	return this->generalEncrypt(plaintext, length, key);
}

unsigned char * AES::aes256Encrypt(char * plaintext, unsigned int length, unsigned char * key)
{
	this->Nk = 8;
	this->Nb = 4;
	this->Nr = 14;

	return this->generalEncrypt(plaintext, length, key);
}

char * AES::aes128Decrypt(unsigned char * input, unsigned int length, unsigned char * key)
{
	this->Nk = 4;
	this->Nb = 4;
	this->Nr = 10;

	return this->generalDecrypt(input, length, key);
}

char * AES::aes192Decrypt(unsigned char * input, unsigned int length, unsigned char * key)
{
	this->Nk = 6;
	this->Nb = 4;
	this->Nr = 12;

	return this->generalDecrypt(input, length, key);
}

char * AES::aes256Decrypt(unsigned char * input, unsigned int length, unsigned char * key)
{
	this->Nk = 8;
	this->Nb = 4;
	this->Nr = 14;

	return this->generalDecrypt(input, length, key);
}