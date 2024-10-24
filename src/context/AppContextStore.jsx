import React, { useState } from "react";
import AppContext from "./AppContext";
const AppContextStore = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: "column-1",
      title: "To Do",
      cardIds: ["card-1", "card-2"],
    },
    {
      id: "column-2",
      title: "In Progress",
      cardIds: ["card-3"],
    },
    {
      id: "column-3",
      title: "Completed",
      cardIds: ["card-4"],
    },
    {
      id: "column-4",
      title: "Backlog",
      cardIds: ["card-5"],
    },
  ]);
  const [cards, setCards] = useState({
    "card-1": {
      id: "card-1",
      title: "Task 1",
      description: "Description for Task 1",
      badges: [{ label: "Bug", color: "orange" }],
      people: [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Consultant",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
        }
      ],
    },
    "card-2": {
      id: "card-2",
      title: "Task 2",
      description: "Description for Task 2",
      badges: [
        { label: "Urgent", color: "red" },
        { label: "Feature", color: "blue" },
      ],
      people: [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Consultant",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
        }
      ],
    },
    "card-3": {
      id: "card-3",
      title: "Task 3",
      description: "Description for Task 3",
      badges: [
        { label: "Urgent", color: "red" },
        { label: "Feature", color: "blue" },
      ],
      people: [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Consultant",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
        }
      ],
    },
    "card-4": {
      id: "card-4",
      title: "Task 4",
      description: "Description for Task 4",
      badges: [
        { label: "Urgent", color: "red" },
        { label: "Feature", color: "blue" },
      ],
      people: [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Consultant",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
        }
      ],
    },
    "card-5": {
      id: "card-5",
      title: "Task 5",
      description: "Description for Task 5",
      badges: [
        { label: "Urgent", color: "red" },
        { label: "Feature", color: "blue" },
      ],
      people: [
        {
          id: 1,
          name: "John Doe",
          designation: "Software Engineer",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Product Consultant",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
        }
      ],
    },
  });

  return (
    <AppContext.Provider value={{ columns, setColumns, cards, setCards }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextStore;
