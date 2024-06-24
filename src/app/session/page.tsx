import TrainingSession from "@/components/TrainingSession/Active";
import {
  Arrow,
  Rules,
  Target,
} from "@/components/TrainingSession/Active/lib/types";
import TrainingSessionManager from "@/components/TrainingSession/Manager";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export interface TrainingSession {
  target: Target;
  rules: Rules;
  arrows: Arrow[];
  id: string;
}

export default withPageAuthRequired(
  async function SessionManager() {
    return <TrainingSessionManager />;
  },
  {
    returnTo: "/session",
  }
);
