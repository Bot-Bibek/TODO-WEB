const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mysql = require("mysql2");
const app = express();

// Create a connection to the database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Bibek980",
	database: "sys",
});

// Connect to the database
db.connect((err) => {
	if (!err) {
		console.log("Connected to the database");
	} else {
		console.log(err);
	}
});

app.use(express.json());
app.use(cors()); // Cors middleware that allows us to make requests from the frontend to the backend



app.post("/new-task", (req, res) => {
	console.log(req.body);
	const q = `insert into todo (Todo_Task, CreatedAt) values (?, ?)`;
	db.query(q, [req.body.task, new Date()], (err, result) => {
		if (err) {
			console.log(`Failed to save task`);
		} else {
			console.log("task Saved");
		}
	});
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
