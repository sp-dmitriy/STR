document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger')
  const mobileNav = document.querySelector('.header__mobile-nav')

  if (!burger || !mobileNav) return

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open')
    burger.classList.toggle('is-active', isOpen)
    burger.setAttribute('aria-expanded', String(isOpen))
    mobileNav.setAttribute('aria-hidden', String(!isOpen))
  })

  mobileNav.querySelectorAll('.header__mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open')
      burger.classList.remove('is-active')
      burger.setAttribute('aria-expanded', 'false')
      mobileNav.setAttribute('aria-hidden', 'true')
    })
  })

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
      mobileNav.classList.remove('is-open')
      burger.classList.remove('is-active')
      burger.setAttribute('aria-expanded', 'false')
      mobileNav.setAttribute('aria-hidden', 'true')
    }
  })
})


// Модалка 
const openBtns = document.querySelectorAll('.openModal');
const closeBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const requestForm = document.getElementById('requestForm');

// Функция валидации телефона (РФ формат)
function validatePhone(phone) {
  const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return re.test(phone.trim());
}

// Функция переключения класса ошибки
function toggleFieldError(wrapper, isValid) {
  if (!isValid) {
    wrapper.classList.add('error'); 
  } else {
    wrapper.classList.remove('error'); 
  }
}

// Функция полного сброса ошибок в форме
function clearAllErrors() {
  const wrappers = requestForm.querySelectorAll('.input-wrapper');
  wrappers.forEach(wrapper => wrapper.classList.remove('error'));
}

function openModal(event) {
  event.preventDefault();
  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = ''; 
  requestForm.reset();
  clearAllErrors(); 
}

openBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});

closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
      closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
  }
});

requestForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;

  // Здесь логика отправки данных на сервер (например, через fetch)
  console.log('Данные отправлены:', { name, phone });
  alert(`Спасибо, ${name}! Заявка принята. мы свяжемся с вами по телефону: ${phone}`);

  closeModal();
});