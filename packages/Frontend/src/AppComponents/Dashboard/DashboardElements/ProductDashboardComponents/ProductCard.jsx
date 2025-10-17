import React, { useEffect, useState, useContext } from "react";
import { HoverEffect } from "../../../../components/ui/card-hover-effect";

import Loader from "../../../../utils/Loader";

const ProductCard = ({ products, loading }) => {
  //Move to utils afterwards
  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Handle cases where the text is null or undefined
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return loading ? (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>
  ) : (
    <div className="max-w-full mx-auto w-full">
      <HoverEffect
        items={products?.map((item) => ({
          title: item?.productName,
          description: truncateText(item?.description, 100),
          link: `/dashboard/project_dashboard/${item?.id}`,
        }))}
      />
    </div>
  );
};

export default ProductCard;

