document.addEventListener("DOMContentLoaded", () => {
  const pastelColors = [
    "#fdfcf5", 
    "#f9fbe7",
    "#f0f9ff", 
    "#fceff9", 
    "#fffaf0", 
    "#f3fdf3", 
    "#fefefe", 
    "#f3f8ff", 
    "#fff5f7"  
  ];

  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  document.body.style.backgroundColor = randomColor;

  const button = document.getElementById("pray-submit");
  button.addEventListener("click", () => {
    alert("방금 적은 기도는 서버에 전송되지 않으나, 하나님께 전송되었습니다.");
  });
});
