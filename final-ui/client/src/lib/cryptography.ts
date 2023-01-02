export async function sha256(data: string): Promise<string> {
  const byteArray = new TextEncoder().encode(data);
  const hashAsByteArray = await crypto.subtle.digest('SHA-256', byteArray);
  const hashAsArrayOfNumber = Array.from(new Uint8Array(hashAsByteArray));

  // Convert each number into a string hex representation,
  // normalize each hex number, so it consists of two symbols.
  return hashAsArrayOfNumber.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export function cryptoRandom(){
  // return a crypto generated number
  // between 0 and 1 (0 inclusive, 1 exclusive);
  // Mimics the Math.random function in range of results
  const array = new Uint32Array(1),
    max = Math.pow(2, 32), // normally the max is 2^32 -1 but we remove the -1
                           //  so that the max is exclusive
    randomValue = window.crypto.getRandomValues(array)[0] / max;

    return randomValue;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
/** Naive implementation of the UUID */
export function uuid(): string {
  const s4 = () => Math.floor((1 + cryptoRandom()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}