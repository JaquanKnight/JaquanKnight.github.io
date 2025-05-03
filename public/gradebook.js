// Fetch grade data from the backend API
function fetchGradeData() {
    console.log("Fetching grade data...");
    let xhr = new XMLHttpRequest();
    let apiRoute = "http://localhost:3000/api/grades";  // Corrected API endpoint

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
            }
            // Once the data is fetched, call function to populate the table
            PopulateGradebook(JSON.parse(xhr.responseText));
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

// Populate gradebook table with fetched data
function PopulateGradebook(data) {
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook").getElementsByTagName("tbody")[0]; // Get the gradebook table element

    // Clear existing table rows (if any)
    tableElm.innerHTML = "";

    // Iterate through each student record and add them to the table
    data.forEach(function(student) {
        let row = document.createElement("tr"); // create a table row element

        // Create a cell for the student's name
        let nameCell = document.createElement('td');
        nameCell.textContent = `${student.last_name}, ${student.first_name}`;
        row.appendChild(nameCell);

        // Create cells for each assignment grade
        let grade1Cell = document.createElement('td');
        grade1Cell.textContent = student.assignment_1 || 'N/A';  // Show "N/A" if there's no grade
        row.appendChild(grade1Cell);

        let grade2Cell = document.createElement('td');
        grade2Cell.textContent = student.assignment_2 || 'N/A';
        row.appendChild(grade2Cell);

        let grade3Cell = document.createElement('td');
        grade3Cell.textContent = student.assignment_3 || 'N/A';
        row.appendChild(grade3Cell);

        // Append the row to the table
        tableElm.appendChild(row);
    });
}

// Fetch and populate grade data when the page loads
fetchGradeData();
