const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Parse incoming JSON requests
app.use(express.json());
// Cors middleware that allows us to make requests from the frontend to the backend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Bibek980",
  database: "todo",
});

// Connect to the database
db.connect((err) => {
  if (!err) {
    console.log("Connected to the database");
  } else {
    console.log("Failed to connect to the database");
  }
});

// Handles the creation of a new task and saves it to the database.
app.post("/new-task", (req, res) => {
  console.log(req.body);
  const q = "insert into task (Task_Name, CreatedAt, Status) values (?, ?, ?)";
  db.query(q, [req.body.task, new Date(), "active"], (err, result) => {
    if (err) {
      return responseReturn(res, 404, { error: "Invalid Email" });
      console.log("failed to store");
    } else {
      console.log("todo saved");
      const updatedTasks = "select * from task";
      db.query(updatedTasks, (error, newList) => {
        res.send(newList);
      });
    }
  });
});

app.get("/read-task", (req, res) => {
  const q = "select * from task";
  db.query(q, (err, result) => {
    if (err) {
      console.log(`Failed to read tasks`);
    } else {
      console.log("Read Data Successfully from database");
      res.send(result);
    }
  });
});

// app.post("/update-task", (req, res) => {
//   console.log(req.body);
//   const q = "update task set Task_Name = ? where id = ?";
//   db.query(q, [req.body.task, req.body.updateId], (err, result) => {
//     if (err) {
//       console.log("failed to update");
//     } else {
//       console.log("updated");
//       db.query("select* from todos", (e, r) => {
//         if (e) {
//           console.log(e);
//         } else {
//           res.send(r);
//         }
//       });
//     }
//   });
// });

app.post("/update-task", (req, res) => {
  console.log(req.body);

  const { updateId, task } = req.body;

  if (!updateId || !task) {
    return res
      .status(400)
      .send("Invalid request: Missing task name or update ID.");
  }

  const q = "UPDATE task SET Task_Name = ? WHERE id = ?";

  db.query(q, [task, updateId], (err, result) => {
    if (err) {
      console.log("Failed to update:", err);
      return res.status(500).send("Database error");
    }

    console.log("Task updated successfully");

    // Fetch the updated list after update
    db.query("SELECT * FROM task", (e, r) => {
      if (e) {
        console.log(e);
        return res.status(500).send("Error fetching tasks");
      }
      res.send(r);
    });
  });
});

app.post("/delete-task", (req, res) => {
  const q = "delete from task where id = ?";
  db.query(q, [req.body.id], (err, result) => {
    if (err) {
      console.log("Failed to delete");
    } else {
      console.log("Deleted successfully");
      db.query("select * from task", (e, newList) => {
        res.send(newList);
      });
    }
  });
});

app.post("/complete-task", (req, res) => {
  console.log(req.body);

  const q = "update task set status = ? where id = ?";
  db.query(q, ["completed", req.body.id], (err, result) => {
    if (result) {
      db.query("select * from task", (e, newList) => {
        res.send(newList);
      });
    }
  });
});

// Start the server and listen on port 5000
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
