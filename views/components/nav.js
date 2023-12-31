const navbar = document.querySelector('#navbar');

const createNavhome = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
        <!-- <p class="font-bold text-xl text-orange-500">Agenda</p> -->
        <a class="font-bold text-xl text-orange-500 outline-orange-500" href="/">Agenda</a>

<!-- version movil  -->
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 md:hidden
            text-orange-500 cursor-pointer 
            p-2
            hover:bg-amber-800
            rounded-lg">
            <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>

<!-- version escritorio -->
        <div class="hidden md:flex flex-row gap-4">
            <a href="/login" class="transition ease-in-out text-orange-500 font-bold hover:bg-orange-300 py-2 px-4 rounded-lg">Login</a>
            <a href="/signup" class="transition ease-in-out text-white font-bold bg-orange-500 hover:bg-amber-700 py-2 px-4 rounded-lg">Registro</a>
        </div>
        <!-- menu movil -->
        <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
            <a href="/login" class="transition ease-in-out text-white font-bold hover:bg-orange-500 py-2 px-4 rounded-lg">Login</a>
            <a href="/signup" class="transition ease-in-out text-white font-bold bg-orange-500 hover:bg-amber-700 py-2 px-4 rounded-lg">Registro</a>
        </div>
    </div>
`;
};

const createNavSignup = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
    <!-- <p class="font-bold text-xl text-orange-500">Agenda</p> -->
    <a class="font-bold text-xl text-orange-500 outline-orange-500" href="/">Agenda</a>

<!-- version movil  -->
    <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden
        text-orange-500 cursor-pointer 
        p-2
        hover:bg-amber-800
        rounded-lg">
        <path stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
    </svg>

<!-- version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <a href="/login/" class="transition ease-in-out text-orange-500 font-bold hover:bg-orange-300 py-2 px-4 rounded-lg">Login</a>
    </div>
    <!-- menu movil -->
    <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-orange-500 py-2 px-4 rounded-lg">Login</a>
    </div>
</div>
    `;
};

const createNavLogin = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
    <!-- <p class="font-bold text-xl text-orange-500">Agenda</p> -->
    <a class="font-bold text-xl text-orange-500 outline-orange-500" href="/">Agenda</a>

<!-- version movil  -->
    <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 md:hidden
        text-orange-500 cursor-pointer 
        p-2
        hover:bg-amber-800
        rounded-lg">
        <path stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
    </svg>

<!-- version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <a href="/signup/" class="transition ease-in-out text-orange-500 font-bold hover:bg-orange-300 py-2 px-4 rounded-lg">Registro</a>
    </div>
    <!-- menu movil -->
    <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <a href="/signup/" class="transition ease-in-out text-white font-bold hover:bg-orange-500 py-2 px-4 rounded-lg">Registro</a>
    </div>
</div>
    `;
};

const createNavAgenda = () => {
  navbar.innerHTML = `
      <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-xl text-orange-500">Agenda</p>
  
  <!-- version movil  -->
      <svg xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 md:hidden
          text-orange-500 cursor-pointer 
          p-2
          hover:bg-amber-800
          rounded-lg">
          <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
      </svg>
  
  <!-- version escritorio -->
      <div class="hidden md:flex flex-row gap-4">
          <button id="close-btn" class="transition ease-in-out text-orange-500 font-bold hover:bg-orange-300 py-2 px-4 rounded-lg">Cerrar Sesion</button>
      </div>
      <!-- menu movil -->
      <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <button id="close-btn" class="transition ease-in-out text-orange-500 font-bold hover:bg-orange-300 py-2 px-4 rounded-lg">Cerrar Sesion</button>
      </div>
  </div>
      `;
};

if (window.location.pathname === '/') {
  createNavhome();
} else if (window.location.pathname === '/signup/') {
  createNavSignup();
} else if (window.location.pathname === '/login/') {
  createNavLogin();
} else if (window.location.pathname === '/agenda/') {
  createNavAgenda();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', () => {
  const menuMobile = navbar.children[0].children[3];
  if (!navBtn.classList.contains('active')) {
    navBtn.classList.add('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
    menuMobile.classList.remove('hidden');
    menuMobile.classList.add('flex');
  } else {
    navBtn.classList.remove('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />';
    menuMobile.classList.add('hidden');
    menuMobile.classList.remove('flex');
  }
});

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];

closeBtnDesktop.addEventListener('click', async e => {
  try {
    await axios.get('/api/logout');
    window.location.pathname = '/login';
  } catch (error) {
    console.log(error);
  }
});

closeBtnMobile.addEventListener('click', async e => {
  try {
    await axios.get('/api/logout');
    window.location.pathname = '/login';
  } catch (error) {
    console.log(error);
  }
});
