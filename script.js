document.addEventListener("DOMContentLoaded", () => {
  const searchField = document.getElementById("search-field");
  const authorFilter = document.getElementById("author-filter");
  const categoryFilter = document.getElementById("category-filter");
  const priceSort = document.getElementById("price-sort");
  const tableBody = document.getElementById("tableBody");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");
  const saveBtn = document.getElementById("save-btn");

  // Local storage data and book index

  let books = JSON.parse(localStorage.getItem("books")) || [];
  let currentBookIndex = -1;

  // Render the books list

  function renderBooks(books) {
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

  // Save a new book or update an existing one

  // function saveBook() {
  //   const book = {
  //     id: Date.now(),
  //     title: document.getElementById("book-name").value,
  //     author: document.getElementById("book-author").value,
  //     category: document.getElementById("book-category").value,
  //     year: document.getElementById("book-year").value,
  //     price: document.getElementById("book-price").value,
  //     image: document.getElementById("book-image").value,
  //   };

  //   if (currentBookIndex === -1) {
  //     books.push(book);
  //   } else {
  //     books[currentBookIndex] = book;
  //     currentBookIndex = -1;
  //   }

  //   localStorage.setItem("books", JSON.stringify(books));
  //   modal.style.display = "none";
  //   updateBooks(); // Call updateBooks() instead of renderBooks()
  // }
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
    // modal.style.display = "none"; // Remove or comment out this line
    updateBooks();
  }

  // Open the modal to edit a book

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

  // Delete a book

  function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    updateBooks(); // Call updateBooks() instead of renderBooks()
  }

  function filterBooks() {
    const search = searchField.value.toLowerCase();
    const author = authorFilter.value.toLowerCase(); // change this line to get the value from input
    const category = categoryFilter.value;

    return books.filter(
      (book) =>
        (book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search) ||
          book.category.toLowerCase().includes(search)) &&
        (author === "" || book.author.toLowerCase().includes(author)) && // change this line to compare the input value with the book author
        (category === "" || book.category === category)
    );
  }

  // Sort the books based on price

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

  // Update the books list after filtering and sorting

  function updateBooks() {
    let filteredBooks = filterBooks();
    let sortedBooks = sortBooks(filteredBooks);
    renderBooks(sortedBooks); // render the filtered and sorted books
  }

  // Event listeners

  searchField.addEventListener("input", updateBooks);
  authorFilter.addEventListener("change", updateBooks);
  categoryFilter.addEventListener("change", updateBooks);
  priceSort.addEventListener("change", updateBooks);

  // closeModal.addEventListener("click", () => {
  //   modal.style.display = "none";
  //   currentBookIndex = -1;
  // });

  saveBtn.addEventListener("click", saveBook);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      currentBookIndex = -1;
    }
  });

  // Initial rendering of the books list

  // renderBooks();
  renderBooks(books);
});
