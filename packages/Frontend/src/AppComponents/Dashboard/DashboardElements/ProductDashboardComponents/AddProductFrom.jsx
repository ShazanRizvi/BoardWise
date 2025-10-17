import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import callAPI from "@/http/axios";
import LoaderWhite from "../../../../utils/LoaderWhite";

const AddProductForm = () => {
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("handleSubmit triggered");

    try {
      const response = await callAPI("POST", "/products/create_product", values, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });
      console.log("response", response);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        productName: "",
        description: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid gap-4">
            {/* Product Name */}
            <div className="w-full">
              <Label htmlFor="productName">Product Name</Label>
              <Field
                id="productName"
                name="productName"
                type="text"
                placeholder="Give Your Product a Name"
                as={Input}
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="col-span-4 text-red-500 text-sm"
              />
            </div>

            {/* Product Description */}
            <div className="w-full">
              <Label htmlFor="description">Product Description</Label>
              <Field
                id="description"
                name="description"
                placeholder="Give Your Product a Description"
                as={Textarea}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="col-span-4 text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <Button type="submit" className="w-full">
                <span className="gap-2">
                    
                  {loading ? (
                    <LoaderWhite width={20} height={20} />
                  ) : (
                    <div className="flex">Add Product</div>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
