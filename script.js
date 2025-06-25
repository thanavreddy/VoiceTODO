const startBtn = document.getElementById('start-btn');
const taskList = document.getElementById('task-list');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition");
}

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.trim();
  if (transcript) addTask(transcript);
};

recognition.onerror = (e) => {
  console.error('Speech recognition error:', e);
};

startBtn.addEventListener('click', () => {
  recognition.start();
});

function addTask(text) {
  const li = document.createElement('li');
  li.className = "flex items-center justify-between p-3 bg-white/10 rounded-lg";

  const checkboxId = "chk_" + Date.now();

  li.innerHTML = `
    <label class="flex items-center flex-1 cursor-pointer">
      <input type="checkbox" class="checkbox" id="${checkboxId}" onchange="toggleComplete('${checkboxId}')">
      <span id="label_${checkboxId}" class="text-white">${text}</span>
    </label>
    <button onclick="this.parentElement.remove()" class="ml-4 text-red-400 hover:text-red-600">🗑</button>
  `;

  taskList.appendChild(li);
}

function toggleComplete(id) {
  const label = document.getElementById('label_' + id);
  label.classList.toggle('task-completed');
}
