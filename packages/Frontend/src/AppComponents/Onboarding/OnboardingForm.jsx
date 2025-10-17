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
import SignUp from "./Forms/SignUp";
import CreateOrganization from "./Forms/CreateOrganization";
import CreateProduct from "./Forms/CreateProduct";
import SignUpCreateProject from "./Forms/SignUpCreateProject";



const OnboardingForm = () => {
  const {currentStep, steps} = useContext(AppContext);
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <SignUp />;
      case 2:
        return <CreateOrganization />;
      case 3:
        return <CreateProduct />;
      case 4:
        return <SignUpCreateProject />;
      default:
        return <SignUp />;
    }
  };
  
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

          <CardContent>{renderStepComponent()}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;
