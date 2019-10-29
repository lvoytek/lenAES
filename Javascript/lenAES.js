var Nk = 4;
var Nb = 4;
var Nr = 10;

var SBox = [
	[0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76],
	[0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0],
	[0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15],
	[0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75],
	[0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84],
	[0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf],
	[0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8],
	[0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2],
	[0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73],
	[0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb],
	[0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79],
	[0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08],
	[0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a],
	[0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e],
	[0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf],
	[0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]
];

var ISBox = [
	[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb],
	[0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb],
	[0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e],
	[0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25],
	[0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92],
	[0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84],
	[0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06],
	[0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b],
	[0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73],
	[0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e],
	[0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b],
	[0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4],
	[0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f],
	[0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef],
	[0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61],
	[0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]
];

function getASCIIFromHexArray(hexarr)
{
	let asciiStr = String.fromCharCode(hexarr[0]);

	for(let i = 1; i < hexarr.length; i++)
		asciiStr += String.fromCharCode(hexarr[i]);

	return asciiStr;
}

/*
 * XOR each column of the state with a given word from the key schedule
 */
function addRoundKey(state, word)
{
	for(let c = 0; c < Nb; c++)
	{
		state[c * Nb] = (state[c * Nb] ^ ((word[c] >> 24) & 0XFF));
		state[c * Nb + 1] = (state[c * Nb + 1] ^ ((word[c] >> 16)& 0xFF));
		state[c * Nb + 2] = (state[c * Nb + 2] ^ ((word[c] >> 8) & 0xFF));
		state[c * Nb + 3] = (state[c * Nb + 3] ^ (word[c] & 0xFF));
	}

	return state;
}

/*
 * Nonlinear byte by byte substitution using SBox
 */
function subBytes(state)
{
	for(let i = 0; i < Nb*4; i++)
		state[i] = SBox[(state[i] >> 4) & 0xF][state[i] & 0xF];

	return state;
}

/*
 * Nonlinear byte by byte substitution using ISBox
 */
function invSubBytes(state)
{
	for(let i = 0; i < Nb*4; i++)
		state[i] = ISBox[(state[i] >> 4) & 0xF][state[i] & 0xF];

	return state;
}

/*
 * Ciclical left shift of each row
 */
function shiftRows(state)
{
	let temp = 0;
	for(let i = 0; i < 4; i++)
	{
		for(let shiftNum = 0; shiftNum < i; shiftNum++)
		{
			temp = state[i];

			let shiftLoc = 0;
			for(shiftLoc = 0; shiftLoc < Nb - 1; shiftLoc++)
				state[i + shiftLoc * 4] = state[i + (shiftLoc + 1) * 4];

			state[i + (Nb - 1) * 4] = temp;
		}
	}

	return state;
}

/*
 * Ciclical right shift of each row
 */
function invShiftRows(state)
{
	let temp = 0;
	for(let i = 0; i < 4; i++)
	{
		for(let shiftNum = 0; shiftNum < i; shiftNum++)
		{
			temp = state[i + (Nb - 1) * 4];

			let shiftLoc = 0;
			for(shiftLoc = Nb-1; shiftLoc > 0; shiftLoc--)
				state[i + shiftLoc * 4] = state[i + (shiftLoc - 1) * 4];

			state[i] = temp;
		}
	}

	return state;
}

/*
 * 8-bit Polynomial multiplication used for mixColumns
 */
function mul(s1, scalar)
{
	if(scalar == 1)
		return s1;

	let product = s1;

	//Reduce the scalar until it reaches 0 or 1, multiplying by 2 each time
	while(scalar > 1)
	{
		//Multiply
		product = product << 1;

		//Will overflow, necessary to XOR with 1b
		if((product >> 8 & 1) == 1)
			product ^= 0x1b;

		product &= 0xFF;

		scalar -= 2;
	}

	//Add one more copy
	if(scalar == 1)
		product = product ^ s1;

	//Confirm 8-bit
	product &= 0xFF;

	return product;
}

/*
 * Transform each column by treating it as a four-term polynomial and
 * multiplying it by a(x) = {03}x^3 + {01}x^2 + {01}x + {02}
 *
 * Multiplying refers to a normal * operation followed by a XOR with 0x1b
 */
function mixColumns(state)
{
	for(let i = 0; i < Nb; i++)
	{
		let s0 = state[i*4];
		let s1 = state[i*4 + 1];
		let s2 = state[i*4 + 2];
		let s3 = state[i*4 + 3];

		let sprime0 = mul(s0, 2) ^ mul(s1, 3) ^ s2 ^ s3;
		let sprime1 = s0 ^ mul(s1, 2) ^ mul(s2, 3) ^ s3;
		let sprime2 = s0 ^ s1 ^ mul(s2, 2) ^ mul(s3, 3);
		let sprime3 = mul(s0, 3) ^ s1 ^ s2 ^ mul(s3, 2);

		state[i*4] = sprime0;
		state[i*4 + 1] = sprime1;
		state[i*4 + 2] = sprime2;
		state[i*4 + 3] = sprime3;
	}

	return state;
}

/*
 * Inverse Transform each column by treating it as a four-term polynomial and
 * multiplying it by a(x) = {03}x^3 + {01}x^2 + {01}x + {02}
 *
 * Multiplying refers to a normal * operation followed by a XOR with 0x1b
 */
function invMixColumns(state)
{
	for(let i = 0; i < Nb; i++)
	{
		let s0 = state[i*4];
		let s1 = state[i*4 + 1];
		let s2 = state[i*4 + 2];
		let s3 = state[i*4 + 3];

		let sprime0 = mul(s0, 0xe) ^ mul(s1, 0xb) ^ mul(s2, 0xd) ^ mul(s3, 0x9);
		let sprime1 = mul(s0, 0x9) ^ mul(s1, 0xe) ^ mul(s2, 0xb) ^ mul(s3, 0xd);
		let sprime2 = mul(s0, 0xd) ^ mul(s1, 0x9) ^ mul(s2, 0xe) ^ mul(s3, 0xb);
		let sprime3 = mul(s0, 0xb) ^ mul(s1, 0xd) ^ mul(s2, 0x9) ^ mul(s3, 0xe);

		state[i*4] = sprime0;
		state[i*4 + 1] = sprime1;
		state[i*4 + 2] = sprime2;
		state[i*4 + 3] = sprime3;
	}

	return state;
}

function subWord(w)
{		
	w = (SBox[((w >> 24) >> 4) & 0xF][(w >> 24) & 0xF] << 24) +
		(SBox[((w >> 16) >> 4) & 0xF][(w >> 16) & 0xF] << 16) +
		(SBox[((w >> 8) >> 4) & 0xF][(w >> 8) & 0xF] << 8)  +
		(SBox[((w) >> 4) & 0xF][(w) & 0xF]);

	return w;
}

function rotWord(w)
{
	w = ((w >> 24) & 0xFF) +
		(((w >> 16) & 0xFF) << 24) +
		(((w >> 8) & 0xFF) << 16) +
		((w & 0xFF) << 8);

	return w;
}

function Rcon(i)
{
	//get 2^(i-1)
	let expVal = 1;
	for(let j = 0; j < i - 1; j++)
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


/*
 * Encrypt 128-bit plaintext using an expanded key
 */
function cipher(inArr, wArr)
{
	//Nb * Four byte state array based on input
	let state = inArr;

	state = addRoundKey(state, wArr.slice(0, Nb));

	for(let round = 1; round < Nr; round++)
	{
		
		state = subBytes(state);
		state = shiftRows(state);
		state = mixColumns(state);
		state = addRoundKey(state, wArr.slice(round*Nb, (round + 1) * Nb));
	}

	state = subBytes(state);
	state = shiftRows(state);
	state = addRoundKey(state, wArr.slice(Nr*Nb, (Nr + 1) * Nb));

	return state;
}

/*
 * Decrypt a 128-bit byte array using an expanded key
 */
function invCipher(inArr, wArr)
{
	let state = inArr;

	state = addRoundKey(state, wArr.slice(Nr*Nb, (Nr+1)*Nb));

	for(let round = Nr-1; round >= 1; round--)
	{
		state = invShiftRows(state);
		state = invSubBytes(state);
		state = addRoundKey(state, w.slice(round*Nb, (round+1)*Nb));
		state = invMixColumns(state);
	}

	state = invShiftRows(state);
	state = invSubBytes(state);
	state = addRoundKey(state, w.slice(0, Nb));
	return state;
}

/*
 * Expand a 4*Nk byte key to an array of Nb*(Nr+1) words
 */
function KeyExpansion(key)
{
	var w = [];

	//Temporary word used for each word calculation
	let temp = 0;

	//Build a new word for every 4 bytes
	for(let i = 0; i < Nk; i++)
	{
		w[i] = ((key[4*i] << 24) & 0xFF000000) + ((key[4*i + 1] << 16) & 0xFF0000) + 
			((key[4*i + 2] << 8) & 0xFF00) + ((key[4*i + 3]) & 0xFF); 
	}

	for(let i = Nk; i < Nb * (Nr+1); i++)
	{
		temp = w[i-1];

		if(i%Nk == 0)
			temp = subWord(rotWord(temp)) ^ Rcon(i/Nk);
		else if (Nk > 6 && i%Nk == 4)
			temp = subWord(temp);

		w[i] = w[i-Nk] ^ temp;
	}

	return w;
}

var AES128 = 
{
	/*
	 * Take in plain text of variable length and a 128-bit byte array key 
	 * and return the 128-bit AES encrypted array as an 
	 * 8-bit integer array
	 */
	encrypt : function(plaintext, key)
	{
		Nk = 4;
		Nb = 4;
		Nr = 10;

		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Convert to ascii vals
		plaintextArray = plaintext.split("");
		for(let i = 0; i < plaintextArray.length; i++)
			plaintextArray[i] = plaintextArray[i].charCodeAt(0);

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of plaintext encrypted
		let encryptedTotal = cipher(plaintextArray.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and encrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Add FF bytes to the end
		if(i < plaintext.length)
		{
			for(let j = i; j < (Nb*4-plaintext.length); j++)
				plaintext.push(String.fromCharCode(0xFF));

			//Add last set
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));			
		}

		return encryptedTotal;
	},

	/*
	 * Take in a variable length byte array and a 128-bit byte array
	 * key and return the resulting plaintext as a string
	 */
	decrypt : function(encrypted, key)
	{
		Nk = 4;
		Nb = 4;
		Nr = 10;

		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of encrypted text decrypted
		let decryptedTotal = invCipher(encrypted.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and decrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			decryptedTotal = decryptedTotal.concat(invCipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Remove FF
		for(let i = decryptedTotal.length - 1; i <= decryptedTotal.length - Nb*4; i--)
		{
			if(decryptedTotal[i] == 0xFF)
				decryptedTotal.pop();
			else
				break;
		}

		return getASCIIFromHexArray(decryptedTotal);
	}
};


var AES192 = 
{
	/*
	 * Take in plain text of variable length and a 192-bit byte array key 
	 * and return the 128-bit AES encrypted array as an 
	 * 8-bit integer array
	 */
	encrypt : function(plaintext, key)
	{
		Nk = 6;
		Nb = 4;
		Nr = 12;


		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Convert to ascii vals
		plaintextArray = plaintext.split("");
		for(let i = 0; i < plaintextArray.length; i++)
			plaintextArray[i] = plaintextArray[i].charCodeAt(0);

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of plaintext encrypted
		let encryptedTotal = cipher(plaintextArray.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and encrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Add FF bytes to the end
		if(i < plaintext.length)
		{
			for(let j = i; j < (Nb*4-plaintext.length); j++)
				plaintext.push(String.fromCharCode(0xFF));

			//Add last set
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));			
		}

		return encryptedTotal;

	},

	/*
	 * Take in a variable length byte array and a 192-bit byte array
	 * key and return the resulting plaintext as a string
	 */
	decrypt : function(encrypted, key)
	{
		Nk = 6;
		Nb = 4;
		Nr = 12;
	
		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of encrypted text decrypted
		let decryptedTotal = invCipher(encrypted.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and decrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			decryptedTotal = decryptedTotal.concat(invCipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Remove FF
		for(let i = decryptedTotal.length - 1; i <= decryptedTotal.length - Nb*4; i--)
		{
			if(decryptedTotal[i] == 0xFF)
				decryptedTotal.pop();
			else
				break;
		}

		return getASCIIFromHexArray(decryptedTotal);
	}
};


var AES256 = 
{
	/*
	 * Take in plain text of variable length and a 256-bit byte array key 
	 * and return the 128-bit AES encrypted array as an 
	 * 8-bit integer array
	 */
	encrypt : function(plaintext, key)
	{
		Nk = 8;
		Nb = 4;
		Nr = 14;


		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Convert to ascii vals
		plaintextArray = plaintext.split("");
		for(let i = 0; i < plaintextArray.length; i++)
			plaintextArray[i] = plaintextArray[i].charCodeAt(0);

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of plaintext encrypted
		let encryptedTotal = cipher(plaintextArray.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and encrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Add FF bytes to the end
		if(i < plaintext.length)
		{
			for(let j = i; j < (Nb*4-plaintext.length); j++)
				plaintext.push(String.fromCharCode(0xFF));

			//Add last set
			encryptedTotal = encryptedTotal.concat(cipher(plaintextArray.slice(i, i + Nb*4), expandedKey));			
		}

		return encryptedTotal;

	},

	/*
	 * Take in a variable length byte array and a 256-bit byte array
	 * key and return the resulting plaintext as a string
	 */
	decrypt : function(encrypted, key)
	{
		Nk = 8;
		Nb = 4;
		Nr = 14;

		//Key too small return null, key truncated when too large
		if(key.length < Nk*4)
			return null;

		//Expand the key
		let expandedKey = KeyExpansion(key);

		//Get first 128 bits of encrypted text decrypted
		let decryptedTotal = invCipher(encrypted.slice(0, Nb*4), expandedKey);

		//Split plaintext up into 128-bit (Nb*4*8bit) chunks and decrypt each
		let i = Nb*4;
		while(i + Nb*4 < plaintext.length)
		{
			decryptedTotal = decryptedTotal.concat(invCipher(plaintextArray.slice(i, i + Nb*4), expandedKey));
			i += Nb*4;
		}

		//Remove FF
		for(let i = decryptedTotal.length - 1; i <= decryptedTotal.length - Nb*4; i--)
		{
			if(decryptedTotal[i] == 0xFF)
				decryptedTotal.pop();
			else
				break;
		}

		return getASCIIFromHexArray(decryptedTotal);
	}
};
