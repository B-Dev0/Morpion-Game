import { swipTheme } from "./theme.js"

const show = document.querySelector('.show')
const barry = document.querySelector('.barry')
show.addEventListener('click', () => {
    barry.style.display = 'flex'
})
const hidde = document.querySelector('.bi-x-lg')
hidde.addEventListener('click', () => {
    barry.style.display = 'none'
})

const theme = document.querySelector('.theme i')
theme.addEventListener('click', () => {
    swipTheme(theme)
})