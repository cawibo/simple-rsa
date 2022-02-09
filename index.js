
// functions

// https://umaranis.com/2018/07/12/calculate-modular-exponentiation-powermod-in-javascript-ap-n/
function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

const noop = () => {}

const evaluateD = (e, m) => {
  let i = 0
  for (; 7*i % m !== 1; i++) noop
  return i
}

const alphabet = " abcdefghijklmnopqrstuvwxyzåäö"
const toAlpha = (val) => val < alphabet.length ? alphabet[val] : "*"

const mkTransformer = (key, mod) => (val) => powerMod(val, key, mod)

// values

const p = 3
const q = 23
const e = 7

const n = p * q
const m = (p-1) * (q-1)

const d = evaluateD(e, m)

// operate

const encryptValue = mkTransformer(d, n)
const decryptValue = mkTransformer(e, n)

// const message = [2, 12, 27, 2, 28, 18]
const message = [12,53,54,42,56]
const encrypted = message.map(encryptValue)
const decrypted = message.map(decryptValue)

console.log("received ", message)
console.log("encrypted", encrypted)
console.log("decrypted", decrypted)

console.log("encrypted message", encrypted.map(toAlpha))
console.log("decrypted message", decrypted.map(toAlpha))
