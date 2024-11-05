import React, {useContext} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stepper from "./Stepper";
import AppContext from "../../context/AppContext";


const OnboardingForm = ({ cardTitle, cardDescription, children }) => {
  const {currentStep, steps} = useContext(AppContext);
  console.log("currentStep", currentStep);
  return (
    <div className="">
      <div className="flex items-center justify-start h-screen">
        <Card className="w-1/2 border-none shadow-none p-10">
        <div>
        <Stepper steps={steps} currentStep={currentStep}/>
      </div>
          <CardHeader>
            <CardTitle>{steps[currentStep-1].description}</CardTitle>
            <CardDescription>{steps[currentStep-1].stepDescription}</CardDescription>
          </CardHeader>

          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;
