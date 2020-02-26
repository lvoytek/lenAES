/*
 * Copyright (c) 2020 Lena Voytek
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var plaintextInput = document.getElementById("plaintext");
var keyInput = document.getElementById("hexkeystring");

var encryptedOutput = document.getElementById("encryptedhexstring");
var plaintextOutput = document.getElementById("plaintextresult");

function getStringAsHexArr(hexString)
{
	if(hexString.length % 2 != 0)
		hexString += '0';

	let hexStringArr = hexString.split("");

	let hexarr = [];

	for(let i = 0; i < hexStringArr.length; i += 2)
		hexarr.push((hexCharToInt(hexStringArr[i]) << 4) + (hexCharToInt(hexStringArr[i + 1])));

	return hexarr;
}


document.addEventListener("DOMContentLoaded", function(event)
{
	keyInput.addEventListener("change", function()
	{
		if(/^([a-fA-F0-9]{2})+$/.test(keyInput.value))
			keyInput.classList.remove("error");
		else
			keyInput.classList.add("error");	
	});


	document.getElementById("process").addEventListener("click", function()	
	{
		if(/^([a-fA-F0-9]{2})+$/.test(keyInput.value))
		{	
			if(document.getElementById("doAES128").checked)
			{
				let encrypted = AES128.encrypt(plaintextInput.value, getStringAsHexArr(keyInput.value));
				encryptedOutput.value = getHexArrayAsString(encrypted);
				plaintextOutput.value = AES128.decrypt(encrypted, getStringAsHexArr(keyInput.value));
			}
			else if(document.getElementById("doAES192").checked)
			{
				let encrypted = AES192.encrypt(plaintextInput.value, getStringAsHexArr(keyInput.value));
				encryptedOutput.value = getHexArrayAsString(encrypted);
				plaintextOutput.value = AES192.decrypt(encrypted, getStringAsHexArr(keyInput.value));
			}
			else
			{
				let encrypted = AES256.encrypt(plaintextInput.value, getStringAsHexArr(keyInput.value));
				encryptedOutput.value = getHexArrayAsString(encrypted);
				plaintextOutput.value = AES256.decrypt(encrypted, getStringAsHexArr(keyInput.value));
			}
		}
	});

});