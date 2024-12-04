import * as React from "react";

const LoaderWhite = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 150"
    width={props.width || 50} // Optional: Customize width via props
    height={props.height || 50} // Optional: Customize height via props
    {...props}
  >
    <path
      fill="none"
      stroke="#F6F6F6"
      strokeWidth="15" // Changed `stroke-width` to `strokeWidth` (JSX syntax)
      strokeLinecap="round" // Changed `stroke-linecap` to `strokeLinecap` (JSX syntax)
      strokeDasharray="300 385" // Changed `stroke-dasharray` to `strokeDasharray` (JSX syntax)
      strokeDashoffset="0" // Changed `stroke-dashoffset` to `strokeDashoffset` (JSX syntax)
      d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
    >
      <animate
        attributeName="stroke-dashoffset"
        calcMode="spline"
        dur="2s" // Added units to `dur`
        values="685;-685"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default LoaderWhite;
