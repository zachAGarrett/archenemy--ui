import Show from "@/components/Show";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Divider, Flex, List, Result, Typography } from "antd";
import useSubmitFlow from "../hooks/useSubmitFlow";
import { TrainingSessionConfig } from "../types";
import { trainingSessionFormLabelMap } from "..";

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
  retry,
  response,
  lastAttempt,
  trainingSessionConfig,
}: ConfirmProps) => {
  const awaitingSubmission = lastAttempt === undefined;
  const doneSending =
    !awaitingSubmission && sending === false && response !== undefined;

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
            renderItem={([k, v]) => (
              <List.Item>
                <Flex justify="space-between" style={{ width: "100%" }}>
                  <Typography.Text strong>
                    {
                      trainingSessionFormLabelMap[
                        k as keyof typeof trainingSessionFormLabelMap
                      ]?.label
                    }
                  </Typography.Text>
                  <span>{v}</span>
                </Flex>
              </List.Item>
            )}
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
