//TODO: Fetch data from the postgreSQL database (to be implemented later)
function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("fetching grade data...");
}

// TODO: Populate the table with grade data
function PopulateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("populating gradebook with data:", data);
}

// Removed the call to stubbed fetchGradeData() from the previous code
// The actual code will now fetch from the local server

function fetchGradeData() {
    // This function will query the backend and return grade data
    console.log("Fetching grade data...");
    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // This is the address on the local server we're asking for data
    let apiRoute = "http://localhost:3000/api/grades";  // Corrected API endpoint to local server

    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function() {
        let results;
        // Check if we're done
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Check if we're successful
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
            }
            // And then call the function to update the HTML with our data
            PopulateGradebook(JSON.parse(xhr.responseText));
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook").getElementsByTagName("tbody")[0]; // Get the gradebook table element

    data.forEach(function(assignment) { // For each row of data we're passed in
        let row = document.createElement("tr"); // create a table row element
        let columns = []; // Handy place to stick the columns of information

        columns.name = document.createElement('td'); // This first column's table data will be the name
        columns.name.appendChild(
            // Concatenate the full name: "last_name, first_name"
            document.createTextNode(assignment.last_name + "," + assignment.first_name)
        );

        columns.grade = document.createElement('td'); // second column will be the grade
        columns.grade.appendChild(
            // Just put the name in text, you could be fancy and figure out the letter grade here
            document.createTextNode(assignment.total_grade)
        );

        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade); // Corrected typo here from rpw to row
        // Add the row to the table itself to make the data visible
        tableElm.appendChild(row); // Append the row to the table
    });
}

fetchGradeData(); // Call the function to fetch grade data on page load
