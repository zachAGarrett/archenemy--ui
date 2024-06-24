import { useState, useCallback } from "react";
import { TrainingSessionConfig } from "../types";
import { TrainingSessionSubmissionResponse } from "@/app/api/trainingSession/new/route";

export interface SubmitFormProps {
  data?: TrainingSessionConfig;
}

export default function useSubmitFlow() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<SubmitFormProps>();
  const [responseData, setResponseData] =
    useState<TrainingSessionSubmissionResponse>();

  const submitForm = useCallback(async ({ data }: SubmitFormProps) => {
    if (data === undefined) {
      throw new Error("Could not submit organization due to undefined data");
    }
    setSending(true);
    try {
      const organizationCreateInput = JSON.stringify(data, undefined, 2);
      const response = await fetch("/api/trainingSession/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: organizationCreateInput,
      });

      if (!response.ok) {
        console.error(
          "Failed to submit training session. Status:",
          response.status
        );

        // Optionally, you can try to access the response body if it's available.
        response.text().then((body) => {
          console.error("Response Body:", body);
        });
        setError(true);
      } else {
        const responseJSON = await response.json();
        const trainingSessionSubmissionResponse = JSON.parse(
          responseJSON
        ) as TrainingSessionSubmissionResponse;
        setResponseData(trainingSessionSubmissionResponse);
        setError(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(true);
    } finally {
      setSending(false);
    }
    setLastAttempt({ data });
  }, []);

  return {
    responseData,
    sending,
    error,
    lastAttempt,
    submitForm,
    retry: () => lastAttempt && submitForm(lastAttempt),
  };
}
