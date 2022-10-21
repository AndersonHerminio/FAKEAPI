// const url = 'https://jsonplaceholder.typicode.com/posts';
// const table = document.querySelector('.table-render');
// const inputFilter = document.querySelector('#inputFilter');
// const deleteBtn = document.querySelector('#deleteBtn');
// const editBtn = document.querySelector('#editBtn');
// const forceBtn = document.querySelector('#forceBtn');
// const titleForm = document.querySelector('#titleForm');
// const bodyForm = document.querySelector('#bodyForm');
// const onInit = async () => {
//   !getLocal() && await handlePromise();
//   renderTable();
// };
// const nameNormalized = text => {
//   return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
// }
// const getLocal = () => localStorage.getItem('datas');
// const setLocal = value => localStorage.setItem('datas', JSON.stringify(value));
// const getData = (url) => {
//   return axios({ method: 'GET', url });
// };
// const handlePromise = async () => {
//   const datas = await getData(url)
//     .then(resp => {
//       return resp.data;
//     })
//     .catch(err => console.log(err));
//   setLocal(datas);
// };
// const renderTable = (data = getLocal()) => {
//   let localDatas
//   typeof data === ‘string’ ? localDatas = JSON.parse(data) : localDatas = data
//   if (!localDatas.length) {
//     return table.innerHTML ='<p class=‘text-center font-weight-bold’>Sem dados Encontrado!</p>';
//   }
//   let html = localDatas.map(value => {
//     return `
//       <tr>
//       <td>${value.id}</td>
//       <td>${value.title}</td>
//       <td><div class='dropdown'>
//       <button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
//         Ações
//       </button>
//       <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
//         <a class='dropdown-item' onclick=‘editItem(${value.id})’ style='cursor:pointer;' data-toggle='modal' data-target='#editModal'>Editar</a>
//         <a class='dropdown-item' onclick=‘removeItem(${value.id})’ style='cursor:pointer;' data-toggle='modal' data-target='#removeRemove'>Remover</a>
//       </div>
//       </div></td>
//       </tr>
//     `;
//   });
//   table.innerHTML = html.join('');
// };
// const editItem = value => {
//   const localDatas = JSON.parse(getLocal())
//   const edit = localDatas.find(data => {
//     return data.id === value
//   });
//   titleForm.value = edit.title
//   bodyForm.value = edit.body
//   editBtn.addEventListener(‘click’, () => {
//     edit.title = titleForm.value
//     edit.body = bodyForm.value
//     localDatas.id = edit
//     setLocal(localDatas);
//     $(‘#editModal’).modal(‘hide’);
//     renderTable();
//   })
// };
// const removeItem = value => {
//   deleteBtn.addEventListener('click', () => {
//     const localDatas = JSON.parse(getLocal());
//     const remove = localDatas.filter((data) => {
//       if (data.id !== value) {
//         return true;
//       }
//     });
//     setLocal(remove);
//     $(‘#removeRemove’).modal(‘hide’);
//     renderTable();
//   });
// };
// forceBtn.addEventListener(‘click’, () => {
//   localStorage.clear()
//   onInit();
// })
// inputFilter.addEventListener(‘keyup’, () => {a
//   const localDatas = JSON.parse(getLocal())
//   if(!inputFilter.value){
//     return renderTable();
//   }
//   const filterData = localDatas.filter(data => {
//     if(nameNormalized(data.title).includes(nameNormalized(inputFilter.value)) || data.id.toString().includes(inputFilter.value)) {
//       return true
//   })
//   renderTable(filterData)
// })
// onInit();