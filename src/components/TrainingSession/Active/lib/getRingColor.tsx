export default function getRingColor(ringNunmber: number) {
  const colors: { [k: number]: string } = {
    10: "#F4F4F6",
    9: "#F4F4F6",
    8: "#343633",
    7: "#343633",
    6: "#01BAEF",
    5: "#01BAEF",
    4: "#FF6B6B",
    3: "#FF6B6B",
    2: "#FFB85C",
    1: "#FFB85C",
  };
  return colors[ringNunmber];
}
