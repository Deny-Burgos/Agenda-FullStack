const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    // eslint-disable-next-line no-undef
    await axios.post('/api/login', user);
    window.location.pathname = '/agenda/';
  } catch (error) {
    console.log(error);
    errorText.innerHTML = error.response.data.error;
  }
});