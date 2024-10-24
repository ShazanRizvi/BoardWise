import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const AddEditTaskDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  Title,
  Description,
  children,
  icon
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <div>
                {icon}
              </div>
              <div>
              {Title ? Title : "Title"}
              </div>
            </div>
            
            </DialogTitle>
          <DialogDescription>
            {Description ? Description : ""}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskDialog;
