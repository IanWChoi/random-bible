document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("pray-submit");
    button.addEventListener("click", () => {
      alert("방금 적은 기도는 서버에 전송되지 않으나, 하나님께 전송되었습니다.");
    });
  });
  