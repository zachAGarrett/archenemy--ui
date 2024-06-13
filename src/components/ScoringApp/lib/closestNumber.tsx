// the number closest to n and
// divisible by m

// function to find the number
// closest to n and divisible by m
export default function closestNumber(n: number, m: number) {
  // find the quotient
  let q = n % m;

  return n + (m - q);
}
