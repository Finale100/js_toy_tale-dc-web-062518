document.addEventListener('DOMContentLoaded', init)
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitToy = document.getElementById('toy-submit')
let addToy = false

// YOUR CODE HERE
function init() {
  addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
getFetch()
submitToy.addEventListener('click', clickHandler)
}


function getFetch() {
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(json => {
    for( let toy in json){
      render(json[toy])
    }
  })
}

function clickHandler(event) {
  event.preventDefault()
  let name = document.getElementById('toy-name').value
  let image = document.getElementById('toy-img').value
  let likes = 0
  postFetch(name, image, likes)
}

function postFetch(name, image, likes) {
  fetch(`http://localhost:3000/toys`, {
    method: "Post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      image: image,
      likes: likes,
    })
  }).then(response => response.json())
  .then(json => render(json))
}

function render(toy) {
  let allToys = document.getElementById('toy-collection')
  let divToy = document.createElement('div')
  let eachToy = document.createElement('h2')
  let toyImg = document.createElement('img')
  let toyLikes = document.createElement('p')
  let likeButton = document.createElement('button')

  allToys.appendChild(divToy)
  divToy.appendChild(eachToy)
  divToy.appendChild(toyImg)
  divToy.appendChild(toyLikes)
  divToy.appendChild(likeButton)

  divToy.className ="card"
  toyImg.className ="toy-avatar"
  likeButton.className ="like-btn"
  divToy.id = `toy-${toy.id}`
  toyLikes.id = `like-${toy.id}`

  eachToy.innerText = toy.name
  toyImg.src = toy.image
  toyLikes.innerText = toy.likes
  likeButton.innerText = "Like ✊"
  likeButton.addEventListener('click', like)
}

function like(event) {
  event.preventDefault()
  let toyInfo = event.target.parentNode
  let id = toyInfo.id.split('-')[1]
  let likes = toyInfo.querySelector('p').innerText
  let name = toyInfo.querySelector('h2').innerText
  let img = toyInfo.querySelector('img').src
  patchFetch(id, name, img, likes)
}

function patchFetch(id, name, img, likes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      image: img,
      likes: ++likes
    })
  }).then(response => response.json())
  .then(json => {
    let numLike = document.getElementById(`like-${id}`)
    numLike.innerText = json.likes
  })
}
