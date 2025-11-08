import React, { useContext, useState } from "react";
import Spline from "@splinetool/react-spline";
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
import Loader from "../../utils/Loader";

const OnboardingForm = () => {
  const { currentStep, steps } = useContext(AppContext);
  const [loadingSpline, setLoadingSpline] = useState(true);
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

  const loadingtimeout = () => {
    setTimeout(() => {
      setLoadingSpline(false);
    }, 2000);
  };

  loadingtimeout();

  return (
    <div>
      <div className="flex items-center justify-start h-screen">
        <Card className="w-1/2 border-none shadow-none p-10">
          <div>
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].description}</CardTitle>
            <CardDescription>
              {steps[currentStep - 1].stepDescription}
            </CardDescription>
          </CardHeader>

          <CardContent>{renderStepComponent()}</CardContent>
        </Card>
        <div className=" w-1/2 h-screen flex items-center justify-center">
          {loadingSpline ? (
            <Loader width={100} height={100} />
          ) : (
            <Spline scene="https://prod.spline.design/wlkvn7dBjaz0ZTeV/scene.splinecode" />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
