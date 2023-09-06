const contactInput = document.querySelector('#contact-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');
const PHONE_REGEX = /^[0](412|414|416|426|424|212)[0-9]{7}$/;
const CONTACT_REGEX = /^[A-ZÑ][a-zñ]{2,10} [A-ZÑ][a-zñ]{4,16}$/;
let contactValidation = false;
let phoneValidation = false;
let isValidateName = true;
let isValidatePhone = true;
// const editBtn = document.querySelector('#edit-btn');

const validateInput = (input, isValidedRegex, texShow) => {
  formBtn.disabled = contactValidation && phoneValidation ? false : true;
  if (input.value === '') {
    input.classList.add('focus:outline-amber-600');
    input.classList.remove('outline-green-700', 'outline-2', 'outline');
    input.classList.remove('outline-red-700', 'outline-2', 'outline');
    texShow?.classList.add('hidden');
    texShow?.classList.remove('flex');
  } else if (isValidedRegex) {
    input.classList.remove('focus:outline-amber-600');
    input.classList.add('outline-green-700', 'outline-2', 'outline');
    input.classList.remove('outline-red-700', 'outline-2', 'outline');
    texShow?.classList.add('hidden');
    texShow?.classList.remove('flex');
  } else {
    input.classList.remove('focus:outline-amber-600');
    input.classList.remove('outline-green-700', 'outline-2', 'outline');
    input.classList.add('outline-red-700', 'outline-2', 'outline');
    texShow?.classList.add('flex');
    texShow?.classList.remove('hidden');
  }
};

contactInput.addEventListener('input', () => {
  contactValidation = CONTACT_REGEX.test(contactInput.value);
  const texShow = form.children[1];
  validateInput(contactInput, contactValidation, texShow);
});

phoneInput.addEventListener('input', () => {
  phoneValidation = PHONE_REGEX.test(phoneInput.value);
  const texShow = form.children[3];
  validateInput(phoneInput, phoneValidation, texShow);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // crea en la base de datos
  const { data } = await axios.post('/api/contactos', {
    contacto: contactInput.value,
    phone: phoneInput.value,
  });
  const li = document.createElement('li');
  li.id = data.id;
  list.classList.add('p-2', 'h-1/4');
  li.classList.add('flex', 'flex-row', 'gap-3');
  li.innerHTML = `
      <input class="placeholder:text-white/30 rounded-lg p-2 bg-orange-400 focus:outline-amber-600 outline-none text-center w-1/3 md:w-1/2 sm:w-1/2" type="text" value="${data.contacto}" readonly>
      <input class="placeholder:text-white/30 rounded-lg p-2 bg-orange-400 focus:outline-amber-600 outline-none text-center w-1/3 md:w-1/2 sm:w-1/2" type="text" value="${data.phone}" readonly>
      <button class="delete-btn w-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
      <button class="edit-btn w-8"><svg class="svg-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
  `;
  list.append(li);
  contactInput.value = '';
  phoneInput.value = '';
  validateInput(contactInput);
  validateInput(phoneInput);
  contactValidation = false;
  phoneValidation = false;
  formBtn.disabled = true;
});

list.addEventListener('click', async (e) => {
  if (e.target.closest('.delete-btn')) {
    const li = e.target.closest('.delete-btn').parentElement;
    const btnDelete = li.children[2];
    btnDelete.innerHTML = `
    <div class="delete"><div></div><div></div><div></div><div></div></div>
    `;
    btnDelete.disabled = true;
    await axios.delete(`/api/contactos/${li.id}`);
    li.remove();
  }
  if (e.target.closest('.edit-btn')) {
    const editIcon = e.target.closest('.edit-btn');
    const editInput = editIcon.parentElement.children[0];
    const editInput2 = editIcon.parentElement.children[1];
    editInput.addEventListener('input', () => {
      isValidateName = CONTACT_REGEX.test(editInput.value);
      validateInput(editInput, isValidateName);
    });
    editInput2.addEventListener('input', () => {
      isValidatePhone = PHONE_REGEX.test(editInput2.value);
      validateInput(editInput2, isValidatePhone);
    });
    if (editIcon.classList.contains('editando') && isValidateName && isValidatePhone
    ) {
      const li = editIcon.parentElement;
      await axios.patch(`/api/contactos/${li.id}`, { contacto: editInput.value, phone: editInput2.value });
      editIcon.classList.remove('editando');
      editInput.setAttribute('value', editInput.value);
      editInput.setAttribute('readonly', 'true');
      editInput.classList.remove('editing');
      editInput2.setAttribute('value', editInput2.value);
      editInput2.setAttribute('readonly', 'true');
      editInput2.classList.remove('editing');
      editInput.classList.remove('outline-green-700', 'outline-2', 'outline');
      editInput2.classList.remove('outline-green-700', 'outline-2', 'outline');
      editIcon.innerHTML = `
      <svg class="svg-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          `;
    } else {
      editIcon.classList.add('editando');
      editInput.removeAttribute('readonly');
      editInput.classList.add('editing');
      editInput2.removeAttribute('readonly');
      editInput2.classList.add('editing');
      const end = editInput.value.length;
      editInput.setSelectionRange(end, end);
      editInput.focus();
      editIcon.innerHTML = `
      <svg class="svg-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" ><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
            `;
    }
  }
});

(async () => {
  try {
    const { data } = await axios.get('/api/contactos', {
      withCredentials: true,
    });
    data.forEach(agendados => {
      const li = document.createElement('li');
      li.id = agendados.id;
      list.classList.add('p-2', 'h-1/4');
      li.classList.add('flex', 'flex-row', 'gap-3');
      li.innerHTML = `
          <input class="placeholder:text-white/30 rounded-lg p-2 bg-orange-400 focus:outline-amber-600 outline-none text-center w-1/3 md:w-1/2 sm:w-1/2" type="text" value="${agendados.contacto}" readonly>
          <input class="placeholder:text-white/30 rounded-lg p-2 bg-orange-400 focus:outline-amber-600 outline-none text-center w-1/3 md:w-1/2 sm:w-1/2" type="text" value="${agendados.phone}" readonly>
          <button class="delete-btn w-8"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
          <button class="edit-btn w-8"><svg class="svg-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
      `;

      list.append(li);
    });
  } catch (error) {
    window.location.pathname = '/login';
  }
})();
