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
		if(/^([a-fA-F0-9]{2})+$/.test(keyInput.value))
		{
			
		}
	});

});