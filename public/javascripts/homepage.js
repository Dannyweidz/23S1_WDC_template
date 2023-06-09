const events = document.querySelectorAll('.event');
const previousEventBtn = document.getElementById('previousEventBtn');
const nextEventBtn = document.getElementById('nextEventBtn');
let currentEventIndex = 0;

previousEventBtn.addEventListener('click', () => {
  events[currentEventIndex].classList.remove('active');
  currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;
  events[currentEventIndex].classList.add('active');
});

nextEventBtn.addEventListener('click', () => {
  events[currentEventIndex].classList.remove('active');
  currentEventIndex = (currentEventIndex + 1) % events.length;
  events[currentEventIndex].classList.add('active');
});

const moreEventsBtn = document.getElementById('moreEventsBtn');
moreEventsBtn.addEventListener('click', () => {
  // Code to handle clicking the "More Events" button
  console.log('More events button clicked');
});

function logout() {
  let XHTTP = new XMLHttpRequest();

  XHTTP.onreadystatechange = function(){
    if (XHTTP.readyState === 4 && XHTTP.status === 200){
      window.location.href = '/';
    }
  }

  XHTTP.open('POST', '/logout', true);
  XHTTP.send();
}

function profile() {
  let XHTTP = new XMLHttpRequest();

  XHTTP.onreadystatechange = function(){
    if (XHTTP.readyState === 4 && XHTTP.status === 200){
      window.location.href = '/profile';
    }
  }

  XHTTP.open('GET', '/profile', true);
  XHTTP.send();
}