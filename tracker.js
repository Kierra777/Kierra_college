window.onload = function () {
    loadColleges();
};

function addCollege() {

    let collegeName = document.getElementById("collegeName").value;
    let deadline = document.getElementById("deadline").value;
    let cost = document.getElementById("cost").value;
    let acceptanceRate = document.getElementById("acceptanceRate").value;
    let testPolicy = document.getElementById("testPolicy").value;
    let applicationType = document.getElementById("applicationType").value;
    let decision = document.getElementById("decision").value;
    let notes = document.getElementById("notes").value;

    if (collegeName === "") {
        alert("Please enter a college name.");
        return;
    }

    createRow(
        collegeName,
        deadline,
        cost,
        acceptanceRate,
        testPolicy,
        applicationType,
        decision,
        notes
    );

    saveColleges();

    document.getElementById("collegeName").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("acceptanceRate").value = "";
    document.getElementById("notes").value = "";
}

function createRow(
    collegeName,
    deadline,
    cost,
    acceptanceRate,
    testPolicy,
    applicationType,
    decision,
    notes
) {

    let table = document.getElementById("collegeTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td contenteditable="true">${collegeName}</td>

        <td contenteditable="true">${deadline}</td>

        <td contenteditable="true">$${cost}</td>

        <td contenteditable="true">${acceptanceRate}%</td>

        <td>
            <select class="form-select form-select-sm test-policy">
                <option ${testPolicy === "Test Optional" ? "selected" : ""}>Test Optional</option>
                <option ${testPolicy === "Test Required" ? "selected" : ""}>Test Required</option>
                <option ${testPolicy === "Test Blind" ? "selected" : ""}>Test Blind</option>
            </select>
        </td>

        <td contenteditable="true">${applicationType}</td>

        <td>
            <select class="form-select form-select-sm decision-select">
                <option ${decision === "Pending" ? "selected" : ""}>Pending</option>
                <option ${decision === "Accepted" ? "selected" : ""}>Accepted</option>
                <option ${decision === "Rejected" ? "selected" : ""}>Rejected</option>
                <option ${decision === "Waitlisted" ? "selected" : ""}>Waitlisted</option>
                <option ${decision === "Deferred" ? "selected" : ""}>Deferred</option>
            </select>
        </td>

        <td contenteditable="true">${notes}</td>

        <td>
            <button
                class="btn btn-danger btn-sm"
                onclick="deleteCollege(this)"
            >
                Delete
            </button>
        </td>
    `;

    row.querySelector(".decision-select")
        .addEventListener("change", saveColleges);

    row.querySelector(".test-policy")
        .addEventListener("change", saveColleges);
}

function deleteCollege(button) {
    button.parentElement.parentElement.remove();
    saveColleges();
}

function saveColleges() {

    let rows = document.querySelectorAll("#collegeTable tr");

    let colleges = [];

    rows.forEach(row => {

        let cells = row.querySelectorAll("td");

        colleges.push({
            college: cells[0].innerText,
            deadline: cells[1].innerText,
            cost: cells[2].innerText,
            acceptanceRate: cells[3].innerText,
            testPolicy: cells[4].querySelector("select").value,
            applicationType: cells[5].innerText,
            decision: cells[6].querySelector("select").value,
            notes: cells[7].innerText
        });

    });

    localStorage.setItem(
        "collegeTracker",
        JSON.stringify(colleges)
    );
}

function loadColleges() {

    let colleges =
        JSON.parse(localStorage.getItem("collegeTracker"))
        || [];

    colleges.forEach(college => {

        createRow(
            college.college,
            college.deadline,
            college.cost.replace("$", ""),
            college.acceptanceRate.replace("%", ""),
            college.testPolicy,
            college.applicationType,
            college.decision,
            college.notes
        );

    });
}

document.addEventListener("input", function () {
    saveColleges();
});
