const KanbanBoardService = require("../../services/KanbanServices/KanbanBoardService")

exports.getKanbanBoard = async (req, res) => {
     const { projectId } = req.params;
   
     if (!projectId) {
       return res.status(400).json({ message: "Project ID is required" });
     }
   
     try {
       // Fetch the project with columns and tasks
   
       if (!projectId) {
         return res.status(404).json({ message: "Project not found" });
       }
   
       const kanbanBoard = await KanbanBoardService.getKanbanBoard(projectId);
   
       res.status(200).json({ message: "Kanban board fetched successfully", kanbanBoard });
     } catch (error) {
       console.error("Error fetching Kanban board:", error.message);
       res.status(500).json({ message: "Failed to fetch Kanban board" });
     }
   };
   