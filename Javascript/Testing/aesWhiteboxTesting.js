var unitTestHtml = "";

function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

function getHexArrayAsString(hexarr)
{
	let arrStr = decimalToHexString(hexarr[0]);

	for(let i = 1; i < hexarr.length; i++)
		arrStr += "_" + decimalToHexString(hexarr[i]);

	return arrStr;
}

function getASCIIFromHexArray(hexarr)
{
	let asciiStr = String.fromCharCode(hexarr[0]);

	for(let i = 1; i < hexarr.length; i++)
		asciiStr += String.fromCharCode(hexarr[i]);

	return asciiStr;
}

function hexCharToInt(hexChar)
{
	if(!isNaN(parseInt(hexChar)))
		return parseInt(hexChar);

	else if(/^[a-f]{1}$/.test(hexChar))
		return (hexChar.charCodeAt(0) - 'a'.charCodeAt(0) + 0xa);

	else if(/^[A-F]{1}$/.test(hexChar))
		return (hexChar.charCodeAt(0) - 'A'.charCodeAt(0) + 0xa);

	else
		return null;
}

function getStringAsHexArray(hexString)
{
	if(hexString.length % 2 != 0)
		hexString += '0';

	let hexStringArr = hexString.split("");

	let hexarr = [];

	for(let i = 0; i < hexStringArr.length; i += 2)
		hexarr.push((hexCharToInt(hexStringArr[i]) << 4) + (hexCharToInt(hexStringArr[i + 1])));

	return hexarr;
}

function createUnitTestView(label, input, expected, received)
{
	unitTestHtml = label + "\n\tinput: " + input + "\n\texpected: " + expected + "\n\t received:   " + received;

	let newElem = document.createElement("div");

	if(expected==received)
		newElem.classList.add("success");
	else
		newElem.classList.add("failure");

	newElem.innerText = unitTestHtml;
	document.getElementById("unittests").appendChild(newElem);
}

document.addEventListener("DOMContentLoaded", function(event)
{
	//Test 1, 128-bit key expansion
	Nk = 4;``
	Nb = 4;
	Nr = 10;
	let keyIn = [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c];
	let tki = getHexArrayAsString(keyIn);
	var w = KeyExpansion(keyIn);
	createUnitTestView("128-bit Key Expansion", tki, 
		getHexArrayAsString([0x2b7e1516,0x28aed2a6,0xabf71588,0x09cf4f3c,0xa0fafe17,0x88542cb1,0x23a33939,0x2a6c7605,0xf2c295f2,0x7a96b943,0x5935807a,0x7359f67f,0x3d80477d,0x4716fe3e,0x1e237e44,0x6d7a883b,0xef44a541,0xa8525b7f,0xb671253b,0xdb0bad00,0xd4d1c6f8,0x7c839d87,0xcaf2b8bc,0x11f915bc,0x6d88a37a,0x110b3efd,0xdbf98641,0xca0093fd,0x4e54f70e,0x5f5fc9f3,0x84a64fb2,0x4ea6dc4f,0xead27321,0xb58dbad2,0x312bf560,0x7f8d292f,0xac7766f3,0x19fadc21,0x28d12941,0x575c006e,0xd014f9a8,0xc9ee2589,0xe13f0cc8,0xb6630ca6]),
		getHexArrayAsString(w));


	//Test 2, 192-bit key expansion
	Nk = 6;
	Nb = 4;
	Nr = 12;
	keyIn = [0x8e,0x73,0xb0,0xf7,0xda,0x0e,0x64,0x52,0xc8,0x10,0xf3,0x2b,0x80,0x90,0x79,0xe5,0x62,0xf8,0xea,0xd2,0x52,0x2c,0x6b,0x7b];
	tki = getHexArrayAsString(keyIn);
	w = KeyExpansion(keyIn);
	createUnitTestView("192-bit Key Expansion", tki, 
		getHexArrayAsString([0x8e73b0f7, 0xda0e6452, 0xc810f32b, 0x809079e5, 0x62f8ead2, 0x522c6b7b, 0xfe0c91f7,0x2402f5a5,0xec12068e,0x6c827f6b,0x0e7a95b9,0x5c56fec2,0x4db7b4bd,0x69b54118,0x85a74796,0xe92538fd,0xe75fad44,0xbb095386,0x485af057,0x21efb14f,0xa448f6d9,0x4d6dce24,0xaa326360,0x113b30e6,0xa25e7ed5,0x83b1cf9a,0x27f93943,0x6a94f767,0xc0a69407,0xd19da4e1,0xec1786eb,0x6fa64971,0x485f7032,0x22cb8755,0xe26d1352,0x33f0b7b3,0x40beeb28,0x2f18a259,0x6747d26b,0x458c553e,0xa7e1466c,0x9411f1df,0x821f750a,0xad07d753,0xca400538,0x8fcc5006,0x282d166a,0xbc3ce7b5,0xe98ba06f,0x448c773c,0x8ecc7204,0x01002202]),
		getHexArrayAsString(w));


	//Test 3, 256-bit key expansion
	Nk = 8;
	Nb = 4;
	Nr = 14;
	keyIn = [0x60,0x3d,0xeb,0x10,0x15,0xca,0x71,0xbe,0x2b,0x73,0xae,0xf0,0x85,0x7d,0x77,0x81,0x1f,0x35,0x2c,0x07,0x3b,0x61,0x08,0xd7,0x2d,0x98,0x10,0xa3,0x09,0x14,0xdf,0xf4];
	tki = getHexArrayAsString(keyIn);
	w = KeyExpansion(keyIn);
	createUnitTestView("256-bit Key Expansion", tki, 
		getHexArrayAsString([0x603deb10,0x15ca71be,0x2b73aef0,0x857d7781,0x1f352c07,0x3b6108d7,0x2d9810a3,0x0914dff4,0x9ba35411,0x8e6925af,0xa51a8b5f,0x2067fcde,0xa8b09c1a,0x93d194cd,0xbe49846e,0xb75d5b9a,0xd59aecb8,0x5bf3c917,0xfee94248,0xde8ebe96,0xb5a9328a,0x2678a647,0x98312229,0x2f6c79b3,0x812c81ad,0xdadf48ba,0x24360af2,0xfab8b464,0x98c5bfc9,0xbebd198e,0x268c3ba7,0x09e04214,0x68007bac,0xb2df3316,0x96e939e4,0x6c518d80,0xc814e204,0x76a9fb8a,0x5025c02d,0x59c58239,0xde136967,0x6ccc5a71,0xfa256395,0x9674ee15,0x5886ca5d,0x2e2f31d7,0x7e0af1fa,0x27cf73c3,0x749c47ab,0x18501dda,0xe2757e4f,0x7401905a,0xcafaaae3,0xe4d59b34,0x9adf6ace,0xbd10190d,0xfe4890d1,0xe6188d0b,0x046df344,0x706c631e]),
		getHexArrayAsString(w));

	//Test Sub-Bytes function
	Nb = 1;
	let state = [0x00, 0xFF, 0x34, 0x53];
	tki = getHexArrayAsString(state);
	let out = subBytes(state);
	createUnitTestView("Sub-Bytes", tki,
		getHexArrayAsString([0x63, 0x16, 0x18, 0xed]),
		getHexArrayAsString(out));

	//Inverse Sub-Bytes function
	Nb = 1;
	state = [0x63, 0x16, 0x18, 0xed];
	tki = getHexArrayAsString(state);
	out = invSubBytes(state);
	createUnitTestView("Inverse Sub-Bytes", tki,
		getHexArrayAsString([0x00, 0xFF, 0x34, 0x53]),
		getHexArrayAsString(out));

	//Test addRoundKey
	Nb = 4;
	state = [0x32, 0x43, 0xf6, 0xa8, 0x88, 0x5a, 0x30, 0x8d, 0x31, 0x31, 0x98, 0xa2, 0xe0, 0x37, 0x07, 0x34];
	tki = getHexArrayAsString(state);
	words = [0x2B7E1516, 0x28AED2A6, 0xABF71588, 0x9CF4F3C];
	out = addRoundKey(state, words);
	createUnitTestView("Add Round Key", tki,
		getHexArrayAsString([0x19, 0x3d, 0xe3, 0xbe, 0xa0, 0xf4, 0xe2, 0x2b, 0x9a, 0xc6, 0x8d, 0x2a, 0xe9, 0xf8, 0x48, 0x08]),
		getHexArrayAsString(out));

	//Test shiftRows
	Nb = 4;
	state = [0xd4, 0x27, 0x11, 0xae, 0xe0, 0xbf, 0x98, 0xf1, 0xb8, 0xb4, 0x5d, 0xe5, 0x1e, 0x41, 0x52, 0x30];
	tki = getHexArrayAsString(state);
	out = shiftRows(state);
	createUnitTestView("Shift Rows", tki,
		getHexArrayAsString([0xd4, 0xbf, 0x5d, 0x30, 0xe0, 0xb4, 0x52, 0xae, 0xb8, 0x41, 0x11, 0xf1, 0x1e, 0x27, 0x98, 0xe5]),
		getHexArrayAsString(out));

	//Inverse shiftRows
	Nb = 4;
	state = [0xd4, 0xbf, 0x5d, 0x30, 0xe0, 0xb4, 0x52, 0xae, 0xb8, 0x41, 0x11, 0xf1, 0x1e, 0x27, 0x98, 0xe5];
	tki = getHexArrayAsString(state);
	out = invShiftRows(state);
	createUnitTestView("Inverse Shift Rows", tki,
		getHexArrayAsString([0xd4, 0x27, 0x11, 0xae, 0xe0, 0xbf, 0x98, 0xf1, 0xb8, 0xb4, 0x5d, 0xe5, 0x1e, 0x41, 0x52, 0x30]),
		getHexArrayAsString(out));

	//Test mixColumns
	Nb = 4;
	state = [0xd4, 0xbf, 0x5d, 0x30, 0xe0, 0xb4, 0x52, 0xae, 0xb8, 0x41, 0x11, 0xf1, 0x1e, 0x27, 0x98, 0xe5];
	tki = getHexArrayAsString(state);
	out = mixColumns(state);
	createUnitTestView("Mix Columns", tki,
		getHexArrayAsString([0x04, 0x66, 0x81, 0xe5, 0xe0, 0xcb, 0x19, 0x9a, 0x48, 0xf8, 0xd3, 0x7a, 0x28, 0x06, 0x26, 0x4c]),
		getHexArrayAsString(out));

	//Inverse mixColumns
	Nb = 4;
	state = [0x04, 0x66, 0x81, 0xe5, 0xe0, 0xcb, 0x19, 0x9a, 0x48, 0xf8, 0xd3, 0x7a, 0x28, 0x06, 0x26, 0x4c];
	tki = getHexArrayAsString(state);
	out = invMixColumns(state);
	createUnitTestView("Inverse Mix Columns", tki,
		getHexArrayAsString([0xd4, 0xbf, 0x5d, 0x30, 0xe0, 0xb4, 0x52, 0xae, 0xb8, 0x41, 0x11, 0xf1, 0x1e, 0x27, 0x98, 0xe5]),
		getHexArrayAsString(out));

	//AES-128 Encrypt
	plaintext = getASCIIFromHexArray(getStringAsHexArray("00112233445566778899aabbccddeeff"));
	keyIn = getStringAsHexArray("000102030405060708090a0b0c0d0e0f");
	encrypted = AES128.encrypt(plaintext, keyIn);
	createUnitTestView("AES128 Encrypt", plaintext,
		getHexArrayAsString(getStringAsHexArray("69c4e0d86a7b0430d8cdb78070b4c55a")),
		getHexArrayAsString(encrypted));

	//AES-192 Encrypt
	plaintext = getASCIIFromHexArray(getStringAsHexArray("00112233445566778899aabbccddeeff"));
	keyIn = getStringAsHexArray("000102030405060708090a0b0c0d0e0f1011121314151617");
	encrypted = AES192.encrypt(plaintext, keyIn);
	createUnitTestView("AES192 Encrypt", plaintext,
		getHexArrayAsString(getStringAsHexArray("dda97ca4864cdfe06eaf70a0ec0d7191")),
		getHexArrayAsString(encrypted));

	//AES-256 Encrypt
	plaintext = getASCIIFromHexArray(getStringAsHexArray("00112233445566778899aabbccddeeff"));
	keyIn = getStringAsHexArray("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f");
	encrypted = AES256.encrypt(plaintext, keyIn);
	createUnitTestView("AES256 Encrypt", plaintext,
		getHexArrayAsString(getStringAsHexArray("8ea2b7ca516745bfeafc49904b496089")),
		getHexArrayAsString(encrypted));

	//AES-128 Decrypt
	encrypted = getStringAsHexArray("69c4e0d86a7b0430d8cdb78070b4c55a");
	tki = getHexArrayAsString(encrypted);
	keyIn = getStringAsHexArray("000102030405060708090a0b0c0d0e0f");
	plaintext = AES128.decrypt(encrypted, keyIn);
	createUnitTestView("AES128 Decrypt", tki,
		getASCIIFromHexArray(getStringAsHexArray("00112233445566778899aabbccddeeff")),
		plaintext);
});