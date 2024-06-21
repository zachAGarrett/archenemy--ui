"use client";
import { Button, Card, Flex, Steps, StepsProps } from "antd";
import { useEffect, useState } from "react";
import TrainingSessionName from "./TrainingSessionName";
import { useForm } from "antd/es/form/Form";
import useLocalStorage from "@/hooks/useLocalStorage";
import submitNewTrainingSession from "./submitNewTrainingSession";
import TrainingSessionParameters from "./TrainingSessionParameters";

export default function TrainingSessionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [sectionStatus, setSectionStatus] =
    useState<StepsProps["status"]>("process");
  const [filledValues, setFilledValues] = useLocalStorage<{ [k: string]: any }>(
    "form",
    {}
  );
  const [trainingSessionBuilderForm] = useForm();
  const sessionNamePlaceholder = new Date(Date.now()).toLocaleDateString();

  // load previous form instance
  useEffect(() => {
    if (
      filledValues === undefined ||
      filledValues === null ||
      Object.keys(filledValues).length === 0
    )
      return;
    trainingSessionBuilderForm.setFieldsValue(filledValues);
  }, []);

  const next = async () => {
    try {
      const activeFields = trainingSessionBuilderForm.getFieldsValue();
      await trainingSessionBuilderForm.validateFields(
        Object.keys(activeFields)
      );
      setFilledValues((s) => ({ ...s, ...activeFields }));
      setCurrentStep(currentStep + 1);
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
      const mergedValues = { ...activeFields, ...filledValues };
      setFilledValues(mergedValues);
      setCurrentStep(currentStep + 1);
      setSectionStatus("process");
      await submitNewTrainingSession({
        data: mergedValues,
      });
    } catch (error) {
      setSectionStatus("error");
    }
  };

  const steps = [
    {
      title: "Name",
      content: <TrainingSessionName form={trainingSessionBuilderForm} />,
    },
    {
      title: "Parameters",
      content: <TrainingSessionParameters form={trainingSessionBuilderForm} />,
    },
    {
      title: "Virtual opponents",
      content: "Add virtual opponents",
    },
    {
      title: "Confirm",
      content: "review / confirm",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Flex vertical style={{ padding: 10, height: "100%" }} gap={10} align="center">
      <Steps
        progressDot
        current={currentStep}
        items={items}
        type={"inline"}
        status={sectionStatus}
      />
      <Card style={{ width: "100%", flex: 1 }}>{steps[currentStep].content}</Card>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Button onClick={previous}>prev</Button>
        <Button onClick={currentStep === steps.length - 1 ? submit : next}>
          next
        </Button>
      </Flex>
    </Flex>
  );
}
