let family;
function addSons(sons) {
    var parent = document.createElement("div")
    parent.classList = "parent";
    sons.forEach(x => {

        var person = document.createElement("div")
        person.classList = `person ${x.stat == 2 ? "die" : ""}`;
        person.innerText = x["name"];
        console.log(x["root"].length,"---",x.stat)
        if (x["root"].length) {
            person.classList += " father"
            person.addEventListener("click", (e) => {
                e.target.parentElement.querySelectorAll(".person").forEach(x => {
                    x.classList.remove("selected")
                })
                e.target.classList.add("selected")
                while (e.target.parentElement.nextSibling != null) {
                    e.target.parentElement.nextSibling.remove()
                }
                addSons(x["root"])
            })
        }
        parent.appendChild(person)
    })
    document.querySelector("body").appendChild(parent);
    this.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

$.ajax({
    method: "get",
    url: "load",
    error: function () {
      console.log("done")
    },
    success: function (x) {
        // console.log(x)
        // console.log(JSON.parse(x))
    family = x;
    // family = JSON.parse(x);
    addSons(family["root"]);
}
})
