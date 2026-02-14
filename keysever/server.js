const express = require("express");
const app = express();

function genKey() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

app.get("/getkey", (req, res) => {
  const key = genKey();

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Nhận Key</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body{
        margin:0;
        background:#0f172a;
        color:white;
        font-family:sans-serif;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
      }
      .box{
        background:#111827;
        padding:30px;
        border-radius:15px;
        text-align:center;
        box-shadow:0 0 25px rgba(0,0,0,0.6);
      }
      .key{
        font-size:28px;
        margin-top:20px;
        color:#22c55e;
        display:none;
        letter-spacing:3px;
      }
      button{
        margin-top:20px;
        padding:12px 25px;
        border:none;
        border-radius:10px;
        background:#22c55e;
        color:white;
        font-size:16px;
        cursor:pointer;
        display:none;
      }
      button:hover{
        background:#16a34a;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>🔐 Đang tạo key cho bạn...</h2>
      <p id="count">Vui lòng chờ 5 giây</p>

      <div class="key" id="key">${key}</div>
      <button onclick="copyKey()">Sao chép key</button>
    </div>

    <script>
      let time = 5;
      let interval = setInterval(()=>{
        time--;
        document.getElementById("count").innerText =
          "Vui lòng chờ " + time + " giây";
        if(time<=0){
          clearInterval(interval);
          document.getElementById("count").innerText = "Key của bạn:";
          document.getElementById("key").style.display="block";
          document.querySelector("button").style.display="inline-block";
        }
      },1000);

      function copyKey(){
        navigator.clipboard.writeText("${key}");
        alert("Đã sao chép key!");
      }
    </script>
  </body>
  </html>
  `);
});

app.get("/", (req,res)=>{
  res.send("Key Server Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server chạy tại cổng " + PORT));
