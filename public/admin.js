let family;
function addSons(sons) {
    var parent = document.createElement("div")
    parent.classList = "parent";
    sons.forEach((x, indexOfPerson) => {
        var person = document.createElement("div")
        person.classList = `person father ${x.stat == 2 ? "die" : ""}`;
        person.innerHTML = `<span class = "text">${x["name"]}</span>`;
        person.addEventListener("click", (e) => {
            // console.log()
            if (e.target.classList.contains("person") || e.target.classList.contains("text")) {
                e.currentTarget.parentElement.querySelectorAll(".person").forEach(x => {
                    x.classList.remove("selected")
                })
                e.currentTarget.classList.add("selected")
                while (e.currentTarget.parentElement.nextSibling != null) {
                    e.currentTarget.parentElement.nextSibling.remove()
                }
                addSons(x["root"])
            }
        })
        var qlo = document.createElement("div")
        var cha = document.createElement("div")
        qlo.className = "qlo";
        qlo.innerText = "x";
        qlo.addEventListener('click', e => {
            while (parent.nextSibling != null) {
                parent.nextSibling.remove()
            }
            parent.remove()
            sons.splice(indexOfPerson, 1)
            addSons(sons)
            document.querySelector("#sa").innerHTML = "الحفظ"
            document.querySelector("#sa").className = ""
        })
        cha.className = "change";
        cha.innerText = "i";
        cha.addEventListener('click', e => {
            let form = document.createElement("div");
            form.className = "form";
            form.innerHTML = `<div>
            <label for="">الاسم:</label>
            <input type="text">
        </div>
        <div></div>
            <label for="">الحالة:</label>
            <select>
                <option value="1">حي</option>
                <option value="2">متوفى</option>
            </select>
        </div>
        <div>
            <button id="done">اضافة</button>
            <button id="cansel">الغاء</button>
        </div>`;
            form.querySelector("input[type='text']").value = x.name;
            form.querySelector("select").value = x.stat;
            form.querySelector("#cansel").addEventListener('click', () => {
                form.remove()
            })
            form.querySelector("#done").addEventListener('click', () => {
                let name = form.querySelector("input").value;
                let stat = form.querySelector("select").value;
                x.name = name
                x.stat = stat
                person.classList = `person father ${stat == 2 ? "die" : ""}`;
                person.querySelector("span").innerText = name;
                document.querySelector("#sa").innerHTML = "الحفظ"
                document.querySelector("#sa").className = ""
                form.remove()
            })

            parent.appendChild(form)

        })
        person.appendChild(qlo)
        person.appendChild(cha)
        parent.appendChild(person)

    })

    let toAdd = document.createElement("div");
    toAdd.className = "person toAdd"
    toAdd.innerText = "+"
    toAdd.addEventListener('click', e => {
        while (parent.nextSibling != null) {
            parent.nextSibling.remove()
        }
        let form = document.createElement("div");
        form.className = "form";
        form.innerHTML = `<div>
        <label for="">الاسم:</label>
        <input type="text">
    </div>
    <div></div>
        <label for="">الحالة:</label>
        <select>
            <option value="1">حي</option>
            <option value="2">متوفى</option>
        </select>
    </div>
    <div>
        <button id="done">اضافة</button>
        <button id="cansel">الغاء</button>
    </div>`;
        form.querySelector("#cansel").addEventListener('click', () => {
            form.remove()
        })
        form.querySelector("#done").addEventListener('click', () => {
            let name = form.querySelector("input").value;
            let stat = form.querySelector("select").value;
            if (name) {
                document.querySelector("#sa").innerHTML = "الحفظ"
                document.querySelector("#sa").className = ""
                // console.log(name, stat)
                form.remove()
                sons.push({ name: name, stat: stat, root: [] })
                parent.remove()
                addSons(sons)
                // console.log(JSON.stringify(family))
            }

        })

        parent.appendChild(form)
    })
    parent.appendChild(toAdd)
    // let colorOfParent = [...document.querySelectorAll(".parent")].length % 2 == 0 ? "#aba5a5" : "#e2ded1";
    // parent.style.backgroundColor = colorOfParent;
    document.querySelector("body").appendChild(parent);
    // this.scrollTo(0, document.body.scrollHeight)
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
        // family = JSON.parse(x);
        family = x;
        console.log(x)
        addSons(family["root"])
    }
})

document.querySelector("#sa").addEventListener('click', e => {
    e.target.innerHTML = "<div></div>"
    $.ajax({
        method: "post",
        url: "save",
        data: { data: JSON.stringify(family) },
        error: function () {
            console.log("done")
        },
        success: function () {
            document.querySelector("#sa").innerHTML = "تم الحفظ"
            document.querySelector("#sa").className = "dis"
        }
    })
})