"use client";
import { Button, Card, Flex, Steps } from "antd";
import { useState } from "react";

export default function TrainingSessionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Name",
      content: "Name the training session",
    },
    {
      title: "Match type",
      content: "Select the match type",
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
    <Flex vertical style={{ padding: 10 }} gap={10}>
      <Steps progressDot current={currentStep} items={items} />
      <Card>
        <Flex>{steps[currentStep].content}</Flex>
      </Card>
      <Flex justify="space-between">
        <Button>prev</Button>
        <Button>next</Button>
      </Flex>
    </Flex>
  );
}
