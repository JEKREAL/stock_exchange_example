class SearchForm {

  constructor(element) {
    this.form = element;
  }


  createElements() {
    const inp = document.createElement("input"); //search inp
    inp.className = "form-control mr-sm-2"
    inp.type = "search"
    inp.placeholder = "Search"
    inp.setAttribute("id", "search")
    this.form.appendChild(inp)

    const btn = document.createElement("button"); //search btn
    btn.className = "btn btn-outline-success my-2 my-sm-0"
    btn.type = "submit"
    btn.textContent = "Search"
    btn.setAttribute("id", "searchB")
    this.form.appendChild(btn)

    const loader = document.createElement("span")
    loader.className = "spinner-border m-2 hide"
    loader.setAttribute("id", "loader")
    document.getElementById("results").appendChild(loader)
  }

  searchAlg() {
    const  compList = document.getElementsByClassName("complink"); // (li items)
    const  searchIn = document.getElementById("search").value;

    let filter = searchIn.toUpperCase();  // input text
    for (let i = 0; i < compList.length; i++) {
      let lItem = compList[i]
      let txtValue = lItem.textContent || lItem.innerText;
      if ((txtValue.toUpperCase().indexOf(filter) > -1)) {
        let mark = new Mark(lItem) // highlight input
        mark.unmark();
        mark.mark(
          filter,
          txtValue
        );

        lItem.style.display = "";
      } else {
        lItem.style.display = "none";
      }

    }
  }

  searchBar() {
    document.body.addEventListener("click", (e) => {
      e.stopPropagation()
      if (e.target != document.getElementById("searchB")) {
        document.getElementById("searchRes").style.display = "none"
      } //removing the list on click by blank space

    })

    let debounceTimeout;
    document.getElementById("search").addEventListener("keyup", () => {

      if (debounceTimeout) {
        clearTimeout(debounceTimeout) // delay on search key
      }
      debounceTimeout = setTimeout(() => {
        this.searchAlg();
      }, 1000);

      document.getElementById("searchRes").style.display = "" // making the list appear

      if (document.getElementById("search").value === "") {
        document.getElementById("searchRes").style.display = "none";
      } // if input is empty list disappear


    })
  }

  onlickEvent() {
    document.getElementById("searchB").addEventListener("click", function (e) {

      e.preventDefault()
      document.getElementById("searchRes").style.display = ""

    })
  }
}