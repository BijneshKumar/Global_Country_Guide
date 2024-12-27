const countriesContainer = document.getElementById('countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-continer input')

const themeChanger = document.querySelector('.theme-changer')
  
let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData = data
})



filterByRegion.addEventListener('change',(e)=>{
    if(e.target.value === 'All'){
        window.location.reload()
    }else{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
.then((res)=>res.json())
.then(renderCountries)
    }
})




function renderCountries (data){
    countriesContainer.innerHTML = ''

    data.forEach(country => {
        // console.log(country)
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href= `/country.html?name= ${country.name.common}`

countryCard.innerHTML = `
 <img src=${country.flags.svg} alt="${country.name.common} flag">
               <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population : </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region : </b>${country.region}</p>
                <p><b>Capital : </b>${country.capital}</p>
               </div>
               `
    

      countriesContainer.appendChild(countryCard)

    });
}


searchInput.addEventListener('input', (e)=>{
    const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(filteredCountries)
    renderCountries(filteredCountries)

})


themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }

    if(document.body.className === 'dark'){
                themeChanger.innerHTML = `<p><i class="fa-regular fa-sun"></i> light mode</p>`
            }else{
                themeChanger.innerHTML =  `<p><i class="fa-regular fa-moon"></i>  dark mode</p>`
        
            }
})

      // Load the mode from local storage on page load
      window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark');
        }
      });









































// let button = document.getElementById('mode-btn')

// button.addEventListener('click',()=>{
//     if(button.innerText=== 'dark mode'){
//         button.innerText = 'light mode'
//         document.body.style.backgroundColor = 'black'
//         document.body.style.color = 'white'
//     }else{
//         button.innerText='dark mode'
//         document.body.style.backgroundColor = 'white'
//         document.body.style.color = 'black'

//     }
// })



// const url = 'https://restcountries.com/v3.1/all'

// fetch(url)
// .then((res)=>res.json())
// .then((data)=>{
//     const countries_container = document.getElementById('countries-container')
    
//     data.map(user => {
//         const card = document.createElement('a')
//         card.classList.add('country-card')

//         const image = document.createElement('img')
//          image.src= user.flags.svg

//         const card_text = document.createElement('div')
//         card_text.classList.add('card-text')

//         const card_title = document.createElement('h3')
//         card_title.textContent =  user.name.common

//         card_text.appendChild(card_title)
//         card.appendChild(image)
//         card.appendChild(card_text)

//         countries_container.appendChild(card)
//     });
// })