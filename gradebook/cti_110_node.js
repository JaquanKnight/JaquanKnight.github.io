const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Pool } = require('pg');

// PostgreSQL connection setup
const connectionString = `postgres://postgres:postgres@localhost:5432/Gradebook_Knight`;
const pool = new Pool({ connectionString: connectionString });

// Serve static files (like gradebook.js) from the 'public' folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// When the root path is accessed, return the gradebook HTML page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'Knight_gradebook.html'));
});
app.use("/", router);

// API endpoint to get grade data from the database
router.get('/api/grades', function(req, res) {
    pool.query(
        `SELECT 
        Students.student_id,
        first_name,
        last_name,
        MAX(CASE WHEN assignments.assignment_name = 'Assignment 1' THEN assignments.grade END) AS assignment_1,
        MAX(CASE WHEN assignments.assignment_name = 'Assignment 2' THEN assignments.grade END) AS assignment_2,
        MAX(CASE WHEN assignments.assignment_name = 'Assignment 3' THEN assignments.grade END) AS assignment_3
    FROM Students
    LEFT JOIN Assignments ON Assignments.student_id = Students.student_id
    GROUP BY Students.student_id, first_name, last_name
    ORDER BY last_name`,
        [],
        function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching grades.");
            }

            // Log the fetched grades (optional)
            result.rows.forEach(function(row) {
                console.log(`Student Name: ${row.first_name} ${row.last_name}`);
                console.log(`Grade: ${row.total_grade}`);
            });

            // Send the result rows as a JSON response to the frontend
            res.status(200).json(result.rows);
        }
    );
});

// Start the server on port 3000
let server = app.listen(3000, function() {
    console.log("App Server via Express is listening on port 3000");
    console.log("To quit, press CTRL + C");
});