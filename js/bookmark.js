var nameinput = document.getElementById("nameinput")
var urlinput = document.getElementById("urlinput")
var allwebsites = []
if (localStorage.getItem('websites') !== null) {
    allwebsites = JSON.parse(localStorage.getItem('websites'))
    displaywebsite()
}
var searchinput = document.getElementById('searchinput')
var searchbtn = document.getElementById('searchbtn')
var addbtn = document.getElementById('addbtn')
var updatebtn = document.getElementById('updatebtn')
var updatedindex;

addbtn.addEventListener('click', function () {
    if (validation() == true && nameinput.value != "") {
        var website = {
            webname: nameinput.value,
            weburl: urlinput.value

        }
        allwebsites.push(website)
        localStorage.setItem('websites', JSON.stringify(allwebsites))
        // document.getElementById('coll').innerHTML = website
        clearinputs()

        displaywebsite()
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: `${nameinput.value} "please enter the webname
            please enter a valid url"`,
        });
    }

})

function clearinputs() {
    nameinput.value = null
    urlinput.value = null
    nameinput.classList.remove('is-invalid', 'is-valid')
    urlinput.classList.remove('is-invalid', 'is-valid')

}


// var tableIndex = document.createElement("h2")
// tableIndex.innerText = "Mazen"
// document.getElementById("myrow").appendChild(tableIndex)




function displaywebsite() {
    var box = ''
    for (let i = 0; i < allwebsites.length; i++) {


        box += `<div class="col-md-2">
   <h2>${i + 1}</h2>
   
   </div>
   <div class="col-md-4">
   <h2>${allwebsites[i].webname}</h2>

   </div>
   <div class="col-md-2">
   
   <a href="${allwebsites[i].weburl}" target="_blank">
   <button class="btn btn-primary">visit</button>
   
   </a>   
   
   </div>
        <div class="col-md-2">
        <button class="btn btn-primary"onclick="getvalues(${i})">update</button>

        </div>
        <div class="col-md-2">
        <button class="btn btn-danger" onclick='deleteweb(${i})'>Delete</button>

        </div>`

    }
    document.getElementById("myrow").innerHTML = box


}
function deleteweb(index) {
    allwebsites.splice(index, 1)
    displaywebsite()
    localStorage.setItem('websites', JSON.stringify(allwebsites))

}

var visitID = 0
function searchwebsite() {
    var box = ''
    var term = searchinput.value
    for (let i = 0; i < allwebsites.length; i++) {
        if (allwebsites[i].webname.toLowerCase().includes(term.toLowerCase())) {

            box += `<div class="col-md-2">
            <h2>${i + 1}</h2>
            
         
            </div>


            <div class="col-md-4">

            <h2>${allwebsites[i].webname.replace(term, `<span class="bg-info">${term}</span>`)}</h2>
            
            </div>


            <div class="col-md-2">
            <button class="btn btn-primary" id="${i}">
            <a href="${allwebsites[i].weburl}" target="_blank"></a>  visit </button>
            </div>
            <div class="col-md-2">
            <button class="btn btn-primary"onclick="getvalues(${i})">update</button>
    
            </div>
            <div class="col-md-2">
            <button class="btn btn-danger" onclick='deleteweb(${i})'>Delete</button>
    
            </div>`
            document.getElementById("myrow").innerHTML = box
        }
    }
}
function getvalues(q) {
    updatedindex = q
    nameinput.value = allwebsites[q].webname
    urlinput.value = allwebsites[q].weburl
    addbtn.classList.add('d-none')
    updatebtn.classList.remove('d-none')

}



function updateweb(updatedindex) {
    allwebsites[updatedindex].webname = nameinput.value
    allwebsites[updatedindex].weburl = urlinput.value
    displaywebsite()
    localStorage.setItem('websites', JSON.stringify(allwebsites))
    clearinputs()
}
/* function Validate() {
    var regexinput = /^$/
    var webname = nameinput.value
    regexinput.test(webname)
    if (regexinput.test(webname) == true) {
        console.log('match');
    }
    else {
        console.log('not match');
    }
} */
function validation() {
    var pattern = /^((ftp|http|https):\/\/)?(www.)?[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/
    // nameinput: /^[A-Z][a-z]{4}$/,


    return pattern.test(urlinput.value)

}

/*  if (regex[elem.id].test(elem.value) == true) {
     elem.classList.remove('is-invalid')
     elem.classList.add('is-valid')
     elem.nextElementSibling.classList.replace('d-block', 'd-none')

     console.log('match');
 }
 else {
     console.log('not match');
     elem.classList.remove('is-valid')
     elem.classList.add('is-invalid')
     elem.nextElementSibling.classList.replace('d-none', 'd-block')

 } */





// const visitButton = document.getElementById("visit")
// visitButton.addEventListener("click", () => {
//     console.log(visitButton.innerHTML)
// })