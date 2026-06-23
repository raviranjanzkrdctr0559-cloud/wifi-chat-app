const socket = io();

let name = prompt("Enter your name:");
socket.emit("join", name);

function send(){
  let msg = document.getElementById("msg").value;

  socket.emit("message", {
    name,
    msg
  });

  document.getElementById("msg").value = "";
}

socket.on("message",(data)=>{
  document.getElementById("box").innerHTML +=
  `<p><b>${data.name}:</b> ${data.msg}</p>`;
});

socket.on("users",(users)=>{

  let html = "";

  Object.keys(users).forEach(id=>{
    let u = users[id];

    let statusText = u.status === "online"
      ? "🟢 Online"
      : "⚪ Last seen";

    html += `
      <p>
        ${u.name} <br>
        <small>${statusText}</small>
      </p>
    `;
  });

  document.getElementById("users").innerHTML = html;
});
