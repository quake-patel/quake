let stages = ["first", "second", "third", "forth", "fifth", "sixth", "seventh"];
let currentStage = 0;

// Load existing click data from localStorage (if available)
let clickData = JSON.parse(localStorage.getItem("clickData")) || {
  yesClicks: 0,
  noClicks: 0,
  history: [],
};

// Handle No (Pro) button clicks
$(".no-click").click(() => {
  $(".no-click").removeClass(stages[currentStage]);

  currentStage++;

  if (currentStage >= stages.length) currentStage = 0;

  $(".no-click").addClass(stages[currentStage]);

  // Track No button click
  clickData.noClicks++;
  clickData.history.push({
    type: "no",
    time: new Date().toLocaleString(),
    stage: stages[currentStage],
  });

  // Save updated data to localStorage
  localStorage.setItem("clickData", JSON.stringify(clickData));
});

// Handle Yes (Stock) button clicks
$(".yes-click").click(() => {
  $(".image").addClass("yes");
  $(".no-click").addClass("none");

  // Track Yes button click
  clickData.yesClicks++;
  clickData.history.push({
    type: "yes",
    time: new Date().toLocaleString(),
  });

  // Save updated data to localStorage
  localStorage.setItem("clickData", JSON.stringify(clickData));
});

// 🎯 Function to download data as a JSON file
function downloadJSON(data, filename = "clickData.json") {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

// Add a download button (Optional)
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download Click Data";
downloadButton.classList.add("download-btn");
document.body.appendChild(downloadButton);

// Trigger download on button click
downloadButton.addEventListener("click", () => downloadJSON(clickData));
