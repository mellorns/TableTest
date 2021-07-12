

const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById('myModal')
span.onclick = function () {
    modal.style.display = "none";
}
modal.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


let state = []
let sortDirection = false

function addUser() {
    let last = state.length - 1
    let user = {
        id: state[last] ? state[last].id + 1 : 1,
        name: null,
        username: null,
        email: null,
        website: null,
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: 0,
            geo: {
                lat: 0,
                lng: 0
            }
        },
        phone: 0,
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    }
    for (let input of document.querySelectorAll(`.user-input`)) {
        user[input.name] = input.value
        input.value = ''
    }
    state.push(user)
    appendElem(user, user.id - 1)
}

function sortColumn(columnName) {
    const dataType = typeof state[0][columnName]
    sortDirection = !sortDirection
    switch (dataType) {
        case 'string':
            sortStringColumn(sortDirection, columnName)
    }
    appendData()
}

function sortStringColumn(sort, columnName) {
    state = state.sort((a, b) => {
        if (sort) {
            return a[columnName] > b[columnName] ? 1 : -1
        } else {
            return a[columnName] < b[columnName] ? 1 : -1
        }
    })
}

window.onload = () => {
    getData()
}

//this function is attached the button  and will execute when user click on it
function getData() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            state = data
            return state
        })
        .then(appendData)
}

//this function appends the json data to the table 'gable'
const table = document.getElementById('tableData');

function openModal(e) {
    if (e.target.className !== "personal-name") return;
    const modal = document.getElementById('myModal')
    const index = Number(e.target.parentElement.dataset.userId)
    object = state[index]
    modalData.innerHTML = '<td>' + 'Street:' + object.address.street + ' ' +
        '<br/> ' + "Suite:" + '' + object.address.suite + ' ' +
        '<br/> ' + "City:" + '' + object.address.city + '</td>' +
        '<td>' + object.phone + '</td>' +
        '<td>' + "Geo:" + object.address.geo.lat + " " + object.address.geo.lng + '</td>' +
        '<td>' + object.address.zipcode + '</td>' +
        '<td>' + 'Company:' + object.company.name + '' +
        '<br/> ' + 'CatchPhrase:' + object.company.catchPhrase + '' +
        '<br/> ' + 'bs:' + object.company.bs + '</td>'
    modal.style.display = "block"
}

function deleteRow(e) {
    if (e.target.className !== "item-deleter") return;
    const index = Number(e.target.parentElement.dataset.userId)
    e.target.parentElement.remove()
    state = state.filter( user => user.id !== index + 1)
    // state.splice(index,1)
}

table.addEventListener('click', openModal)
table.addEventListener('click', deleteRow)

function appendElem(object, index) {
    const tr = document.createElement('tr');
    tr.dataset.userId = String(index)
    tr.innerHTML = '<td  class="personal-name">' + object.name + '</td>' +
        '<td>' + object.username + '</td>' +
        '<td>' + object.email + '</td>' +
        '<td>' + object.website + '</td>' +
        '<td class="item-deleter">X</td>'
    table.append(tr);
}

function appendData() {
    table.innerHTML = ''
    state.forEach(appendElem);
}