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
        newH2.addEventListener('change', updateValue);
        newDiv.appendChild(newH2);
        

<<<<<<< HEAD
        let newP = document.createElement('textarea');
        newP.setAttribute('class', 'noteP');
=======

        // newH2.addEventListener('input', function (e) {
        //     let newIndex = e.target.parentElement.parentElement.dataset.index;
        //     notes[newIndex].title = e.target.value;
        // });

        let newP = document.createElement('textarea');
        newP.setAttribute('id', 'noteP');
>>>>>>> 65dc98f45a7086223de6a193ef7d3b73fce994f1
        newP.value = note['copy'];
        newP.setAttribute('autocomplete', 'off')
        newP.addEventListener('change', updateValue);
        newNotePad.appendChild(newP);

<<<<<<< HEAD
        let close = document.createElement('span')
        close.setAttribute('class', 'close-this')
=======
        // newP.addEventListener('input', function (event) {
        //     let newIndex = event.target.parentElement.parentElement.dataset.index;
        //     notes[newIndex].copy = event.target.value;
        // });

        let close = document.createElement('span')
        close.setAttribute('id', 'close-this')
>>>>>>> 65dc98f45a7086223de6a193ef7d3b73fce994f1
        close.innerHTML = `<i tabindex=0 class="fas fa-times-circle">`;
        newNotePad.appendChild(close);

        let theFirstChild = container.firstChild;
        container.insertBefore(newNotePad, theFirstChild);

<<<<<<< HEAD
        close.addEventListener("click", closeFunc);
        close.addEventListener("keypress", closeFunc);


        document.querySelector('.title').focus();
=======
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
>>>>>>> 65dc98f45a7086223de6a193ef7d3b73fce994f1
    }
}

const updateValue = function(e){
    // let changeIndex = e.target.parentElement.dataset.index;
     console.log(e.target.value)
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