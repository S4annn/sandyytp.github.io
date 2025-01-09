// Pilih elemen yang dibutuhkan
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

// Fungsi untuk menyimpan data task ke Local Storage
function saveTaskToLocalStorage() {
    const tasks = [];
    const rows = taskList.querySelectorAll('tr');
    rows.forEach((row) => {
        const taskText = row.querySelector('td:nth-child(2)').textContent;
        const isCompleted = row.querySelector('td:nth-child(1) button').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk mengambil data task dari Local Storage
function getTaskFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTaskToTable(task.text, task.completed);
    });
}

// Fungsi untuk menambahkan task ke tabel
function addTaskToTable(taskText, isCompleted = false) {
    const newRow = document.createElement('tr');

    // Kolom untuk tombol bulet (status)
    const statusCell = document.createElement('td');
    const doneButton = document.createElement('button');
    doneButton.className = 'status-button';
    doneButton.textContent = isCompleted ? '✔' : '';
    doneButton.style.borderRadius = '50%';
    doneButton.style.width = '20px';
    doneButton.style.height = '20px';
    doneButton.style.border = '1px solid #ccc';
    doneButton.style.cursor = 'pointer';
    doneButton.onclick = () => {
        taskTextCell.style.textDecoration = taskTextCell.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        doneButton.textContent = doneButton.textContent === '✔' ? '' : '✔';
        doneButton.classList.toggle('completed');
        saveTaskToLocalStorage();
    };
    statusCell.appendChild(doneButton);

    // Kolom untuk teks task
    const taskTextCell = document.createElement('td');
    taskTextCell.textContent = taskText;
    if (isCompleted) {
        taskTextCell.style.textDecoration = 'line-through';
    }

    // Kolom untuk tombol hapus
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖'; 
    deleteButton.style.color = '#808080';
    deleteButton.style.marginLeft = '20px';
    deleteButton.style.borderRadius = '50%'; 
    deleteButton.style.border = 'none'; 
    deleteButton.style.background = 'none'; 
    deleteButton.style.cursor = 'pointer'; 
    deleteButton.style.fontSize = '16px';
    deleteButton.onclick = () => {
        taskList.removeChild(newRow);
        saveTaskToLocalStorage();
    };
    actionCell.appendChild(deleteButton);

    // Gabungkan semua kolom ke dalam baris
    newRow.appendChild(statusCell);
    newRow.appendChild(taskTextCell);
    newRow.appendChild(actionCell);

    // Tambahkan baris ke tabel
    taskList.appendChild(newRow);
}

// Ambil data task dari Local Storage saat halaman dimuat
getTaskFromLocalStorage();

// Tambahkan event listener pada form
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah form submit
    const taskValue = taskInput.value.trim();
    if (taskValue !== '') {
        addTaskToTable(taskValue);
        saveTaskToLocalStorage();
        taskInput.value = ''; // Kosongkan input
    }
});

// Tambahkan event listener untuk tombol Clear All
clearBtn.addEventListener('click', () => {
    taskList.innerHTML = ''; // Hapus semua task
    localStorage.removeItem('tasks'); // Hapus data dari Local Storage
});

// Tambahkan event listener untuk memastikan animasi mulai setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Semua elemen yang ingin dianimasikan
  const animElements = document.querySelectorAll('.container, #taskForm, #taskTable, h1, #clearBtn, #btn');
  
  // Tambahkan kelas animasi agar elemen muncul
  animElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate');
    }, index * 300); // Tambahkan sedikit jeda antar elemen
  });
});
