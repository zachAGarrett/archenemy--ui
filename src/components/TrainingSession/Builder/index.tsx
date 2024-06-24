"use client";
import { Button, Card, Divider, Flex, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import useLocalStorage from "@/hooks/useLocalStorage";
import Metadata from "./sections/Metadata";
import Rules from "./sections/Rules";
import Target from "./sections/Target";
import Opponents from "./sections/Opponents";
import useSubmitFlow from "./hooks/useSubmitFlow";
import Confirm from "./sections/Confirm";
import { TrainingSessionConfig } from "./types";

export const trainingSessionFormLabelMap = {
  name: {
    label: "Session name",
    errorMessage: "Give your session a name",
    unit: null,
  },
  targetSize: {
    label: "Target size",
    errorMessage: "Choose a target size",
    unit: "cm",
  },
  targetDistance: {
    label: "Target distance",
    errorMessage: "Choose a target distance",
    unit: "m",
  },
  opponentDifficulty: {
    label: "Opponent difficulty distribution",
    errorMessage: "Choose the skill level of your opponents",
    unit: null,
  },
  opponentCount: { label: "Number of opponents", unit: null },
  arrowsPerEnd: {
    label: "Arrows per end",
    errorMessage: "Select the number of arrows per end",
    unit: null,
  },
  timer: {
    label: "Time per arrow",
    errorMessage: "Choose the amount of time per arrow",
    unit: "s",
  },
  discipline: {
    label: "Discipline",
    errorMessage: "Select a discipline",
    unit: null,
  },
};

export const initialTrainingSessionConfigState: TrainingSessionConfig = {
  name: "",
  targetSize: "122",
  targetDistance: "70",
  opponentDifficulty: [30, 70, 90],
  opponentCount: 63,
  arrowsPerEnd: 6,
  timer: 40,
  discipline: "recurve",
};

export default function TrainingSessionBuilder() {
  const { responseData, error, sending, submitForm, retry, lastAttempt } =
    useSubmitFlow();
  const [sectionStatus, setSectionStatus] =
    useState<StepsProps["status"]>("process");
  const [currentStep, setCurrentStep] = useLocalStorage("currentStep", 0);
  const [editedSteps, setEditedSteps] = useLocalStorage<number[]>(
    "editedSteps",
    []
  );
  const [trainingSessionConfig, setTrainingSessionConfig] =
    useLocalStorage<TrainingSessionConfig>(
      "form",
      initialTrainingSessionConfigState
    );
  const [trainingSessionBuilderForm] = useForm();

  // load previous form instance or set default values
  useEffect(() => {
    if (
      trainingSessionConfig === undefined ||
      trainingSessionConfig === null ||
      Object.keys(trainingSessionConfig).length === 0
    ) {
      return;
    }
    trainingSessionBuilderForm.setFieldsValue(trainingSessionConfig);
  }, []);

  const next = async () => {
    try {
      const activeFields = trainingSessionBuilderForm.getFieldsValue();
      await trainingSessionBuilderForm.validateFields(
        Object.keys(activeFields)
      );
      setTrainingSessionConfig((s) => ({ ...s, ...activeFields }));
      setCurrentStep(currentStep ? currentStep + 1 : 1);
      setEditedSteps([
        ...new Set(editedSteps ? [...editedSteps, currentStep || 0] : [0]),
      ]);
      setSectionStatus("process");
    } catch (error) {
      setSectionStatus("error");
    }
  };

  const previous = () => {
    setSectionStatus("process");
    setCurrentStep(currentStep ? currentStep - 1 : 0);
  };

  const submit = async () => {
    try {
      const activeFields = trainingSessionBuilderForm.getFieldsValue();
      await trainingSessionBuilderForm.validateFields(
        Object.keys(activeFields)
      );
      const mergedValues = { ...activeFields, ...trainingSessionConfig };
      setTrainingSessionConfig(mergedValues);
      setSectionStatus("process");
      await submitForm({
        data: mergedValues,
      });
    } catch (error) {
      setSectionStatus("error");
    }
  };

  const steps = [
    {
      title: "Metadata",
      content: <Metadata form={trainingSessionBuilderForm} />,
    },
    {
      title: "Target",
      content: <Target form={trainingSessionBuilderForm} />,
    },
    {
      title: "Rules",
      content: <Rules form={trainingSessionBuilderForm} />,
    },
    {
      title: "Opponents",
      content: <Opponents form={trainingSessionBuilderForm} />,
    },
    {
      title: "Confirm",
      content: (
        <Confirm
          sending={sending}
          error={error}
          retry={retry}
          response={responseData}
          lastAttempt={lastAttempt}
          trainingSessionConfig={trainingSessionConfig}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Flex
      vertical
      style={{ padding: 10, height: "100%" }}
      gap={10}
      align="center"
    >
      <Steps
        onChange={(k) => {
          editedSteps?.includes(k) && setCurrentStep(k);
        }}
        progressDot
        current={currentStep!}
        items={items}
        type={"inline"}
        status={sectionStatus}
      />
      <Card style={{ width: "100%", flex: 1 }}>
        {steps[currentStep!].content}
      </Card>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Button disabled={!currentStep} onClick={previous} size="large">
          Back
        </Button>
        <Divider type="vertical" style={{ height: "100%" }} />
        <Button
          type="primary"
          size="large"
          onClick={currentStep === steps.length - 1 ? submit : next}
        >
          {currentStep === steps.length - 1 ? "Start Session" : "Next"}
        </Button>
      </Flex>
    </Flex>
  );
}
