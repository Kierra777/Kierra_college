window.onload = function () {
    let college = localStorage.getItem("selectedCollege");
    let rate = localStorage.getItem("selectedAcceptanceRate");
  
    if (college) document.getElementById("collegeName").value = college;
    if (rate) document.getElementById("acceptanceRate").value = rate;
  };
  
  function calculateChance() {
    let college = document.getElementById("collegeName").value;
    let rate = Number(document.getElementById("acceptanceRate").value);
    let gpa = Number(document.getElementById("gpa").value);
    let act = Number(document.getElementById("act").value);
    let activities = Number(document.getElementById("activities").value);
    let rigor = Number(document.getElementById("rigor").value);
  
    let score = 0;
  
    score += gpa * 18;
    score += act * 2;
    score += activities * 2;
    score += rigor * 2;
    score += rate;
  
    let result = document.getElementById("result");
  
    if (score >= 145) {
      result.innerHTML = "🟢 High Chance for " + college;
      result.style.background = "#d4f8d4";
    } else if (score >= 115) {
      result.innerHTML = "🟡 Moderate Chance for " + college;
      result.style.background = "#fff1b8";
    } else {
      result.innerHTML = "🔴 Reach School for " + college;
      result.style.background = "#ffd6d6";
    }
  }
  
  function goBack() {
    window.location.href = "index.html";
  }
