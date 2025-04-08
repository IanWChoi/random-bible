let bibleData = {};

fetch("full_bible.json")
  .then(response => response.json())
  .then(data => {
    bibleData = data;
  });

function showRandomChapter() {
  const books = Object.keys(bibleData);
  const book = books[Math.floor(Math.random() * books.length)];

  const chapters = Object.keys(bibleData[book]);
  const chapter = chapters[Math.floor(Math.random() * chapters.length)];

  const verses = bibleData[book][chapter];
  const outputDiv = document.getElementById("output");

  let html = `<h2>${book} ${chapter}장</h2>`;
  html += "<ul>";
  for (const verseNum of Object.keys(verses)) {
    html += `<li><strong>${verseNum}</strong>절: ${verses[verseNum]}</li>`;
  }
  html += "</ul>";

  outputDiv.innerHTML = html;

  // footer 보이게 만들기
  const footer = document.getElementById("footer");
  footer.classList.add("visible");
}
