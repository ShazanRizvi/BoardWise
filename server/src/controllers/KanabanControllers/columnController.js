const KanbanColumn = require("../../services/KanbanServices/ColumnService")


exports.getColumnsByProjectId = async (req, res) => {
     const { projectId } = req.params;
   
     if (!projectId) {
       return res.status(400).json({ message: "Project ID is required" });
     }
   
     try {
       const columns = await KanbanColumn.getColumnsByProject(projectId);
   
       res.status(200).json({ message: "Columns fetched successfully", columns });
     } catch (error) {
       console.error("Error fetching columns:", error.message);
       res.status(500).json({ message: "Failed to fetch columns" });
     }
   };

exports.createColumn = async (req, res) => {
     const { name, position, projectId } = req.body;
   
     if (!name || !position || !projectId) {
       return res.status(400).json({ message: "Name, position, and project ID are required" });
     }
   
     try {
      const column = await KanbanColumn.createColumn(name, position, projectId);
   
       res.status(201).json({ message: "Column created successfully", column });
     } catch (error) {
       console.error("Error creating column:", error.message);
       res.status(500).json({ message: "Failed to create column" });
     }
   };

   exports.updateColumn = async (req, res) => {
     const { columnId } = req.params;
     const { name, position } = req.body;
     if (!columnId) {
          return res.status(400).json({ message: "Column ID is required" });
        }
   
     try {
       const column = await KanbanColumn.updateColumn(columnId, name, position);
   
       res.status(200).json({ message: "Column updated successfully", column });
     } catch (error) {
       console.error("Error updating column:", error.message);
       res.status(500).json({ message: "Failed to update column" });
     }
   }

   
   exports.deleteColumn = async (req, res) => {
     const { columnId } = req.params;
   
     if (!columnId) {
       return res.status(400).json({ message: "Column ID is required" });
     }
   
     try {
       const column = await KanbanColumn.deleteColumn(columnId);
   
       res.status(200).json({ message: "Column deleted successfully", column });
     } catch (error) {
       console.error("Error deleting column:", error.message);
       res.status(500).json({ message: "Failed to delete column" });
     }
   };
   