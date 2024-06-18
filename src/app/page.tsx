import ScoringApp from "@/components/ScoringApp";

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Home() {
    const session = await getSession();
    return <ScoringApp session={session} />;
  },
  { returnTo: "/profile" }
);
