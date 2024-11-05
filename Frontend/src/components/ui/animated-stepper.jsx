import React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { IoArrowBack } from "react-icons/io5";
import { MdSubdirectoryArrowLeft } from "react-icons/md";


const AnimatedStepper = ({ steps, currentStep }) => {
  return (
    (<div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  index < currentStep
                    ? "bg-primary-200  text-primary-foreground"
                    : index === currentStep
                    ? "border-primary-500 text-primary"
                    : "border-muted text-muted-foreground"
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <motion.div
                className="mt-2 text-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </motion.div>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                className="flex-1 h-0.5 bg-muted"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index < currentStep ? 1 : 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>)
  );
}

const StepperControls = ({ currentStep, totalSteps, onNext, onPrev }) => {
  return (
    (<div className="flex justify-between gap-4 w-full">
      <button
        onClick={onPrev}
        disabled={currentStep === 1}
        className=" w-10 h-10 flex justify-center items-center rounded-full text-sm font-medium text-white border-primary-200 border hover:bg-primary-100/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">
        <IoArrowBack size={20} color='#8b5cf6'/>
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className="px-4 py-2 w-full flex justify-center items-center text-sm font-medium rounded-md text-white bg-primary  hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="gap-2">Next</span>{'   '}<MdSubdirectoryArrowLeft size={20}/>
      </button>
    </div>)
  );
}

export { AnimatedStepper, StepperControls }