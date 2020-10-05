let notes = [];
// let saveArray = [];
// let getSaveArray = [];
let container;
let deleted = false;

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
        newNotePad.setAttribute('data-index', notes.length - 1);

        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'underline');
        newNotePad.appendChild(newDiv);

        let newH2 = document.createElement('input')
        newH2.setAttribute('type', 'text')
        newH2.setAttribute('id', 'noteH2')
        newH2.value = note['title'];
        newDiv.appendChild(newH2);


        newH2.addEventListener('input', function (e) {
            let newIndex = e.target.parentElement.parentElement.dataset.index;
            notes[newIndex].title = e.target.value;
        });

        let newP = document.createElement('textarea');
        newP.setAttribute('id', 'noteP');
        newP.value = note['copy'];
        newNotePad.appendChild(newP);

        newP.addEventListener('input', function (event) {
            let newIndex = event.target.parentElement.parentElement.dataset.index;
            notes[newIndex].copy = event.target.value;
        });

        let close = document.createElement('span')
        close.setAttribute('id', 'close-this')
        close.innerHTML = `<i tabindex=0 class="fas fa-times-circle">`;
        newNotePad.appendChild(close);

        let theFirstChild = container.firstChild;
        container.insertBefore(newNotePad, theFirstChild);

        close.addEventListener("click", function (e) {
            let noteIndex = e.target.parentElement.parentElement.dataset.index;
            notes[noteIndex].deleted = true; // tell the array it's deleted
            e.target.parentElement.parentElement.remove();
        });

        document.querySelector('#close-this').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                let noteIndex = e.target.parentElement.parentElement.dataset.index;
                notes[noteIndex].deleted = true; // tell the array it's deleted
                e.target.parentElement.parentElement.remove();
            }
        });


        document.getElementById('title').focus();
    }

}


document.addEventListener('DOMContentLoaded', () => {
    container = document.querySelector('.wrapper');
    document.getElementById('btn').addEventListener('click', addNote);
    document.getElementById('title').focus();

    /* 
    let getSaveArray = JSON.parse(localStorage.getItem('saveArray'));
    
   for (let i = 0; i < getSaveArray.length; i++) {
            notes.push(getSaveArray[i]);
        }
        */
});


/*
let saveBtn = document.createElement('button');
saveBtn.setAttribute('type', 'button');
saveBtn.innerHTML = "save";
let saveContainer = document.querySelector('#save')
saveContainer.appendChild(saveBtn);

saveBtn.addEventListener('click', () => {

    for (let i = 0; i < notes.length; i++) {
        if (notes[i]['deleted'] !== true) {
            saveArray.push(notes[i]);
            console.log(saveArray);
        }
        localStorage.setItem('saveArray', JSON.stringify(saveArray));

    }
})
*/