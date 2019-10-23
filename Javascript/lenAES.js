let Nk = 8;
let Nb = 4;
let Nr = 14;

/*
 * XOR each column of the state with a given word from the key schedule
 */
function _addRoundKey(state, word)
{
	for(let c = 0; c < Nb; c++)
	{
		state[c * Nb] = state[c * Nb] ^ word[0];
		state[c * Nb + 1] = state[c * Nb + 1] ^ word[1];
		state[c * Nb + 2] = state[c * Nb + 2] ^ word[2];
		state[c * Nb + 3] = state[c * Nb + 3] ^ word[3];
	}

	return state;
}

function _subBytes(state)
{

}

function _shiftRows(state)
{

}

function _mixColumns(state)
{

}


function cipher(inArr, wArr)
{
	//Four byte state array based on input
	let state = inArr;

	state = _addRoundKey(state, wArr.slice(0, Nb));

	for(let round = 1; round < Nr; round++)
	{
		state = _subBytes(state);
		state = _shiftRows(state);
		state = _mixColumns(state);
		state = _addRoundKey(state, wArr.slice(round*Nb, (round + 1) * Nb));
	}

	state = _subBytes(state);
	state = _shiftRows(state);
	state = _addRoundKey(state, wArr.slice(Nr*Nb, (Nr + 1) * Nb));

	return state;
}



let in = new Uint8Array(new ArrayBuffer(4));