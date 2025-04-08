let bibleData = {};
let messages = [];

// 성경 데이터 로딩
fetch("full_bible.json")
  .then(response => response.json())
  .then(data => {
    bibleData = data;
  });

// 응원 메시지 데이터 로딩
fetch("messages.json")
  .then(response => response.json())
  .then(data => {
    messages = data;
  });

function showRandomChapter() {
  // 랜덤 책 선택
  const books = Object.keys(bibleData);
  const book = books[Math.floor(Math.random() * books.length)];

  // 랜덤 장 선택
  const chapters = Object.keys(bibleData[book]);
  const chapter = chapters[Math.floor(Math.random() * chapters.length)];

  const verses = bibleData[book][chapter];

  // 성경 구절 출력
  const outputDiv = document.getElementById("output");
  let html = `<h2>${book} ${chapter}장</h2>`;
  html += "<ul>";
  for (const verseNum of Object.keys(verses)) {
    html += `<li><strong>${verseNum}</strong>절: ${verses[verseNum]}</li>`;
  }
  html += "</ul>";
  outputDiv.innerHTML = html;

  // 응원 메시지 출력
  const encouragementDiv = document.getElementById("encouragement");
  if (messages.length > 0) {
    const message = messages[Math.floor(Math.random() * messages.length)];
    encouragementDiv.innerHTML = `<p class="encouragement">${message}</p>`;
  }

  // footer 보이게
  const footer = document.getElementById("footer");
  footer.classList.add("visible");
}
