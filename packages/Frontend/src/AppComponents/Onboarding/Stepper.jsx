import React from "react";
import { AnimatedStepper } from "@/components/ui/animated-stepper";

function Stepper({ currentStep, steps }) {
  return (
    <div className="space-y-8 p-8">
      <AnimatedStepper steps={steps} currentStep={currentStep} />
    </div>
  );
}

export default Stepper;
