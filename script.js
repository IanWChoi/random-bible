let bibleData = {};
let messages = [];

// 랜덤 이모지 리스트
const emojiList = ["📖", "🕊️", "🌿", "☁️", "✨", "🙏", "🌼", "🌙", "💡", "🌤️"];

// 데이터 로딩
fetch("full_bible.json")
  .then(response => response.json())
  .then(data => {
    bibleData = data;
  });

fetch("messages.json")
  .then(response => response.json())
  .then(data => {
    messages = data;
  });

function showRandomChapter() {
  // 말씀 랜덤 선택
  const books = Object.keys(bibleData);
  const book = books[Math.floor(Math.random() * books.length)];
  const chapters = Object.keys(bibleData[book]);
  const chapter = chapters[Math.floor(Math.random() * chapters.length)];
  const verses = bibleData[book][chapter];

  // 말씀 출력
  const outputDiv = document.getElementById("output");
  let html = `<h2>${book} ${chapter}장</h2><ul>`;
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

  // 이모지 바꾸기
  const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  document.getElementById("emoji").textContent = randomEmoji;

  // 소개문 숨기기
  document.getElementById("intro").style.display = "none";
  // ✅ 이스터에그 링크가 아직 없다면, 새로 만들어 붙이기
  if (!document.getElementById("easter-egg")) {
    const linkContainer = document.createElement("p");
    linkContainer.id = "easter-egg";
    linkContainer.className = "easter-egg";
    
    const link = document.createElement("a");
    link.href = "prayer.html";
    link.target = "_blank";
    link.innerText = "기도하러 가기";

    linkContainer.appendChild(link);

    // encouragement div 바로 뒤에 추가
    const encouragementDiv = document.getElementById("encouragement");
    encouragementDiv.parentNode.insertBefore(linkContainer, encouragementDiv.nextSibling);
  }
  // footer 보이기
  document.getElementById("footer").classList.add("visible");
}
