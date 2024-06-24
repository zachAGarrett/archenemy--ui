import { TrainingSessionConfig } from "@/components/TrainingSession/Builder/types";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export interface TrainingSessionSubmissionResponse {
  data: TrainingSessionConfig;
  processId: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as TrainingSessionConfig;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: payload }),
    };
    console.log(fetchOptions);

    const response = {
      trainingSessionConfig: payload,
      processId: randomUUID(),
    };
    console.log(response);
    return NextResponse.json(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
