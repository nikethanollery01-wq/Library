const addBook = document.querySelector('.add-book')
const enrollDialog = document.getElementById('enroll-dialog')
const bookForm = document.querySelector('#book-form')
const templateContainer = document.querySelector('.recommended-template')
const rightSidebar = document.querySelector('.right-sidebar')
const sidebarTemplate = document.querySelector('.template-sidebar')


const myLibrary = [
]

function Book(author, title,id,pages,imgUrl, read ) {
    this.author = author
    this.title = title
    this.id = id
    this.pages = pages
    this.imgUrl = imgUrl
    this.read = read
}

myLibrary.push(
    new Book(
        "Suzanne Collins", 
        "The Hunger Games", 
        crypto.randomUUID(), 
        374, 
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg", 
        true
    ),
    new Book(
        "Jane Austen & Anna Quindlen", 
        "Pride and Prejudice", 
        crypto.randomUUID(), 
        279, 
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg", 
        false
    ),
    new Book(
        "Harper Lee", 
        "To Kill a Mockingbird", 
        crypto.randomUUID(), 
        323, 
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg", 
        true
    ),
    new Book(
        "Markus Zusak", 
        "The Book Thief", 
        crypto.randomUUID(), 
        592, 
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg", 
        false
    ),
    new Book(
        "Stephenie Meyer", 
        "Twilight", 
        crypto.randomUUID(), 
        498, 
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1700522826i/41865.jpg", 
        false
    )
)

function addBookToLibrary(author,title,pages,read,imgUrl) {
    myLibrary.push(new Book(author,title, crypto.randomUUID(), pages,imgUrl, read))
}

addBook.addEventListener('click', function(){
    enrollDialog.showModal()
})

bookForm.addEventListener('submit', function(event){
    event.preventDefault()
    const author = document.querySelector('#author').value
    const title = document.querySelector('#title').value
    const pages = Number(document.querySelector('#pages').value)
    const read = document.querySelector('#read').checked
    const imgUrl = document.querySelector('#imgUrl').value
    if(pages > 1000) {
        alert("Page count cannot exceed 1000")
        return
    }
    addBookToLibrary(author,title,pages,read,imgUrl)
    bookForm.reset()
    enrollDialog.close()
    templateContainer.textContent = ""
    render()
})


function render(){
    const bookTemplate = document.querySelector(`.template`)
    for(let book of myLibrary ){
        const clone = bookTemplate.content.cloneNode(true)
        clone.querySelector('.book').setAttribute('id',book.id)
        clone.querySelector(".img").setAttribute("src",book.imgUrl)
        clone.querySelector(".title").textContent = book.title
        clone.querySelector('.author').textContent = book.author
        if(book.read)
            clone.querySelector('.read').textContent = "Completed"
        else
            clone.querySelector('.read').textContent = "Read ?"
        templateContainer.appendChild(clone)
    }
}
render()


templateContainer.addEventListener('click', (event) => {
    if(!event.target.closest('.book')) return
    else {
        const target = event.target.closest('.book').getAttribute('id')
        const targetArrayElement = myLibrary.reduce((acc,element) => {
                if(target === element.id){
                    acc = element
                }
                return acc
        },{})
            rightSidebar.textContent = ""
            const clone = sidebarTemplate.content.cloneNode(true)
            clone.querySelector('.sidebar-img').setAttribute("src", targetArrayElement.imgUrl)
            clone.querySelector('.sidebar-title').textContent = targetArrayElement.title
            clone.querySelector('.sidebar-author').textContent = targetArrayElement.author
            clone.querySelector('.sidebar-pages').textContent = targetArrayElement.pages    
            rightSidebar.appendChild(clone)
    }
})

templateContainer.addEventListener('click', (event) => {
    const target = event.target
    const targetId = target.closest('.book').getAttribute('id')
    if(target.classList.contains('remove')){
        const removeArrayIndex = myLibrary.findIndex((item) => item.id === targetId)
        myLibrary.splice(removeArrayIndex,1)
        templateContainer.textContent = ""
        render()
    }
})


templateContainer.addEventListener('click', (event) => {
    const target = event.target
    const targetId = target.closest('.book').getAttribute('id')
    if(target.classList.contains('read')){
        const index = myLibrary.findIndex((item) => item.id === targetId)
        if(!myLibrary[index].read){
            myLibrary[index].read = true
            target.textContent = "Completed"
        }
    }
}) 


