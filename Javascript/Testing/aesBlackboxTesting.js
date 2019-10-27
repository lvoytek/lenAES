var plaintextInput = document.getElementById("plaintext");
var keyInput = document.getElementById("hexkeystring");

var encryptedOutput = document.getElementById("encryptedhexstring");
var plaintextOutput = document.getElementById("plaintextresult");


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
		 console.log([0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c].toString(16));
	});

});