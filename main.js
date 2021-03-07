let notes = [];
const container = document.querySelector('.wrapper');



const closeFunc = function (e) {
    let noteIndex = e.target.parentElement.parentElement.dataset.index;
    notes.splice(noteIndex, 1);
    e.target.parentElement.parentElement.remove();
    localStorage.setItem("notesStorage", JSON.stringify(notes));
}

const createNote = function(note) {
    if (note['title'] != '') {

        notes.push(note);

        localStorage.setItem("notesStorage", JSON.stringify(notes));

        let newNotePad = document.createElement('div');
        newNotePad.setAttribute('class', 'user-note-pad')
        newNotePad.setAttribute('data-index', notes.length - 1);

        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'underline');
        newDiv.setAttribute('data-index', notes.length - 1);
        newNotePad.appendChild(newDiv);

        let newH2 = document.createElement('input')
        newH2.setAttribute('type', 'text')
        newH2.setAttribute('class', 'noteH2')
        newH2.value = note['title'];
        newH2.setAttribute('autocomplete', 'off')
        newH2.addEventListener('keypress', updateTitleValue);
        newDiv.appendChild(newH2);
        

        let newP = document.createElement('textarea');
        newP.setAttribute('class', 'noteP');
        newP.value = note['copy'];
        newP.setAttribute('autocomplete', 'off')
        newP.addEventListener('keypress', updateCopyValue);
        newNotePad.appendChild(newP);

        let close = document.createElement('span')
        close.setAttribute('class', 'close-this')
        close.innerHTML = `<i tabindex=0 class="fas fa-times-circle">`;
        newNotePad.appendChild(close);

        let theFirstChild = container.firstChild;
        container.insertBefore(newNotePad, theFirstChild);

        close.addEventListener("click", closeFunc);
        close.addEventListener("keypress", closeFunc);


        document.querySelector('.title').focus();
    }
}

const updateTitleValue = function(e){

    setTimeout(function(){ 
     notes[e.target.parentElement.dataset.index]['title'] = e.target.value;
     localStorage.setItem("notesStorage", JSON.stringify(notes));
     }, 200);
     
}

const updateCopyValue = function(e){

    setTimeout(function(){ 
        notes[e.target.parentElement.dataset.index]['copy'] = e.target.value;
        localStorage.setItem("notesStorage", JSON.stringify(notes));
        }, 200);

}

const getInputValues = function (event) {
    event.preventDefault();


    let singleNote = {
        title: document.querySelector('.title').value,
        copy: document.querySelector('.body-copy').value
    }

    document.querySelector('form').reset();
    createNote(singleNote)


}


document.addEventListener('DOMContentLoaded', () => {

    const storedNotes = JSON.parse(localStorage.getItem("notesStorage"));

    for (let singleNote in storedNotes) {
        createNote(storedNotes[singleNote])
    }

 


    document.querySelector('.btn').addEventListener('click', getInputValues);
    document.querySelector('.title').focus();



});