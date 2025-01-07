import React, { useState, useEffect, useMemo } from "react";
import AppContext from "./AppContext";
import callAPI from "../http/axios";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const AppContextStore = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chatType, setChatType] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [usersOfOrg, setUsersOfOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const [currentProjectBoard, setCurrentProjectBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);

  const defaultImages = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  ];
  //Fetch All Users in an organization
  const fetchallUsersofOrg = async () => {
    setLoading(true);
    try {
      const response = await callAPI("GET", `/organizations/users`, null, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });

      const people = response?.users?.map((user, index) => ({
        id: index + 1,
        name: user.username || "Unknown User", // Fallback in case username is null
        designation:
          user.userOrgPosition || user.role.join(", ") || "No Position", // Use userOrgPosition or fallback to role
        image: defaultImages[index % defaultImages.length], // Cycle through default images
      }));

      setUsersOfOrg(people);
      console.log("users of org from context", people);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  //Fetch the current logged in user
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("access_token");
    try {
      // Call the API to get user details
      const response = await callAPI("GET", "/current_user/details", null, {
        Authorization: `Bearer ${token}`,
      });
      setCurrentUserDetails(response.data); // Set user details to state
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchCurrentProjectBoard = async (projectId) => {
    setLoading(true);
    try {
      const response = await callAPI("GET", `/kanban/${projectId}`, null, {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      });
      const transformKanbanData = (response) => {
        const transformedColumns = response.kanbanBoard.columns.map(
          (column) => ({
            id: column.id,
            title: column.title,
            cardIds: column.cards.map((card) => card.id),
          })
        );

        const transformedCards = {};
        response.kanbanBoard.columns.forEach((column) => {
          column.cards.forEach((card) => {
            transformedCards[card.id] = {
              id: card.id,
              title: card.name,
              description: card.description,
              badges: card.status
                ? [{ label: card.status, color: "blue" }]
                : [{ label: "TBD", color: "red" }],
                people: [
                  ...(card.createdBy ? [{
                      id: card.createdBy.id,
                      name: card.createdBy.name,
                      designation: "Task Creator",
                      image: "https://via.placeholder.com/150"
                  }] : []),
                  ...(card.assignedTo ? [{
                      id: card.assignedTo.id,
                      name: card.assignedTo.name,
                      designation: "Assigned To",
                      image: "https://via.placeholder.com/150"
                  }] : [])
              ]
            };
          });
        });

        return { columns: transformedColumns, cards: transformedCards };
      };
      const transformedKanbanData = transformKanbanData(response);
      setCurrentProjectBoard(transformedKanbanData);
      console.log("current project board", transformedKanbanData);
      setColumns(transformedKanbanData.columns);
      setCards(transformedKanbanData.cards);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchallUsersofOrg();
    fetchUserDetails();
  }, []);

  const [invitedUserEmail, setInvitedUserEmail] = useState("");
  const openDrawerWithChat = (type, card) => {
    setChatType(type);
    setSelectedCard(card);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Animated Stepper
  const [currentStep, setCurrentStep] = useState(1);
  const savedStep = parseInt(localStorage.getItem("currentStep")) || 1;
  // const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        title: "Step 1",
        description: "Personal Info",
        stepDescription: "Enter your personal information",
        stepRoute: "personal-info",
      },
      {
        title: "Step 2",
        description: "Create Organization",
        stepDescription: "Create your organization",
        stepRoute: "create-organization",
      },
      {
        title: "Step 3",
        description: "Create Product",
        stepDescription: "Create your product",
        stepRoute: "create-product",
      },
      {
        title: "Step 4",
        description: "Create Project",
        stepDescription: "Create your project",
        stepRoute: "create-project",
      },
    ],
    []
  );
  // Save the current step in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  // Handle navigation to the correct route based on the current step
  const handleStepChange = (step) => {
    setCurrentStep(step);
    window.history.pushState(
      null,
      "",
      `/onboarding/${steps[step - 1].stepRoute}`
    );
  };

  // Reset the stepper on page refresh
  useEffect(() => {
    const handlePageRefresh = () => {
      setCurrentStep(1);
      localStorage.setItem("currentStep", 1);
      window.history.pushState(null, "", `/onboarding/${steps[0].stepRoute}`);
    };
    window.addEventListener("beforeunload", handlePageRefresh);

    // Clean up the event listener
    return () => {
      window.removeEventListener("beforeunload", handlePageRefresh);
    };
  }, [steps]);

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const currentRoute = window.location.pathname.split("/").pop();
      const matchedStep =
        steps.findIndex((step) => step.stepRoute === currentRoute) + 1;
      setCurrentStep(matchedStep || 1);
    };
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [steps]);

  return (
    <AppContext.Provider
      value={{
        columns,
        setColumns,
        cards,
        setCards,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawerWithChat,
        closeDrawer,
        chatType,
        selectedCard,
        currentStep,
        steps,
        setCurrentStep,
        handleStepChange,
        invitedUserEmail,
        setInvitedUserEmail,
        usersOfOrg,
        products,
        setProducts,
        currentUserDetails,
        fetchCurrentProjectBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextStore;
