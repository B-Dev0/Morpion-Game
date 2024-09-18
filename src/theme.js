export function swipTheme(v) {
    const body = document.querySelector('body');
    const isDarkMode = body.classList.toggle('swip-theme'); // Toggle la classe 'light-theme'

    if (isDarkMode) {
        v.classList.remove('bi-brightness-high');
        v.classList.add('bi-moon-fill');
    } else {
        v.classList.remove('bi-moon-fill');
        v.classList.add('bi-brightness-high');
    }
}
