const area = document.querySelector('textarea')
const input = document.getElementById("inputname")
const btnStart = document.getElementById("btn-start")

socket = io()
//socket.emit('new-user', )

let room

socket.on('update-text', data => {
  area.value = data
})

if (area.addEventListener) {
  area.addEventListener('input', function() {
    console.log(area.value)

    socket.emit('change-text', {room: room, text: area.value})
  }, false);
} else if (area.attachEvent) {
  area.attachEvent('onpropertychange', function() {
    console.log(area.value)
  });
}

goToARoom = () => {
  if(input.value.trim() !== '') {
    socket.emit('create-room', input.value)
    room = input.value
    area.style.display = "block"
    input.style.display = "none"
    btnStart.style.display = "none"
  } else {
    alert('tente novamente')
  }
}