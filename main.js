let notes = [];
let currentIndex;
const container = document.querySelector('.wrapper');



const closeFunc = function (e) {
    let noteIndex = e.target.parentElement.dataset.index;
    notes[noteIndex]['deleted'] = true;
    e.target.parentElement.parentElement.remove();
    localStorage.setItem("notesStorage", JSON.stringify(notes));
    console.log(notes)
    cover.style.zIndex = "-5"
    cover.style.opacity = "0"
    setTimeout(function(){ 
        cover.style.display = "none"
        }, 200);
}



const createNote = function(note) {
    if (note['title'] != '') {

        notes.push(note);

        localStorage.setItem("notesStorage", JSON.stringify(notes));

        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('data-index', notes.length - 1);
        itemDiv.setAttribute('class', `item   class${notes.length - 1}`)
        

        let newNotePad = document.createElement('div');
        newNotePad.setAttribute('class', 'user-note-pad')
        newNotePad.setAttribute('data-index', notes.length - 1);
        newNotePad.addEventListener('click', focusIn);

        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'underline');
        newDiv.setAttribute('data-index', notes.length - 1);
        newDiv.addEventListener('click', focusIn)
        newNotePad.appendChild(newDiv);
      
        let newH2 = document.createElement('input')
        newH2.setAttribute('type', 'text')
        newH2.setAttribute('class', 'noteH2')
        newH2.value = note['title'];
        newH2.setAttribute('autocomplete', 'off')
        newH2.setAttribute('data-index', notes.length - 1);
        newH2.addEventListener('click', focusIn)
        newH2.addEventListener('keydown', updateTitleValue);
        newDiv.appendChild(newH2);
        
        let newP = document.createElement('p');
        newP.setAttribute('class', 'noteP');
        newP.innerText= note['copy'];
        // newP.setAttribute('autocomplete', 'off')
        newP.setAttribute('contenteditable', 'true');
        newP.setAttribute('role', 'textbox')
        newP.setAttribute('data-index', notes.length - 1);
        newP.addEventListener('click', focusIn)
        newP.addEventListener('keydown', updateCopyValue);
        newP.addEventListener("paste", sanitizeText);
        newNotePad.appendChild(newP);
        
        itemDiv.appendChild(newNotePad);

        let close = document.createElement('span')
        close.setAttribute('data-index', notes.length - 1);
        close.setAttribute('class', 'close-this')
        close.innerHTML = `<i tabindex=0 class="fas fa-times-circle">`;
        itemDiv.appendChild(close)

        let theFirstChild = container.firstChild;
        container.insertBefore(itemDiv, theFirstChild);

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
        notes[e.target.parentElement.dataset.index]['copy'] = e.target.innerText;
        resizeAllGridItems()
        localStorage.setItem("notesStorage", JSON.stringify(notes));
        }, 200);
}

const getInputValues = function (event) {
    event.preventDefault();


    let singleNote = {
        title: document.querySelector('.title').value,
        copy: document.querySelector('.body-copy').innerText,
        deleted: false
    }

    document.querySelector('form').reset();
    document.querySelector('.body-copy').innerHTML = '';
    createNote(singleNote)
    resizeAllGridItems()
}

const cover = document.querySelector('#cover')
const focusIn = function(e){
    currentIndex = e.target.dataset.index;
    console.log(currentIndex)
    const thisClass = document.querySelector(`.class${e.target.dataset.index}`)
    thisClass.querySelector('.noteP').style.overflow = 'scroll'
    cover.style.display = "block"
    cover.style.zIndex = "3"
    setTimeout(function(){ 
        cover.style.opacity = "1"
        }, 1);

    thisClass.classList.add("centered"); 
}



const focusOut = function(e){
    focusIndex = document.querySelector(`.class${currentIndex}`)
    focusIndex.querySelector('.noteP').innerText = notes[currentIndex]['copy']
    focusIndex.querySelector('.noteP').style.overflow = 'hidden'
    cover.style.zIndex = "-5"
    cover.style.opacity = "0"
    setTimeout(function(){ 
        cover.style.display = "none"
        }, 200);
  
    const center = document.querySelector('.centered')
    center.classList.remove("centered");
    resizeAllGridItems()
}

cover.addEventListener('click', focusOut)


function resizeGridItem(item){
    grid = document.querySelector(".wrapper");
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.user-note-pad').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
  }
  
  function resizeAllGridItems(){
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
    }
  }
  

const sanitizeText = function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
    KeyboardEvent('keydown',{'keyCode':32,'which':32})
}


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.originalNote').addEventListener("paste", sanitizeText);

    let newStore = [];
    const storedNotes = JSON.parse(localStorage.getItem("notesStorage"));
    for(let note in storedNotes){

     if(storedNotes[note]['deleted'] === false){
            newStore.push(storedNotes[note])
        }
        
     }

    for (let singleNote in newStore) {
        createNote(newStore[singleNote])
    }

 


    document.querySelector('.btn').addEventListener('click', getInputValues);
    document.querySelector('.title').focus();

 
      
      window.onload = resizeAllGridItems();
      window.addEventListener("resize", resizeAllGridItems);


});