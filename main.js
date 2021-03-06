let notes = [];
let currentIndex;
// let hyperlinkLength = [];
const container = document.querySelector('.wrapper');
const cover = document.querySelector('#cover')


const checkForLinks = function (textSource, dataIndex) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var t = textSource

    if (t.match(regex)) {

        for (let link in t.match(regex)){
            if(notes[dataIndex]['fromStorage'] === true){
                notes[dataIndex]['links'].push(t.match(regex)[link]);
                let hyperlink = document.createElement('a')
                hyperlink.setAttribute('class', 'hyperlink')
                hyperlink.setAttribute('data-index', dataIndex)
                hyperlink.href = t.match(regex)[link]
                hyperlink.innerHTML = `${t.match(regex)[link]}<i class="fas fa-external-link-alt"></i>`;
                hyperlink.style.display = "block";
                hyperlink.setAttribute('target', "_blank")
                document.querySelector(`.class${dataIndex}`).querySelector('.linksDiv').appendChild(hyperlink);
            } else {
            if (notes[dataIndex]['links'].includes(t.match(regex)[link]) === false) {
                notes[dataIndex]['links'].push(t.match(regex)[link]);
                let hyperlink = document.createElement('a')
                hyperlink.setAttribute('class', 'hyperlink')
                hyperlink.setAttribute('data-index', dataIndex)
                hyperlink.href = t.match(regex)[link]
                hyperlink.innerHTML = `<i class="fas fa-external-link-alt"></i>${t.match(regex)[link]}`;
                hyperlink.style.display = "block";
                hyperlink.setAttribute('target', "_blank")
                document.querySelector(`.class${dataIndex}`).querySelector('.linksDiv').appendChild(hyperlink);
                }
             }
        }
        notes[dataIndex]['fromStorage'] = false;
    } else {
        console.log('no link here')
    }
}

const closeFunc = function (e) {
    let noteIndex = e.target.dataset.index;
    notes[noteIndex]['deleted'] = true;
    document.querySelector(`.class${currentIndex}`).querySelector('.user-note-pad').removeEventListener('mouseover', colorSymbolOut);
    document.querySelector(`.class${currentIndex}`).querySelector('.close-this').removeEventListener('mouseover', colorSymbolOut);
    cover.removeEventListener('mouseover', colorSymbolAndDeleteOut);
    document.querySelector(`.class${currentIndex}`).querySelector('.close-this').removeEventListener('mouseover', colorSymbolOut);
    e.target.parentElement.remove();
    localStorage.setItem("notesStorage", JSON.stringify(notes));
    console.log(notes)
    cover.style.zIndex = "-5"
    cover.style.opacity = "0"
    setTimeout(function () {
        cover.style.display = "none"
    }, 200);
}


const original = function (e) {
    notes[e.target.dataset.index]['color'] = "standard";
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.style.color = 'white';
    thisClassOriginal.style.backgroundColor = 'var(--bkgrnd)';
    thisClassOriginal.querySelector('.noteH2').style.color = "white";
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}


const redCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "red";
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.style.color = 'var(--bkgrnd)';
    thisClassOriginal.style.backgroundColor = 'var(--red)';
    thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
    thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
    thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}


const greenCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "green";
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.style.color = 'var(--bkgrnd)';
    thisClassOriginal.style.backgroundColor = 'var(--green)';
    thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
    thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
    thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}


const blueCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "blue";
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.style.color = 'var(--bkgrnd)';
    thisClassOriginal.style.backgroundColor = 'var(--blue)';
    thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
    thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
    thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'
    localStorage.setItem("notesStorage", JSON.stringify(notes));
}



const colorSymbolHover = function (e) {
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.querySelector('.colorContainer').style.display = "inline-block";
}



const colorSymbolOut = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    if (document.querySelectorAll('.colorContainer')) {
        thisClassOriginal.querySelector('.colorContainer').style.display = "none";
    }
}

const colorSymbolAndDeleteOut = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.colorContainer').style.display = "none";
    thisClassOriginal.querySelector('.closeContainer').style.display = "none";
}

const showDelete = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.closeContainer').style.display = "inline-block";
}

const dontShowDelete = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.closeContainer').style.display = "none";
}

const createNote = function (note) {
    if (note['title'] != '') {

        notes.push(note);

        localStorage.setItem("notesStorage", JSON.stringify(notes));

        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('data-index', notes.length - 1);
        itemDiv.setAttribute('class', `item   class${notes.length - 1}`)


        let newNotePad = document.createElement('div');
        newNotePad.setAttribute('class', 'user-note-pad')
        newNotePad.setAttribute('data-index', notes.length - 1);
        // newNotePad.addEventListener('click', focusIn);


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
        newP.innerText = note['copy'];
        newP.setAttribute('contenteditable', 'true');
        newP.setAttribute('role', 'textbox')
        newP.setAttribute('data-index', notes.length - 1);
        newP.addEventListener('keyup', updateCopyValue);
        newP.addEventListener("paste", sanitizeText);
        newNotePad.appendChild(newP);


        let linksDiv = document.createElement('div')
        linksDiv.setAttribute('class', 'linksDiv')
        newNotePad.appendChild(linksDiv)

        itemDiv.appendChild(newNotePad);




        let colorContainer = document.createElement('div')
        colorContainer.setAttribute('class', 'colorContainer');


        let originalCircle = document.createElement('span')
        originalCircle.setAttribute('class', 'original')
        originalCircle.setAttribute('data-index', notes.length - 1);
        originalCircle.addEventListener('click', original)
        colorContainer.appendChild(originalCircle)


        let blueCircle = document.createElement('span')
        blueCircle.setAttribute('class', 'blueCircle')
        blueCircle.setAttribute('data-index', notes.length - 1);
        blueCircle.addEventListener('click', blueCircleChange)
        colorContainer.appendChild(blueCircle)

        let redCircle = document.createElement('span')
        redCircle.setAttribute('class', 'redCircle')
        redCircle.setAttribute('data-index', notes.length - 1);
        redCircle.addEventListener('click', redCircleChange)
        colorContainer.appendChild(redCircle)

        let greenCircle = document.createElement('span')
        greenCircle.setAttribute('class', 'greenCircle')
        greenCircle.setAttribute('data-index', notes.length - 1);
        greenCircle.addEventListener('click', greenCircleChange)
        colorContainer.appendChild(greenCircle)

        itemDiv.appendChild(colorContainer)

        let optionsContainer = document.createElement('div');
        optionsContainer.setAttribute('class', "optionsContainer")

        let colorSymbol = document.createElement('i')
        colorSymbol.setAttribute('class', 'fas fa-palette')
        colorSymbol.setAttribute('data-index', notes.length - 1);
        colorSymbol.addEventListener('mouseover', colorSymbolHover)
        colorSymbol.addEventListener('focus', colorSymbolHover)
        optionsContainer.appendChild(colorSymbol)

        let close = document.createElement('span')
        close.setAttribute('data-index', notes.length - 1);
        close.setAttribute('class', 'close-this')
        close.innerHTML = `<i tabindex=0 class="fas fa-times-circle">`;
        close.addEventListener('mouseover', showDelete)
        // close.addEventListener('mouseout', dontShowDelete)

        let closeText = document.createElement('p')
        closeText.setAttribute('class', 'closeContainer')
        closeText.setAttribute('data-index', notes.length - 1);
        closeText.addEventListener('mouseout', dontShowDelete)
        closeText.innerText = 'Delete';

        itemDiv.appendChild(closeText);

        optionsContainer.appendChild(close)

        itemDiv.appendChild(optionsContainer)

        let theFirstChild = container.firstChild;
        container.insertBefore(itemDiv, theFirstChild);

        if (note['color'] === 'standard') {
            let thisClassOriginal = document.querySelector(`.class${notes.length - 1}`)
            thisClassOriginal.style.color = 'white';
            thisClassOriginal.style.backgroundColor = 'var(--bkgrnd)';
            thisClassOriginal.querySelector('.noteH2').style.color = "white";

        } else if (note['color'] === 'red') {
            let thisClassOriginal = document.querySelector(`.class${notes.length - 1}`)
            thisClassOriginal.style.color = 'var(--bkgrnd)';
            thisClassOriginal.style.backgroundColor = 'var(--red)';
            thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
            thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
            thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'
        } else if (note['color'] === 'green') {
            let thisClassOriginal = document.querySelector(`.class${notes.length - 1}`)
            thisClassOriginal.style.color = 'var(--bkgrnd)';
            thisClassOriginal.style.backgroundColor = 'var(--green)';
            thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
            thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
            thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'

        } else if (note['color'] === 'blue') {
            let thisClassOriginal = document.querySelector(`.class${notes.length - 1}`)
            thisClassOriginal.style.color = 'var(--bkgrnd)';
            thisClassOriginal.style.backgroundColor = 'var(--blue)';
            thisClassOriginal.querySelector('.noteH2').style.color = "var(--bkgrnd)";
            thisClassOriginal.querySelector('.underline').style.boxShadow = '0px 2px 5px rgba(0, 0, 0, .1)'
            thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = '2px 0px 2px rgba(0, 0, 0, .2)'

        }

        closeText.addEventListener("click", closeFunc);
        document.querySelector('.title').focus();
        document.querySelector('.noteP').addEventListener('click', focusIn)

    }

    checkForLinks(note['copy'], notes.length - 1)
    resizeAllGridItems()
}



const updateTitleValue = function (e) {

    setTimeout(function () {
        notes[e.target.parentElement.dataset.index]['title'] = e.target.value;
        localStorage.setItem("notesStorage", JSON.stringify(notes));
    }, 200);

}

const updateCopyValue = function (e) {

    setTimeout(function () {
        notes[e.target.parentElement.dataset.index]['copy'] = e.target.innerText;
        resizeAllGridItems()
        localStorage.setItem("notesStorage", JSON.stringify(notes));
        checkForLinks(notes[e.target.parentElement.dataset.index]['copy'], currentIndex)
    }, 200);
}

const getInputValues = function (event) {
    event.preventDefault();


    let singleNote = {
        title: document.querySelector('.title').value,
        copy: document.querySelector('.body-copy').innerText,
        deleted: false,
        color: "standard",
        links: [],
        fromStorage: false
    }

    document.querySelector('form').reset();
    document.querySelector('.body-copy').innerHTML = '';
    createNote(singleNote)
    resizeAllGridItems()
}



const focusIn = function (e) {
    currentIndex = e.target.dataset.index;
    console.log(notes)
    const thisClass = document.querySelector(`.class${e.target.dataset.index}`)
    thisClass.querySelector('.noteP').removeEventListener('click', focusIn);
    thisClass.querySelector('.noteP').style.overflow = 'auto';
    thisClass.querySelector('.optionsContainer').style.display = "block";
    thisClass.querySelector('.user-note-pad').addEventListener('mouseover', colorSymbolOut);
    thisClass.querySelector('.fa-palette').addEventListener('mouseover', dontShowDelete);
    thisClass.querySelector('.close-this').addEventListener('mouseover', colorSymbolOut);
    cover.style.display = "block"
    cover.style.zIndex = "3"
    cover.addEventListener('mouseover', colorSymbolAndDeleteOut);
    setTimeout(function () {
        cover.style.opacity = "1"
    }, 1);

    thisClass.classList.add("centered");
    document.querySelector('body').style.overflow = "hidden"

}



const focusOut = function (e) {
    focusIndex = document.querySelector(`.class${currentIndex}`)
    focusIndex.querySelector('.noteP').addEventListener('click', focusIn);
    focusIndex.querySelector('.noteP').innerText = notes[currentIndex]['copy']
    focusIndex.querySelector('.noteP').style.overflow = 'hidden'
    focusIndex.querySelector('.optionsContainer').style.display = "none";
    focusIndex.querySelector('.closeContainer').style.display = "none";
    document.querySelector('body').style.overflow = "auto"
    cover.style.zIndex = "-5"
    cover.style.opacity = "0"
    setTimeout(function () {
        cover.style.display = "none"
    }, 200);

    const center = document.querySelector('.centered')
    center.classList.remove("centered");

    resizeAllGridItems()
}

cover.addEventListener('click', focusOut)


function resizeGridItem(item) {
    grid = document.querySelector(".wrapper");
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.user-note-pad').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    allItems = document.getElementsByClassName("item");
    for (x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}


const sanitizeText = function (e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
    new KeyboardEvent('keydown', {
        'keyCode': 32,
        'which': 32
    })
}


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.originalNote').addEventListener("paste", sanitizeText);

    let newStore = [];
    const storedNotes = JSON.parse(localStorage.getItem("notesStorage"));
    for (let note in storedNotes) {

        if (storedNotes[note]['deleted'] === false) {
            storedNotes[note]['fromStorage'] = true;
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




// todo list code



// let listItems = [];

// const removeLi = function(e){
//   e.target.parentElement.remove()
//   listItems[e.target.parentElement.dataset.index]['deleted'] = true;
// }

// const updateLi = function(e){
//   listItems[e.target.parentElement.dataset.index]['label'] = e.target.parentElement.querySelector('.listDescription').innerText;
//   console.log(listItems)
// }

// const isChecked = function(e){
//   if(e.target.checked === true){
//    listItems[e.target.parentElement.dataset.index]['checked'] = true; e.target.parentElement.parentElement.querySelector('.listDescription').style.textDecoration = "line-through"
//   }else{
//     listItems[e.target.parentElement.dataset.index]['checked'] = false; e.target.parentElement.parentElement.querySelector('.listDescription').style.textDecoration = "none"
//   }
// }


// const createListDom = document.getElementById('createListItem')

// const createListItem = function(event){
//    event.preventDefault();

//   if(document.querySelector('#listName').value !== ''){
 
//   const list = document.getElementById("list")
//   const listItem = document.createElement('div');
//   listItem.setAttribute('class','listItem');
    
//   const checkContainer = document.createElement('label')  
//   checkContainer.setAttribute('class', 'checkContainer')
    
//   const checkBox = document.createElement('input');
//   checkBox.setAttribute('class', 'check');
//   checkBox.setAttribute('type','checkbox');
//   checkBox.addEventListener('click', isChecked);
//   checkContainer.appendChild(checkBox);
    
//   const check = document.createElement('span')
//   check.setAttribute('class', 'checkmark');
//   checkContainer.appendChild(check);
    
//   listItem.appendChild(checkContainer)  
  
//   const listDescription = document.createElement('p');
//   listDescription.innerText = document.querySelector('#listName').value;
//   listDescription.setAttribute('class', 'listDescription');
//   listDescription.setAttribute('contenteditable', 'true');
//   listDescription.setAttribute('role', 'textbox')
//   listDescription.addEventListener('keyup', updateLi)
//   listItem.appendChild(listDescription);
  
//   const remove = document.createElement('span');
//   remove.setAttribute('class', 'remove')
//   remove.innerText = 'x';
//   remove.addEventListener('click', removeLi)
//   listItem.appendChild(remove);
  
//   let theFirstChild = list.firstChild;
//   list.insertBefore(listItem, theFirstChild);
  
//   let currentListItem = {
//      label: document.querySelector('#listName').value,
//      checked: false,
//      deleted: false
//   }
  
//   listItems.push(currentListItem);
    
//    checkContainer.setAttribute('data-index', listItems.length - 1);
//    listItem.setAttribute('data-index', listItems.length - 1);
  
//   document.querySelector('#listName').value = '';
//   document.querySelector('#listName').focus();
//   // console.log(listItems);
//     }
// }


// createListDom.addEventListener('click', createListItem);


