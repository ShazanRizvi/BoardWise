import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductDashboardComponents/ProductCard";
import { Button } from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import { FcGenealogy } from "react-icons/fc";
import AddEditTaskDialog from "../DashboardElements/ProjectBoardComponents/AddEditTaskDialog";
import AddProductFrom from "./ProductDashboardComponents/AddProductFrom";
import Loader from "@/utils/Loader";
import { useNavigate } from "react-router-dom";
import callAPI from "@/http/axios";
import Topbar from "../Topbar";
import { Badge } from "../../../components/ui/badge";
import AppContext from "../../../context/AppContext";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUserDetails } = useContext(AppContext);
  

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await callAPI("GET", "/products/products", null, {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        });

        setProducts(response?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [navigate]);

  console.log(products);

  return loading ? (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>
  ) : (
    <div className="w-full ">
    <Topbar orgName={currentUserDetails?.organization?.organizationName} orgLogo={currentUserDetails?.organization?.orgLogo}/>
      <div className=" px-8 w-full mt-2">
        <div className=" flex justify-between items-center ">
          <div>
            <h1 className="text-4xl font-bold ">Your Products</h1>
            
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
            icon={<FcGenealogy size={24} />}
          >
            <AddProductFrom />
          </AddEditTaskDialog>
        </div>
        <div>
          <ProductCard products={products} loading={loading} />
        </div>
      </div>
      </div>
  
  );
};

export default ProductDashboard;
