const urlParams = new URLSearchParams(window.location.search);
const baseURL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3"
let cSymb = urlParams.get('symbol')

fetch(`${baseURL}/company/profile/${cSymb}`)
  .then((response) => {
    response.json()
      .then((data) => {
        const compLink = document.getElementById("compLink")
        const compImage = document.getElementById("compImage")
        const compDesc = document.getElementById("compDesc")
        const stockPrice = document.getElementById("stockPrice")
        const changesEl = document.getElementById("changes")
        const changes = data.profile.changesPercentage

        if (changes.includes("-")) {
          changesEl.style.color = "red"
        }
        else {
          changesEl.style.color = "green"
        }

        changesEl.innerText = `${changes}`
        stockPrice.innerText = `Stock price: $${data.profile.price} `
        compLink.textContent = data.profile.companyName
        if (data.profile.website) compLink.setAttribute('href', `${data.profile.website}`) 
        else {
          compDesc.textContent = "No website adress from API."
        }
        compImage.setAttribute('src', `${data.profile.image}`)

        if (data.profile.description) compDesc.innerHTML = data.profile.description + ` (${"Webpage".link(data.profile.website)})` 
        else {
          compDesc.textContent += "No description from API"
        }
      })
  })

fetch(`${baseURL}/historical-price-full/${cSymb}?serietype=line)`)
  .then((response) => {
    response.json()
      .then((data) => {
        const ctx = document.getElementById('myChart');
        let dates = [];
        let closes = [];

        for (let j = 0; j < data.historical.length; j++) {
          dates.push(data.historical[j].date)
          closes.push(data.historical[j].close)
        }

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates.reverse(),
            datasets: [{
              data: closes,
              label: "Stock price history",
              fill: true,
              backgroundColor: "violet",
              showLine: true,
            },

            ]
          },
          options: {
            title: {
              display: true
            }
          },
        })
        document.querySelector(".spinner-border.m-2").setAttribute("id", "hide-loader");
      })
  })