import { FormInstance } from "antd";

export interface FormSectionProps {
  form: FormInstance;
}

export interface TrainingSessionConfig {
  name: string | null;
  targetSize: string | null;
  targetDistance: string | null;
  arrowsPerEnd: number | null;
  timer: number | null;
  opponentCount: number | null;
  opponentDifficulty: number[] | null;
  discipline: string;
}
