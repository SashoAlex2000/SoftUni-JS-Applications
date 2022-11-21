import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';

async function solve() {

   // function for getting the values from the server
   async function getData() {

      const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
      const data = await response.json();
      return Object.values(data);

   }

   const info = await getData();

   // function for updating the table rows with the appropriate data
   async function update(listOfIds) {
      const placeRows = (rowData) => html`
    ${rowData.map((r => html`
      <tr id="${r._id}" class="${(listOfIds.indexOf(r._id) >=0)?'select':'default'}">
         <td>${r.firstName} ${r.lastName}</td>
         <td>${r.email}</td>
         <td>${r.course}</td>
      </tr>
      `))}
      `;

      const root = document.querySelector('tbody');
      const result = placeRows(info);
      console.log(info);
      render(result, root);
   }

   update([]);

   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {

      const userInput = document.getElementById('searchField');
      console.log(userInput.value);

      const specialIDs = [];

      for (let entry of info) {

         for (let [key, value] of Object.entries(entry)) {
            if (key !== '_id') {
               if (value.toLowerCase().includes(userInput.value.toLowerCase())) {
                  specialIDs.push(entry._id);
                  break;
               }
            }
         }

      }

      console.log(specialIDs);
      userInput.value = '';
      update(specialIDs);

   }
}

solve();

