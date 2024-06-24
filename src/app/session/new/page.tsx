import dynamic from "next/dynamic";

const TrainingSessionBuilder = dynamic(
  () => import("@/components/TrainingSession/Builder"),
  { ssr: false }
);

export default function NewSession() {
  return <TrainingSessionBuilder />;
}
