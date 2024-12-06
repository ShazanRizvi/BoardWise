import React, { useState } from "react";
import ProductCard from "./ProductDashboardComponents/ProductCard";
import { Button } from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import AddEditTaskDialog from "../DashboardElements/ProjectBoardComponents/AddEditTaskDialog";

const ProductDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div className="m-4 px-8 w-full">
      <div className=" flex justify-between items-center ">
        <div>
          <h1 className="text-4xl font-bold">Your Products</h1>
          <p className="text-base  font-normal">
            These are the products which exist in your Organization
          </p>
        </div>
        <div>
          <Button
            className="px-4 py-2"
            variant="default"
            size
            onClick={handleDialogOpen}
          >
            <span className="mr-1">
              <FaPlus size={24} />
            </span>{" "}
            <span className="mr-1">Add Product</span>
          </Button>
        </div>
        
      </div>
      <div>
          <AddEditTaskDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            Title="Add Product"
            icon={<FaPlus size={24} />}
          ></AddEditTaskDialog>
        </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductDashboard;
