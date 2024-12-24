import React from "react";
import { HoverEffect } from "../../../../components/ui/card-hover-effect";

const DashboardCard = ({ projects }) => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  ];
  console.log("projects from dashboard card", projects);

  const transformedProjects=(projects)=>{

    return projects?.map((project) => {
      return {
        title: project.projectName,
        description: project.description || "No description available",
        link: `/dashboard/project/${project.id}`,
        people: project.users.map((user, index) => ({
          id: user.id,
          name: user.username || "Unknown User", // Fallback in case username is null
          designation: user.userOrgPosition || "No Position", // Use userOrgPosition or fallback to role
          image: defaultImages[index % defaultImages.length], // Placeholder image generator
        })),
      };
    });
  }
  return (
    <div className="max-w-full mx-auto ">
      <HoverEffect
        items={transformedProjects(projects)}
      />
    </div>
  );
};

export default DashboardCard;

// export const projects = [
//   {
//     title: "Project Alpha",
//     description: "An AI-driven platform for real-time data analysis.",
//     link: "/dashboard/project/123",
//     people: [
//       {
//         id: 1,
//         name: "Alice Johnson",
//         designation: "Project Manager",
//         image:
//           "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
//       },
//       {
//         id: 2,
//         name: "Bob Smith",
//         designation: "Data Scientist",
//         image:
//           "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
//       },
//     ],
//   },
//   {
//     title: "Project Beta",
//     description: "A web app for seamless movie streaming.",
//     link: "/dashboard/project_dashboard/beta",
//     people: [
//       {
//         id: 3,
//         name: "John Doe",
//         designation: "Software Engineer",
//         image:
//           "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=60",
//       },
//       {
//         id:4,
//         name: "Jane Doe",
//         designation: "UX Designer",
//         image:
//           "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=60",
//       },
//     ],
//   },
//   {

//     title: "Project Gamma",
//     description: "An e-commerce platform with integrated AI shopping assistant.",
//     link: "/dashboard/project_dashboard/gamma",
//     people: [
//       {
//         id: 5,
//         name: "Sara Lee",
//         designation: "Product Manager",
//         image:
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=3540&q=80",
//       },
//       {
//         id: 6,
//         name: "Mark Wilson",
//         designation: "Backend Developer",
//         image:
//           "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=3534&q=80",
//       },
//     ],
//   },
//   {
//     title: "Project Delta",
//     description: "A cloud-based platform for business analytics.",
//     link: "/dashboard/project_dashboard/delta",
//     people: [
//       {
//         id:7,
//         name: "Emily Davis",
//         designation: "Business Analyst",
//         image:
//           "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
//       },
//       {
//         id: 8,
//         name: "Tom Harris",
//         designation: "Data Engineer",
//         image:
//           "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
//       },
//       {
//         id:9,
//         name: "Lucy Brown",
//         designation: "Frontend Developer",
//         image:
//           "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=60",
//       },
//     ],
//   },
// ];
