import radiansToDegrees from "./radiansToDegrees";

export default function cleanAngleValue(angleInRadians: number) {
  const possiblyNegativeDegreeValue = radiansToDegrees(angleInRadians) - 90;
  if (possiblyNegativeDegreeValue < 0) {
    return Math.round(360 + possiblyNegativeDegreeValue);
  } else {
    return Math.round(possiblyNegativeDegreeValue);
  }
}
