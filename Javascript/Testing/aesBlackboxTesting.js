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