let bibleData = {};
let messages = [];
let currentBook = null;
let currentChapter = null;

const emojiList = ["📖", "🕊️", "🌿", "☁️", "✨", "🙏", "🌼", "🌙", "💡", "🌤️"];

// 데이터 로딩
fetch('assets/data/full_bible.json')
  .then(response => response.json())
  .then(data => {
    bibleData = data;
  });

fetch('assets/data/messages.json')
  .then(response => response.json())
  .then(data => {
    messages = data;
  });

function showRandomChapter() {
  const books = Object.keys(bibleData);
  const book = books[Math.floor(Math.random() * books.length)];
  const chapters = Object.keys(bibleData[book]);
  const chapter = chapters[Math.floor(Math.random() * chapters.length)];

  showChapter(book, chapter);
}

function showChapter(book, chapter) {
  currentBook = book;
  currentChapter = chapter;

  const verses = bibleData[book][chapter];

  const outputDiv = document.getElementById("output");
  let html = `<h2>${book} ${chapter}장</h2><ul>`;
  for (const verseNum of Object.keys(verses)) {
    html += `<li><strong>${verseNum}</strong>절: ${verses[verseNum]}</li>`;
  }
  html += "</ul>";

// 이전/다음 장 버튼
const chapterNum = parseInt(chapter);
const prevChapter = chapterNum > 1 ? String(chapterNum - 1) : null;
const nextChapter = bibleData[book][String(chapterNum + 1)] ? String(chapterNum + 1) : null;

html += `<div class="nav-buttons">`;

html += `<div class="nav-left">`;
if (prevChapter) {
  html += `<button class="nav-btn" onclick="showChapter('${book}', '${prevChapter}')">← ${prevChapter}장</button>`;
}
html += `</div>`;

html += `<div class="nav-right">`;
if (nextChapter) {
  html += `<button class="nav-btn" onclick="showChapter('${book}', '${nextChapter}')">${nextChapter}장 →</button>`;
}
html += `</div>`;

html += `</div>`;


  outputDiv.innerHTML = `<div class="breathing-text">${html}</div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 응원 메시지 출력
  const encouragementDiv = document.getElementById("encouragement");
  if (messages.length > 0) {
    const message = messages[Math.floor(Math.random() * messages.length)];
    encouragementDiv.innerHTML = `<p class="encouragement">${message}</p>`;
  }

  // 이모지 변경
  const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  document.getElementById("emoji").textContent = randomEmoji;

  // 소개문 숨기기
  document.getElementById("intro").style.display = "none";

  // 이스터에그 링크 삽입
  if (!document.getElementById("easter-egg")) {
    const linkContainer = document.createElement("p");
    linkContainer.id = "easter-egg";
    linkContainer.className = "easter-egg";

    const link = document.createElement("a");
    link.href = "prayer.html";
    link.target = "_blank";
    link.innerText = "기도하러 가기";

    linkContainer.appendChild(link);
    encouragementDiv.parentNode.insertBefore(linkContainer, encouragementDiv.nextSibling);
  }

  // footer 보이기
  document.getElementById("footer").classList.add("visible");
}

// 빠른 클릭 이스터에그
let clickCount = 0;
let clickTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  const verseButton = document.getElementById("verse-button");

  if (verseButton) {
    verseButton.addEventListener("click", () => {
      clickCount++;

      if (clickCount >= 6) {
        alert("주님의 말씀을 천천히 음미하시기를 추천합니다 🙏");
        clickCount = 0;
        clearTimeout(clickTimer);
        clickTimer = null;
        return;
      }

      if (!clickTimer) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
          clickTimer = null;
        }, 3000); // 3초 이내 클릭만 집계
      }
    });
  }
});
