"use strict";

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputAmount = document.getElementById('amount');
const btnForm = document.querySelector('.form-btn');
const btnDel = document.querySelector('.btn-del')
const tbody = document.querySelector('.table-body')
const defaultRow = document.querySelector('.default-row')

let counter = 0;

const clearFields = function() {
    inputName.value = '';
    inputDate.value = '';
    inputAmount.value = '';
};

const postItem = function(data) {
    tbody.insertAdjacentHTML("beforeend", data);
}

const loadData = function() {
   const data = localStorage.getItem('listItem');
   if(!data) return;
   defaultRow.classList.add('hidden');
   console.log(data);
   postItem(data);
}

// loadData();

btnForm.addEventListener('click', function(e) {
    e.preventDefault();
    if(!inputName.value || !inputAmount.value || inputAmount.value < 0) return;

    counter++;
    defaultRow.classList.add('hidden');

    const html = `<tr>
    <td class="table-content">${inputName.value}</td>
    <td class="table-content">${inputDate.value}</td>
    <td class="table-content">$${(+inputAmount.value).toFixed(2)}</td>
    <td class="table-content"><button class="btn-del">X</button></td>
    </tr>`;

    postItem(html);

    // localStorage.setItem('listItem', html);
    // tbody.insertAdjacentHTML("beforeend", html);
    clearFields();
});

tbody.addEventListener('click', function(e) {
    const clicked = e.target.closest('.btn-del');
    if(!clicked) return;
    console.log(clicked);
    clicked.closest('tr').innerHTML = '';
    counter--;
    if(counter === 0) {
        defaultRow.classList.remove('hidden');
    };
});

