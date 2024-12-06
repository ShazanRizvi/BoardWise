import React, { useEffect, useState } from "react";
import { HoverEffect } from "../../../../components/ui/card-hover-effect";
import callAPI from "@/http/axios";
import Loader from "../../../../utils/Loader";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await callAPI("GET", "/products/products", null, {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        });
        console.log("response", response?.products);
        setProducts(response?.products);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [navigate]);

  console.log("products", products);

  

  return loading ? (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>
  ) : (
    <div className="max-w-full mx-auto w-full">
      <HoverEffect items={products?.map((item)=>({title:item?.productName, description:item.organization.organizationName}))} />
    </div>
  );
};

export default ProductCard;

// export const products = [
//   {
//     title: "Product 1",
//     description: "This product prevails for AI stuff",
//     link: "/dashboard/project_dashboard/1",
//   },
//   {
//     title: "Netflix",
//     description:
//       "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
//     link: "/dashboard/project_dashboard/2",
//   },
//   {
//     title: "Google",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
//   {
//     title: "Meta",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: "https://meta.com",
//   },
//   {
//     title: "Amazon",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: "https://amazon.com",
//   },
//   {
//     title: "Microsoft",
//     description:
//       "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
//     link: "https://microsoft.com",
//   },
// ];
