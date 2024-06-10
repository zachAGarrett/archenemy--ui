export default function chunkArray(array: any[], chunkSize: number) {
  const arr: any[] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    arr.push(chunk);
  }
  return arr;
}
