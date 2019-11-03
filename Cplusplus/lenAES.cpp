#include "lenAES.h"

void AES::addRoundKey(unsigned char * state, int * word)
{

}

void AES::subBytes(unsigned char * state)
{

}

void AES::invSubBytes(unsigned char * state)
{

}

void AES::shiftRows(unsigned char * state)
{

}

void AES::invShiftRows(unsigned char * state)
{

}

void AES::mixColumns(unsigned char * state)
{

}

void AES::invMixColumns(unsigned char * state)
{

}

unsigned char AES::mul(unsigned char s1, unsigned char scalar)
{
	return 0x0;
}

unsigned int AES::subWord(unsigned int w)
{
	return 0x0;
}

unsigned int AES::rotWord(unsigned int w)
{
	return 0x0;
}

unsigned int AES::Rcon(unsigned char i)
{
	return 0x0;
}

void AES::cipher(unsigned char * inArr, unsigned int * wArr)
{

}

void AES::invCipher(unsigned char * inArr, unsigned int * wArr)
{

}

void AES::keyExpansion(unsigned char * expandedKey, unsigned char * key)
{

}

void AES::generalEncrypt(unsigned char * output, char * plaintext, unsigned char * key)
{

}

void AES::generalDecrypt(char * plaintext, unsigned char * input, unsigned char * key)
{

}

void AES::aes128Encrypt(unsigned char * output, char * plaintext, unsigned char * key)
{
	this->Nk = 4;
	this->Nb = 4;
	this->Nr = 10;

	this->generalEncrypt(output, plaintext, key);
}

void AES::aes192Encrypt(unsigned char * output, char * plaintext, unsigned char * key)
{
	this->Nk = 6;
	this->Nb = 4;
	this->Nr = 12;

	this->generalEncrypt(output, plaintext, key);
}

void AES::aes256Encrypt(unsigned char * output, char * plaintext, unsigned char * key)
{
	this->Nk = 8;
	this->Nb = 4;
	this->Nr = 14;

	this->generalEncrypt(output, plaintext, key);
}

void AES::aes128Decrypt(char * plaintext, unsigned char * input, unsigned char * key)
{
	this->Nk = 4;
	this->Nb = 4;
	this->Nr = 10;

	this->generalDecrypt(plaintext, input, key);
}

void AES::aes192Decrypt(char * plaintext, unsigned char * input, unsigned char * key)
{
	this->Nk = 6;
	this->Nb = 4;
	this->Nr = 12;

	this->generalDecrypt(plaintext, input, key);
}

void AES::aes256Decrypt(char * plaintext, unsigned char * input, unsigned char * key)
{
	this->Nk = 8;
	this->Nb = 4;
	this->Nr = 14;

	this->generalDecrypt(plaintext, input, key);
}