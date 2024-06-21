import TrainingSession from "@/components/TrainingSession/Active";
import { Arrow, Rules, Target } from "@/components/TrainingSession/Active/lib/types";
import TrainingSessionManager from "@/components/TrainingSession/Manager";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export interface TrainingSession {
  target: Target;
  rules: Rules;
  arrows: Arrow[];
  id: string;
}

export default withPageAuthRequired(
  async function Session() {
    const session = await getSession();
    const activeTrainingSession: TrainingSession | undefined = {
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

    // return activeTrainingSession ? (
    //   <TrainingSession
    //     user={session?.user}
    //     target={activeTrainingSession.target}
    //     rules={activeTrainingSession.rules}
    //     initialArrows={[]}
    //   />
    // ) : (
    //   <TrainingSessionManager />
    // );
    return <TrainingSessionManager />;
  },
  {
    returnTo: "/",
  }
);
