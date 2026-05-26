
function readFileToTextarea(fileInputId, textareaId) {
  const fileInput = document.getElementById(fileInputId);

  fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById(textareaId).value = e.target.result;
    };

    reader.readAsText(file);
  });
}

readFileToTextarea("rubricFile", "rubricText");
readFileToTextarea("assignmentFile", "assignmentText");

document.getElementById("evaluateBtn").addEventListener("click", () => {
  const rubric = document.getElementById("rubricText").value.trim();
  const assignment = document.getElementById("assignmentText").value.trim();
  const results = document.getElementById("results");

  if (!rubric || !assignment) {
    results.innerText = "Please upload or paste both a rubric and assignment.";
    return;
  }

  const score = Math.floor(Math.random() * 15) + 85;

  results.innerText =
`Estimated Score: ${score}/100

Strengths:
• Assignment is organized
• Clear topic and structure
• Meets several rubric requirements

Areas to Improve:
• Add more supporting details
• Improve transitions between ideas
• Double-check spelling and grammar

Teacher Recommendation:
Review the rubric carefully and ensure each section of your assignment directly addresses the listed criteria.`;
});

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(type, text) {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `<span class="${type}">${type === "student" ? "Student" : "Teacher AI"}:</span> ${text}`;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();

  if (!text) return;

  addMessage("student", text);

  const replies = [
    "Try adding more evidence to support your argument.",
    "Your introduction is good, but your conclusion could be stronger.",
    "Make sure every paragraph connects back to the rubric.",
    "You could improve sentence variety for better readability.",
    "Consider adding examples to make your explanation clearer."
  ];

  const response = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    addMessage("teacher", response);
  }, 700);

  chatInput.value = "";
});
