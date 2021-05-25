class SearchResults {

    static loader = document.getElementById("loader")

    constructor(element) {
        this.result = element
        this.baseURL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3"
    }

    async responseFromNasdaq() {
        let searchUL = document.createElement("ul")
        searchUL.setAttribute("id", "searchRes")
        this.result.appendChild(searchUL)
        searchUL.style.display = "none"
        loader.classList.remove("hide");
        const response = await fetch(`${this.baseURL}/search?query=AA&limit=10&exchange=NASDAQ `)
        let data = await response.json()
        for (let j = 0; j < data.length; j++) {
            searchUL.classList.add("hide")
            let liNew = document.createElement('li');
            let compLink = document.createElement('a');
            compLink.classList.add("complink");
            liNew.classList.add("complist")
            compLink.textContent = `${data[j].name} (${data[j].symbol}) `;
            compLink.setAttribute('href', `./company.html?symbol=${data[j].symbol} `);
            liNew.appendChild(compLink);
            searchUL.appendChild(liNew)

            this.addtoSearch(j, data[j].symbol)
            // adding image and percentages to search results
        }

    }

    async addtoSearch(liIndex, symbol) {
        let compList = document.getElementsByClassName("complink")
        const response1 = await fetch(`${this.baseURL}/company/profile/${symbol}`)
        let data1 = await response1.json()
        let changes1 = document.createElement("p") //price changes
        changes1.classList.add("changes");
        changes1.innerHTML += `$${data1.profile.changesPercentage}`
        compList[liIndex].appendChild(changes1)
        if (changes1.innerHTML.includes("-")) {
            changes1.style.color = "red"
        }
        else {
            changes1.style.color = "green"
        }
       
        let img = document.createElement('img')   //adding image
        img.style.content = `url('${data1.profile.image}')`
        compList[liIndex].prepend(img)

        document.getElementById("searchRes").classList.remove("hide")

    }
   
 }

