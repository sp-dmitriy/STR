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

  // Закрываем меню при клике на ссылку
  mobileNav.querySelectorAll('.header__mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open')
      burger.classList.remove('is-active')
      burger.setAttribute('aria-expanded', 'false')
      mobileNav.setAttribute('aria-hidden', 'true')
    })
  })

  // Закрываем меню при клике вне хедера
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
      mobileNav.classList.remove('is-open')
      burger.classList.remove('is-active')
      burger.setAttribute('aria-expanded', 'false')
      mobileNav.setAttribute('aria-hidden', 'true')
    }
  })
})
