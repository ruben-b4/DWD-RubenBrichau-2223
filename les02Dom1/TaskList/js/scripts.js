const form = document.querySelector('#frmTask');
const taskList = document.querySelector('#tasks');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const priority = document.querySelector('#selPriority').value;
    const deadline = document.querySelector('#datDeadline').value;
    const taskText = document.querySelector('#txtTask').value;

    const taskHTML = `
      <div class="task">
      <span class="priority material-icons ${priority === 'low' ? 'priority-low' : priority === 'normal' ? 'priority-normal' : 'priority-high'}">${priority === 'low' ? 'assignment' : priority === 'normal' ? 'assignment' : 'assignment'}</span>
         <p class="tasktext">${taskText} ${deadline ? `<span class="deadline">(deadline: ${deadline})</span>` : ''}</p>
         <span class="complete material-icons">more_horiz</span>
      </div>
   `;

    taskList.innerHTML += taskHTML;

    form.reset();
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete')) {
      const taskDiv = e.target.parentNode;
      taskDiv.classList.add('done');
      e.target.textContent = 'done';
    }
});