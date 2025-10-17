import React from "react";
import { ExpandableCard } from "../../../../components/ui/expandable-card";

const TeammatesCard = () => {
  const cards = [
    {
      description: "Software Developer",
      title: "Ajay Negi",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      ctaText: "Call",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
           Eat, Code, Sleep, Repeat!!
          </p>
        );
      },
    },
    {
      description: "Ashton Kutcher",
      title: "Devops Engineer",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      ctaText: "Call",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Automate, Deploy and Chill!!
          </p>
        );
      },
    },

    {
      description: "Ashish Sharma",
      title: "Technical Lead",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      ctaText: "Call",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
           Technical Leads are responsible for overseeing the design and development of software systems. 
          </p>
        );
      },
    },
    {
      description: "Zubin Mehta",
      title: "Architect",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      ctaText: "Call",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Lead Architects are responsible for overseeing the design and
            Development
          </p>
        );
      },
    },
    {
      description: "Mustafa Syed",
      title: "Analyst",
      src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
      ctaText: "Call",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Data Analysts are responsible for interpreting data and turning it
            into information which can offer ways to improve a business, thus
            affecting business decisions. Data Analysts gather information from
            various sources and interpret patterns and trends – as such a Data
            Analyst job description should highlight the analytical nature of
            the role.
          </p>
        );
      },
    },
  ];

  return (
    <div>
      <ExpandableCard cards={cards} />
    </div>
  );
};

export default TeammatesCard;
