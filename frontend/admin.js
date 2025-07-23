document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('admin-login-form');
  const loginSection = document.getElementById('admin-login-section');
  const dashboardSection = document.getElementById('admin-dashboard-section');
  const errorDiv = document.getElementById('admin-login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const contactTableBody = document.getElementById('contact-submissions-tbody');

  // Temporary admin credentials
  const TEMP_ADMIN_USER = 'Admin@gmail.com';
  const TEMP_ADMIN_PASS = '15902580';

  // Handle login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    // Check against hardcoded temporary credentials
    if (username === TEMP_ADMIN_USER && password === TEMP_ADMIN_PASS) {
      loginSection.style.display = 'none';
      dashboardSection.style.display = 'block';
      loadSubmissions();
    } else {
      errorDiv.textContent = 'Invalid admin credentials';
      errorDiv.style.display = 'block';
    }
  });

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
  });

  // Load submissions from Firebase
  async function loadSubmissions() {
    try {
      const res = await fetch('https://edubuilder-e8208-default-rtdb.firebaseio.com/contacts.json');
      const data = await res.json();

      contactTableBody.innerHTML = ''; // Clear old rows

      if (data) {
        Object.entries(data).forEach(([id, entry]) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.message}</td>
            <td><button class="delete-btn" data-id="${id}">Delete</button></td>
          `;
          contactTableBody.appendChild(row);
        });

        // Attach delete handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const confirmDelete = confirm("Are you sure you want to delete this submission?");
            if (confirmDelete) {
              await fetch(`https://edubuilder-e8208-default-rtdb.firebaseio.com/contacts/${id}.json`, {
                method: 'DELETE'
              });
              btn.closest('tr').remove(); // Remove row from UI
            }
          });
        });
      }
    } catch (err) {
      console.error('Error loading submissions:', err);
    }
  }
});
