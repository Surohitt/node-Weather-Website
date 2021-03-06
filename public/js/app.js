const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{ //executes when form is submitted
    e.preventDefault()
    const location = search.value //storing input in a variable

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // for local
    //     fetch('http://localhost:3000/weather?address='+location).then((response) => { 
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=> {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})