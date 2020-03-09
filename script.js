const app = document.getElementById("app");
const table_body = document.getElementById("table-body");
const add_book = document.getElementById("add_book");
const form = document.getElementById("form");
const hide = document.querySelector(".fa-times");
const submit = document.getElementById("submit");
let read;
let remove;

add_book.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

submit.addEventListener("click", e => {
  e.preventDefault();
  if (
    document.getElementById("title").value == "" ||
    document.getElementById("author").value == "" ||
    document.getElementById("pages").value == ""
  ) {
    alert("fill form");
    return;
  } else {
    let newBook = new Book(
      document.getElementById("title").value,
      document.getElementById("author").value,
      document.getElementById("pages").value,
      document.getElementById("read").checked
    );
    localStorage.setItem(localStorage.length, JSON.stringify(newBook));
    table_body.innerHTML = null;
    render(table_body);
    form.style.display = "none";
  }
});

function render(node) {
  for (i in localStorage) {
    if (localStorage.length > 0 && localStorage.getItem(i) !== null) {
      node.innerHTML += `
    <tr>
      <td>${JSON.parse(localStorage.getItem(i)).title}</td>
      <td>${JSON.parse(localStorage.getItem(i)).author}</td>
      <td>${JSON.parse(localStorage.getItem(i)).pages}</td>
      <td><button class="read" value=${i} style="background: ${
        JSON.parse(localStorage.getItem(i)).read ? "green" : "yellow"
      }">${
        JSON.parse(localStorage.getItem(i)).read ? "Yes" : "No"
      }</button></td>
      <td><button value=${i} class="remove">X</button></td>
    </tr>
      `;
    }
    read = document.querySelectorAll(".read");
    remove = document.querySelectorAll(".remove");
  }
  remove.forEach(el => {
    el.addEventListener("click", () => {
      localStorage.removeItem(el.value);
      location.reload();
    });
  });
  read.forEach(el => {
    el.style.width = "40px";
    el.style.outline = "none";
    el.style.border = "1.5px solid black";
    el.style.borderRadius = "3.5px";

    el.addEventListener("click", () => {
      let parse = JSON.parse(localStorage.getItem(el.value));
      parse.read = !parse.read;
      localStorage.setItem(el.value, JSON.stringify(parse));
      JSON.parse(localStorage.getItem(el.value)).read
        ? (el.innerText = "Yes")
        : (el.innerText = "No");
      JSON.parse(localStorage.getItem(el.value)).read
        ? (el.style.background = "green")
        : (el.style.background = "yellow");
    });
  });
}

function addBookToLibrary() {
  form.style.display = "flex";
  hide.addEventListener("click", () => {
    form.style.display = "none";
  });
}

window.onload = () => {
  render(table_body);
};
