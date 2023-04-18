// document.addEventListener("DOMContentLoaded", () => {
//   class Book {
//     constructor(name, author, category, year, price, imageUrl) {
//       this.name = name;
//       this.author = author;
//       this.category = category;
//       this.year = year;
//       this.price = price;
//       this.imageUrl = imageUrl;
//     }
//   }

//   // Initialize an empty array to hold the books
//   let bookList = [];

//   // Check if there are any books in local storage, and load them if there are
//   if (localStorage.getItem("bookList")) {
//     bookList = JSON.parse(localStorage.getItem("bookList"));
//     displayBookList(); // Display all the books that were added before
//   }

//   // Function to add a book to the list and local storage
//   function addBookToList(name, author, category, year, price, imageUrl) {
//     const book = new Book(name, author, category, year, price, imageUrl);
//     bookList.push(book);
//     localStorage.setItem("bookList", JSON.stringify(bookList));
//   }

//   // Retrieve the authors from local storage
//   let authors = localStorage.getItem("authors");
//   if (authors) {
//     authors = JSON.parse(authors);
//   } else {
//     authors = [];
//   }
//   // filter

//   function filterBooks() {
//     const tableBody = document.getElementById("tableBody");

//     // Check if the table body exists and has child elements (book rows)
//     if (!tableBody || tableBody.childElementCount === 0) {
//       return;
//     }

//     // Get the filter values
//     const authorFilter = document.getElementById("author-filter").value;
//     const categoryFilter = document.getElementById("category-filter").value;

//     // Loop through all the books in the table body
//     const books = tableBody.querySelectorAll("tr");
//     books.forEach((book) => {
//       // Get the author and category of the book
//       const bookAuthor = book.querySelector(".book-author").textContent;
//       const bookCategory = book.querySelector(".book-category").textContent;

//       // Hide or show the book based on the filters
//       if (
//         (authorFilter === "" || bookAuthor === authorFilter) &&
//         (categoryFilter === "" || bookCategory === categoryFilter)
//       ) {
//         book.style.display = "";
//       } else {
//         book.style.display = "none";
//       }
//     });
//   }
//   // Add event listeners to the filter elements
//   document
//     .getElementById("author-filter")
//     .addEventListener("change", filterBooks);
//   document
//     .getElementById("category-filter")
//     .addEventListener("change", filterBooks);

//   // Call the filterBooks() function when the page loads and when a new book is added
//   window.addEventListener("load", filterBooks);
//   document
//     .getElementById("add-book-form")
//     .addEventListener("submit", filterBooks);

//   // Function to display the book list
//   function displayBookList() {
//     const bookListContainer = document.getElementById("book-list");
//     bookListContainer.innerHTML = "";
//     for (let i = 0; i < bookList.length; i++) {
//       const book = bookList[i];
//       const listItem = document.createElement("li");
//       const bookImage = document.createElement("img");
//       bookImage.src = book.imageUrl;
//       const bookTitle = document.createElement("h3");
//       bookTitle.textContent = book.name;
//       const bookAuthor = document.createElement("p");
//       bookAuthor.textContent = `Author: ${book.author}`;
//       const bookCategory = document.createElement("p");
//       bookCategory.textContent = `Category: ${book.category}`;
//       const bookYear = document.createElement("p");
//       bookYear.textContent = `Year: ${book.year}`;
//       const bookPrice = document.createElement("p");
//       bookPrice.textContent = `Price: $${book.price}`;
//       const editButton = document.createElement("button");
//       editButton.textContent = "Edit";
//       editButton.addEventListener("click", () => editBook(i));
//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.addEventListener("click", () => deleteBook(i));
//       listItem.appendChild(bookImage);
//       listItem.appendChild(bookTitle);
//       listItem.appendChild(bookAuthor);
//       listItem.appendChild(bookCategory);
//       listItem.appendChild(bookYear);
//       listItem.appendChild(bookPrice);
//       listItem.appendChild(editButton);
//       listItem.appendChild(deleteButton);
//       bookListContainer.appendChild(listItem);
//     }
//   }

//   // Function to edit a book
//   function editBook(index) {
//     // Display the book details in the form
//     const book = bookList[index];
//     document.getElementById("book-name").value = book.name;
//     document.getElementById("book-author").value = book.author;
//     document.getElementById("book-category").value = book.category;
//     document.getElementById("book-year").value = book.year;
//     document.getElementById("book-price").value = book.price;
//     document.getElementById("book-image").value = book.imageUrl;
//     // Remove the book from the list
//     bookList.splice(index, 1);
//     localStorage.setItem("bookList", JSON.stringify(bookList));

//     // Change the form submit button to an update button
//     const addBookForm = document.querySelector("#add-book-form");
//     const saveBtn = document.querySelector("#save-btn");
//     const updateBtn = document.createElement("button");
//     updateBtn.textContent = "Update";
//     updateBtn.id = "update-btn";
//     addBookForm.replaceChild(updateBtn, saveBtn);

//     // Add event listener to the update button
//     updateBtn.addEventListener("click", (event) => {
//       event.preventDefault();
//       const name = document.getElementById("book-name").value;
//       const author = document.getElementById("book-author").value;
//       const category = document.getElementById("book-category").value;
//       const year = document.getElementById("book-year").value;
//       const price = document.getElementById("book-price").value;
//       const imageUrl = document.getElementById("book-image").value;
//       const book = { name, author, category, year, price, imageUrl };
//       addBookToList(name, author, category, year, price, imageUrl);
//       displayBookList();
//       document.getElementById("book-name").value = "";
//       document.getElementById("book-author").value = "";
//       document.getElementById("book-category").value = "";
//       document.getElementById("book-year").value = "";
//       document.getElementById("book-price").value = "";
//       document.getElementById("book-image").value = "";
//       addBookForm.replaceChild(saveBtn, updateBtn);
//     });
//   }
// });

// kitas kodas

document.addEventListener("DOMContentLoaded", () => {
  const searchField = document.getElementById("search-field");
  const authorFilter = document.getElementById("author-filter");
  const categoryFilter = document.getElementById("category-filter");
  const priceSort = document.getElementById("price-sort");
  const tableBody = document.getElementById("tableBody");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");
  const saveBtn = document.getElementById("save-btn");

  let books = JSON.parse(localStorage.getItem("books")) || [];
  let currentBookIndex = -1;

  function renderBooks() {
    tableBody.innerHTML = "";

    books.forEach((book, index) => {
      const tr = document.createElement("tr");

      Object.keys(book).forEach((key) => {
        if (key !== "id") {
          const td = document.createElement("td");

          if (key === "image") {
            const img = document.createElement("img");
            img.src = book[key];
            img.style.maxWidth = "100px";
            img.style.maxHeight = "100px";
            td.appendChild(img);
          } else {
            td.textContent = book[key];
          }

          tr.appendChild(td);
        }
      });

      const editTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editBook(index));
      editTd.appendChild(editBtn);
      tr.appendChild(editTd);

      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteBook(index));
      deleteTd.appendChild(deleteBtn);
      tr.appendChild(deleteTd);

      tableBody.appendChild(tr);
    });
  }

  function saveBook() {
    const book = {
      id: Date.now(),
      title: document.getElementById("book-name").value,
      author: document.getElementById("book-author").value,
      category: document.getElementById("book-category").value,
      year: document.getElementById("book-year").value,
      price: document.getElementById("book-price").value,
      image: document.getElementById("book-image").value,
    };

    if (currentBookIndex === -1) {
      books.push(book);
    } else {
      books[currentBookIndex] = book;
      currentBookIndex = -1;
    }

    localStorage.setItem("books", JSON.stringify(books));
    modal.style.display = "none";
    renderBooks();
  }

  function editBook(index) {
    currentBookIndex = index;
    const book = books[index];

    document.getElementById("book-name").value = book.title;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-category").value = book.category;
    document.getElementById("book-year").value = book.year;
    document.getElementById("book-price").value = book.price;
    document.getElementById("book-image").value = book.image;

    modal.style.display = "block";
  }

  function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }

  function filterBooks() {
    const search = searchField.value.toLowerCase();
    const author = authorFilter.value;
    const category = categoryFilter.value;

    return books.filter(
      (book) =>
        (book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search)) &&
        (author === "" || book.author === author) &&
        (category === "" || book.category === category)
    );
  }

  function sortBooks(sortedBooks) {
    const sortType = priceSort.value;

    if (sortType === "low-to-high") {
      return sortedBooks.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else {
      return sortedBooks.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }
  }

  function updateBooks() {
    let filteredBooks = filterBooks();
    let sortedBooks = sortBooks(filteredBooks);
    books = sortedBooks;
    renderBooks();
  }

  searchField.addEventListener("input", updateBooks);
  authorFilter.addEventListener("change", updateBooks);
  categoryFilter.addEventListener("change", updateBooks);
  priceSort.addEventListener("change", updateBooks);

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    currentBookIndex = -1;
  });

  saveBtn.addEventListener("click", saveBook);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      currentBookIndex = -1;
    }
  });

  renderBooks();
});
