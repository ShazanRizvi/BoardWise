import React, {useEffect, useState} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeammatesCard from "./SidePreviewComponents/TeammatesCard";
import ExisitngProjectCard from "./SidePreviewComponents/ExisitngProjectCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const SidePreview = ({isDropdownActive}) => {
  const [activeTab, setActiveTab] = useState("previousProjects");
  useEffect(() => {
    setActiveTab(isDropdownActive ? "teammates" : "previousProjects");
  }, [isDropdownActive]);
  return (
    <Tabs defaultValue="previousProjects" value={activeTab} onValueChange={setActiveTab}  className="w-full">
      <TabsList>
        <TabsTrigger value="previousProjects">Your Projects</TabsTrigger>
        <TabsTrigger value="teammates">Teammates</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full overflow-scroll" value="previousProjects">
          <ScrollArea className="  h-[900px] w-full rounded-2xl ">
               <div className="mb-5">
               <ExisitngProjectCard />
               </div>
               <div className="mb-5">
               <ExisitngProjectCard />
               </div>
               <div className="mb-5">
               <ExisitngProjectCard />
               </div>
               <div className="mb-5">
               <ExisitngProjectCard />
               </div>
               <div className="mb-5">
               <ExisitngProjectCard />
               </div>
          </ScrollArea>
        
      </TabsContent>
      <TabsContent value="teammates">
        <TeammatesCard />
      </TabsContent>
    </Tabs>
  );
};

export default SidePreview;
