import Scorecard from "@/components/Scorecard";
import { ScorecardProps } from "@/components/Scorecard/lib/types";

export default function Home() {
  const rules: ScorecardProps["rules"] = { setSize: 3 };
  const target: ScorecardProps["target"] = {
    radius: 66,
    rings: 10,
    max: 10,
    min: 0,
  };

  return <Scorecard rules={rules} target={target} />;
}
