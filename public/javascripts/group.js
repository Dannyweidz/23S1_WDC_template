const eventDiv = document.getElementById('events-selected');
const membersDiv = document.getElementById('members-selected');

function showEvents(){
    eventDiv.hidden = false;
    membersDiv.hidden = true;
}

function showMembers(){
    eventDiv.hidden = true;
    membersDiv.hidden = false;
}