const KanbanColumn = require("../../services/KanbanServices/ColumnService")

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
   