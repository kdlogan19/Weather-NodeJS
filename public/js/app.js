// import { response } from "express"

console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pMessage1 = document.querySelector('#message-1')
const pMessage2 = document.querySelector('#message-2')
console.log(weatherForm);

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    console.log(address)
    const weatherUrl = '/weather?address=' + address
    pMessage1.textContent = 'Loading..'
    pMessage2.textContent = ''
    fetch(weatherUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                pMessage1.textContent = ''
                pMessage2.textContent = JSON.stringify(data.error)
                
            } else {
                                
                pMessage1.textContent = 'Weather at the '+ data.location + ' has ' + data.sky 
                + ' and current temprature is ' + data.temp + ' with humidity ' + data.humidity + '%'
            }
    })
})
    
})