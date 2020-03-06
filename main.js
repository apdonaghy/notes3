let notes = [];
let container;

function addNote(event) {
    event.preventDefault();
    let note = {
        title: document.getElementById('title').value,
        copy: document.getElementById('body-copy').value
    }
    notes.push(note);

    document.querySelector('form').reset();

    if (note['title'].length !== 0) {

        let newNotePad = document.createElement('div');
        newNotePad.setAttribute('id', 'user-note-pad')


        let newH2 = document.createElement('input')
        newH2.setAttribute('type', 'text')
        newH2.setAttribute('id', 'noteH2')
        newH2.value = note['title'];
        newNotePad.appendChild(newH2);

        let close = document.createElement('span')
        close.setAttribute('id', 'close-this')
        close.innerHTML = `<i class="fas fa-times-circle">`;
        newNotePad.appendChild(close);

        let newP = document.createElement('textarea')
        newP.setAttribute('id', 'noteP')
        newP.value = note['copy'];
        newNotePad.appendChild(newP);

        container.appendChild(newNotePad);

        close.addEventListener("click", function (event) {

            document.getElementById("close-this")
            this.parentElement.remove();
    
    
          });

        document.getElementById('title').focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    container = document.querySelector('.wrapper');
    document.getElementById('btn').addEventListener('click', addNote);
    document.getElementById('title').focus();
});