const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const { createServer } = require("http"); // Required to integrate Socket.IO
const { Server } = require("socket.io"); // Import Socket.IO

const authRoutes = require("./src/routes/authRoutes");
const organizationRoutes = require("./src/routes/organizationRoutes");
const productRoutes = require("./src/routes/productRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/KanbanRoutes/taskRoutes');
const columnRoutes = require('./src/routes/KanbanRoutes/columnRoutes');
const kanbanBoardRoutes = require('./src/routes/KanbanRoutes/KanbanBoardRoutes');

const cors = require("cors");
const path = require("path");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const redisClient = redis.createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
});

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,              // Allow credentials (cookies)
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Boardwise API Documentation",
            version: "1.0.0",
            description: "API documentation for Boardwise server",
        },
        servers: [
            {
                url: "http://localhost:5050", // Replace with your server URL
            },
        ],
        tags: [
            {
                name: "Admin User Onboarding",
                description: "Endpoints related to user Onboarding Steps",
            },
            {
                name: "Invite Users to Org",
                description: "Endpoints related to inviting users to an organization",
            },
            {
                name: "Login",
                description: "Endpoints related to user logiin (Admin and TeamMember)",
            },
            {
                name: "Get Resources",
                description: "Endpoints related to accessing all resources like products, projects, users",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Optional: specify the token format
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ensure Redis is fully connected before setting up session middleware
redisClient.connect().then(() => {
    console.log("Connected to Redis Cloud");

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || 'your_secret_key',
        resave: false,
        saveUninitialized: true, // Set to true temporarily for testing
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }
    }));
   
    const server = createServer(app); // Wrap express app with HTTP server for Socket.IO
    const io = new Server(server, {
        cors: {
            origin: `${process.env.BOARDWISE_FRONTEND_HOST}`, // Frontend origin
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
    
        // Event: Task moved
        socket.on("taskMoved", (data) => {
            console.log("Task moved:", data);
    
            // Broadcast task update to other clients
            socket.broadcast.emit("taskUpdated", data);
        });
    
        // Event: Task created
        socket.on("taskCreated", (data) => {
            console.log("Task created:", data);
    
            // Broadcast task creation to other clients
            socket.broadcast.emit("taskAdded", data);
        });
    
        // Event: Task deleted
        socket.on("taskDeleted", (data) => {
            console.log("Task deleted:", data);
    
            // Broadcast task deletion to other clients
            socket.broadcast.emit("taskRemoved", data);
        });
    
        // Disconnect event
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
  

    // Define routes after session middleware initialization
    app.use("/api/organizations", organizationRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks",taskRoutes);
    app.use("/api/columns",columnRoutes);
    app.use("/api/current_user", userRoutes);
    app.use("/api/kanban", kanbanBoardRoutes);

    app.get("/", (req, res) => {
        res.send("Welcome to Boardwise server");
    });

    // Test route to check session creation
    app.get('/test-session', (req, res) => {
        req.session.testKey = "Test value";
        res.send("Session data set");
    });

    // Optional logout route to clear session
    app.get('/api/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logged out successfully' });
        });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error' });
    });

    const PORT = process.env.DATABASE_PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(console.error);

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});