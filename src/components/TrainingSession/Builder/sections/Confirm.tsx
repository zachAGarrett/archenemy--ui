import Show from "@/components/Show";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Flex, List, Result, Typography } from "antd";
import useSubmitFlow from "../hooks/useSubmitFlow";
import { TrainingSessionConfig } from "../types";
import { trainingSessionFormLabelMap } from "..";
import { redirect } from "next/navigation";
import useLocalStorage, { SetValue } from "@/hooks/useLocalStorage";

export interface ConfirmProps {
  sending: ReturnType<typeof useSubmitFlow>["sending"];
  error: ReturnType<typeof useSubmitFlow>["error"];
  retry: ReturnType<typeof useSubmitFlow>["retry"];
  response: ReturnType<typeof useSubmitFlow>["responseData"];
  lastAttempt: ReturnType<typeof useSubmitFlow>["lastAttempt"];
  trainingSessionConfig: TrainingSessionConfig | null | undefined;
}
const Confirm = ({
  sending,
  error,
  response,
  lastAttempt,
  trainingSessionConfig,
}: ConfirmProps) => {
  const awaitingSubmission = lastAttempt === undefined;
  const doneSending =
    !awaitingSubmission && sending === false && response !== undefined;

  if (doneSending && !error) {
    redirect(`/session/${response.processId}`);
  }

  return (
    <Show
      when={doneSending}
      otherwise={
        <Show
          when={
            trainingSessionConfig !== null &&
            trainingSessionConfig !== undefined
          }
        >
          <List
            dataSource={Object.entries(trainingSessionConfig!)}
            renderItem={([k, v]) => {
              const formFieldData =
                trainingSessionFormLabelMap[
                  k as keyof typeof trainingSessionFormLabelMap
                ];
              return (
                <List.Item>
                  <Flex justify="space-between" style={{ width: "100%" }}>
                    <Typography.Text strong>
                      {formFieldData.label}
                    </Typography.Text>
                    <span>
                      {`${v}${
                        formFieldData.unit !== null ? formFieldData.unit : ""
                      }`}
                    </span>
                  </Flex>
                </List.Item>
              );
            }}
          />
        </Show>
      }
    >
      <Result
        style={{ padding: 0 }}
        status={error ? "error" : "success"}
        title={
          <Show when={sending} otherwise={<Show when={error}>Oh no...</Show>}>
            Communicating with robots...
          </Show>
        }
        icon={
          <Show
            when={sending}
            otherwise={error ? <WarningOutlined /> : <CheckCircleOutlined />}
          >
            <LoadingOutlined />
          </Show>
        }
        subTitle={
          <Show when={doneSending}>
            <Show when={error} otherwise={<>Great success</>}>
              We encountered an error
            </Show>
          </Show>
        }
      />
    </Show>
  );
};
export default Confirm;
