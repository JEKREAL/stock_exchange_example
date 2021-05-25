
class Marquee {

  constructor(element) {
    this.marquee = element;
    this.url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse"
  }

  async addtoMarq1() {
    const response1 = await fetch(this.url)
    let data1 = await response1.json()
    let stock = document.createElement("div")
    this.marquee.appendChild(stock)
    for (let i = 0; i < 500; i++) {
      let iPrice = document.createElement("i")
      iPrice.classList.add("price");
      iPrice.innerText += `$${data1[i].price}` + '\xa0\xa0'
      stock.appendChild(iPrice)

      stock.innerHTML += data1[i].symbol + " "
      loader.classList.add("hide");
    }

  }
}
