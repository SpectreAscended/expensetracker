"use strict";

const inputName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputAmount = document.getElementById('amount');
const btnForm = document.querySelector('.form-btn');
const btnDel = document.querySelector('.btn-del');
const btnClr = document.querySelector('.clear-btn')
const tbody = document.querySelector('.table-body');
const defaultRow = document.querySelector('.default-row')

// const foo = document.querySelector('.foo')

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
    for(let i = 1; i < 50; i++) {
        const data = localStorage.getItem(`${i}`)
        if(!data) return;
        defaultRow.classList.add('hidden');
        counter = i;
        postItem(data);
    };
};

loadData();

btnForm.addEventListener('click', function(e) {
    e.preventDefault();
    if(!inputName.value || !inputAmount.value || inputAmount.value < 0) return;

    counter++;
    defaultRow.classList.add('hidden');

    const html = `<tr class="content-rows">
    <td class="table-content">${inputName.value}</td>
    <td class="table-content">${inputDate.value}</td>
    <td class="table-content">$${(+inputAmount.value).toFixed(2)}</td>
    <td class="table-content"><button class="btn-del">X</button></td>
    </tr>`;

    postItem(html);

    localStorage.setItem(`${counter}`, html);

    clearFields();
});

tbody.addEventListener('click', function(e) {
    const clicked = e.target.closest('.btn-del');
    if(!clicked) return;
    clicked.closest('tr').innerHTML = '';
    counter--;
    if(counter === 0) {
        defaultRow.classList.remove('hidden');
    };
});

btnClr.addEventListener('click', function(e) {
    const trows = document.querySelectorAll('tbody .content-rows')
    defaultRow.classList.remove('hidden');
    e.preventDefault();
    trows.forEach(row => row.innerHTML = '');
    localStorage.clear();
    counter = 0;
})
