import TrainingSession from "@/components/TrainingSession/Active";
import {
  Arrow,
  Rules,
  Target,
} from "@/components/TrainingSession/Active/lib/types";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";

export interface TrainingSessionProps {
  target: Target;
  rules: Rules;
  arrows: Arrow[];
  id: string;
}

const TrainingSessionDynamic = dynamic(
  () => import("@/components/TrainingSession/Active"),
  { ssr: false }
);

export default withPageAuthRequired(
  async function TrainingSession({ params }) {
    const session = await getSession();
    const activeTrainingSession: TrainingSessionProps | undefined = {
      rules: { setSize: 3, setDuration: 120 },
      target: {
        id: "test",
        radius: 66,
        rings: 10,
        max: 10,
        min: 0,
      },
      arrows: [],
      id: "testMatch",
    };

    return (
      <TrainingSessionDynamic
        user={session?.user}
        target={activeTrainingSession.target}
        rules={activeTrainingSession.rules}
        initialArrows={[]}
      />
    );
  },
  {
    returnTo({ params }) {
      return `/session/${params?.id}`;
    },
  }
);
