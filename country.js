
let countryName = new URLSearchParams(location.search).get('name').trim()


const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border-countries')

const backButton = document.querySelector('.back-button')
backButton.addEventListener('click' , ()=> history.back())


// const bordercountries = document.querySelectorAll('.border-countries a')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then(res => res.json())
.then(([country]) => {
    //   console.log(country)
      flagImage.src = country.flags.svg

      countryNameH1.innerText = country.name.common

      if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common

      }else{
        nativeName.innerText = country.name.common
      }

      population.innerText = country.population.toLocaleString('en-IN')
      region.innerText = country.region

      if(country.subregion){
        subRegion.innerText = country.subregion
      }else{
        subRegion.innerText = 'Not Available'
      }

      if(country.capital){
        capital.innerText = country.capital
      }else{
        capital.innerText = 'Not Available'
      }

      topLevelDomain.innerText = country.tld.join(', ')

      if(country.currencies){
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
      }else{
        currencies.innerText = 'Not Available'
      }

      if(country.languages){
        language.innerText = Object.values(country.languages).join(', ')
      }else{
        language.innerText = 'Not Available'
      }

      if(country.borders){
           country.borders.forEach(border => {
            // console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(res => res.json())
            .then(([borderCountry]) => {
                // console.log(borderCountry.name.common)
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `/country.html?name= ${borderCountry.name.common}`

                borderCountries.appendChild(borderCountryTag)
            })
        });
      }

 
})

const themeChanger = document.querySelector('.theme-changer')
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




  //Another method for show details     
// fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
// .then(res => res.json())
// .then(([country])=>{
//     console.log(country)
//     const mainContainer = document.getElementById('main-container')
//     const countryDetails = document.createElement('div')
//     countryDetails.classList.add('country-details')
   
//     countryDetails.innerHTML = `
//    <img src=${country.flags.svg} alt="flag">
//             <div class="details-text-container">
//                 <h1>${country.name.common}</h1>
//                 <div class="details-text">
//                     <p><b>Native name :</b>${ country.name.nativeName ?Object.values(country.name.nativeName)[0].common : country.name.common }</p>
//                     <p><b>Population :</b>49854909</p>
//                     <p><b>Region :</b>iceland</p>
//                     <p><b>Sub Region :</b>iceland</p>
//                     <p><b>Capital :</b>Delhi</p>
//                     <p><b>Top level domain :</b>be</p>
//                     <p><b>Currencies :</b>Euro</p>
//                     <p><b>Language :</b>Dutch,French</p>
//                 </div>
//                 <div class="border-countries">
//                     <p><b>Border Countries : </b> &nbsp;<a href="#">France</a> <a href="#">Germany</a></p>
//                 </div>
//             </div>
//     `

//     mainContainer.appendChild(countryDetails)
// })
// .catch((error)=>{
//     console.log('fetch error :', error)
// })
