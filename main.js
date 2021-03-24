let notes = [];
let currentIndex;
const container = document.querySelector('.wrapper');
const cover = document.querySelector('#cover')
const black = 'var(--bkgrnd)'
const white = 'white'
const red = 'var(--red)'
const green = 'var(--green)'
const blue = 'var(--blue)'
const lightUnderline = '0px 2px 5px rgba(0, 0, 0, .1)'
const lightOptionsBlur = '0px 2px 5px rgba(0, 0, 0, .1)'
const darkUnderline = '0px 2px 5px rgba(0, 0, 0, .6)'
const darkOptionsBlur = '0px 2px 5px rgba(0, 0, 0, 1)'


const removeLi = function(e){
  e.target.parentElement.remove()
  notes[currentIndex]['listItems'][e.target.parentElement.dataset.index]['deleted'] = true;
}

const updateLi = function(e){
  notes[currentIndex]['listItems'][e.target.parentElement.dataset.index]['label'] = e.target.parentElement.querySelector('.listDescription').innerText;
  console.log(notes[currentIndex]['listItems'])
}

const isChecked = function(e){
  if(e.target.checked === true){
    notes[currentIndex]['listItems'][e.target.parentElement.dataset.index]['checked'] = true; e.target.parentElement.parentElement.querySelector('.listDescription').style.textDecoration = "line-through"
  }else{
    notes[currentIndex]['listItems'][e.target.parentElement.dataset.index]['checked'] = false; e.target.parentElement.parentElement.querySelector('.listDescription').style.textDecoration = "none"
  }
}


const createListItem = function(e){
    e.preventDefault();
 
   if(document.querySelector(`.class${currentIndex}`).querySelector('.listName').value !== ''){
  
   const list = document.querySelector(`.class${currentIndex}`).querySelector(".list")
   const listItem = document.createElement('div');
   listItem.setAttribute('class','listItem');
     
   const checkContainer = document.createElement('label')  
   checkContainer.setAttribute('class', 'checkContainer')
     
   const checkBox = document.createElement('input');
   checkBox.setAttribute('class', 'check');
   checkBox.setAttribute('type','checkbox');
   checkBox.addEventListener('click', isChecked);
   checkContainer.appendChild(checkBox);
     
   const check = document.createElement('span')
   check.setAttribute('class', 'checkmark');
   checkContainer.appendChild(check);
     
   listItem.appendChild(checkContainer)  
   
   const listDescription = document.createElement('p');
   listDescription.innerText = document.querySelector(`.class${currentIndex}`).querySelector('.listName').value;
   listDescription.setAttribute('class', 'listDescription');
   listDescription.setAttribute('contenteditable', 'true');
   listDescription.setAttribute('role', 'textbox')
   listDescription.addEventListener('keyup', updateLi)
   listItem.appendChild(listDescription);
   
   const remove = document.createElement('span');
   remove.setAttribute('class', 'remove')
   remove.innerText = 'x';
   remove.addEventListener('click', removeLi)
   listItem.appendChild(remove);
   
   let theFirstChild = list.firstChild;
   list.insertBefore(listItem, theFirstChild);
   
   let currentListItem = {
      label: document.querySelector(`.class${currentIndex}`).querySelector('.listName').value,
      checked: false,
      deleted: false
   }
   
   notes[currentIndex]['listItems'].push(currentListItem);
     
    checkContainer.setAttribute('data-index', notes[currentIndex]['listItems'].length - 1);
    listItem.setAttribute('data-index', notes[currentIndex]['listItems'].length - 1);
   
    document.querySelector(`.class${currentIndex}`).querySelector('.listName').value = '';
    document.querySelector(`.class${currentIndex}`).querySelector('.listName').focus();
   // console.log(listItems);
     }
 }

 const makeListEvent = function(e){

    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteP').style.display = 'none';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.linksDiv').style.display = 'none';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.tabsDiv').style.visibility = 'visible';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteTab').style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.listTab').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.todo').style.display = 'block';

}

const noteTabClick = function(e){
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.todo').style.display = 'none';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteP').style.display = 'block';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.linksDiv').style.display = 'block';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteTab').style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.listTab').style.backgroundColor = 'rgba(0,0,0, 0.1)';
    resizeAllGridItems()
}

const listTabClick = function(e){
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.todo').style.display = 'block';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteP').style.display = 'none';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.linksDiv').style.display = 'none';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.noteTab').style.backgroundColor = 'rgba(0,0,0, 0.1)';
    document.querySelector(`.class${e.target.dataset.index}`).querySelector('.listTab').style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    resizeAllGridItems()
}



function createColor(textColorVar, backgroundColorVar, underlineBlur, optionsBlur, classAccessInside){
    let thisClassOriginal = document.querySelector(`.class${classAccessInside}`)
    thisClassOriginal.style.color = textColorVar;
    thisClassOriginal.style.backgroundColor = backgroundColorVar;
    thisClassOriginal.querySelector('.noteH2').style.color = textColorVar;
    thisClassOriginal.querySelector('.underline').style.boxShadow = underlineBlur;
    thisClassOriginal.querySelector('.optionsContainer').style.boxShadow = optionsBlur;
}


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
    createColor(white, black, darkUnderline, darkOptionsBlur, e.target.dataset.index)
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}

const redCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "red";
    createColor(black, red, lightUnderline, lightOptionsBlur, e.target.dataset.index)
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}

const greenCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "green";
    createColor(black, green, lightUnderline, lightOptionsBlur, e.target.dataset.index)
    localStorage.setItem("notesStorage", JSON.stringify(notes));

}

const blueCircleChange = function (e) {
    notes[e.target.dataset.index]['color'] = "blue";
    createColor(black, blue, lightUnderline, lightOptionsBlur, e.target.dataset.index)
    localStorage.setItem("notesStorage", JSON.stringify(notes));
}


const colorSymbolHover = function (e) {
    let thisClassOriginal = document.querySelector(`.class${e.target.dataset.index}`)
    thisClassOriginal.querySelector('.colorContainer').style.display = "inline-block";
    thisClassOriginal.querySelector('.createListContainer').style.display = "none";
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
    thisClassOriginal.querySelector('.createListContainer').style.display = "none";

}

const showDelete = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.closeContainer').style.display = "inline-block";
    thisClassOriginal.querySelector('.createListContainer').style.display = "none";
}

const dontShowDelete = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.closeContainer').style.display = "none";
}

const showMakeList = function(e){
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.createListContainer').style.display = "inline-block";
    thisClassOriginal.querySelector('.closeContainer').style.display = "none";
    thisClassOriginal.querySelector('.colorContainer').style.display = "none";
}

const dontShowListText = function (e) {
    let thisClassOriginal = document.querySelector(`.class${currentIndex}`)
    thisClassOriginal.querySelector('.createListContainer').style.display = "none";
}

const createNote = function (note) {
    if (note['title'] != '') {

        notes.push(note);

        localStorage.setItem("notesStorage", JSON.stringify(notes));

        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('data-index', notes.length - 1);
        itemDiv.setAttribute('class', `item  class${notes.length - 1}`)

        let newNotePad = document.createElement('div');
        newNotePad.setAttribute('class', 'user-note-pad')
        newNotePad.setAttribute('data-index', notes.length - 1);

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

        let tabsDiv = document.createElement('div')
        tabsDiv.setAttribute('class', 'tabsDiv')

        let noteTab = document.createElement('span')
        noteTab.setAttribute('class', 'noteTab')
        noteTab.innerText = 'note'
        noteTab.addEventListener('click', noteTabClick)
        noteTab.setAttribute('data-index', notes.length - 1);
        tabsDiv.appendChild(noteTab)

        let listTab = document.createElement('span')
        listTab.setAttribute('class', 'listTab')
        listTab.innerText = 'list';
        listTab.addEventListener('click', listTabClick)
        listTab.setAttribute('data-index', notes.length - 1);
        tabsDiv.appendChild(listTab)

        newNotePad.appendChild(tabsDiv)

        let listForm = document.createElement('form')
        listForm.setAttribute('class', 'todo')

        let listName = document.createElement('input')
        listName.setAttribute('type', 'text')
        listName.setAttribute('class', 'listName')
        listForm.appendChild(listName)

        let listBtn = document.createElement('button')
        listBtn.setAttribute('class', 'createListItem')
        listBtn.addEventListener('click', createListItem)
        listBtn.innerText = '+';
        listForm.appendChild(listBtn)

        let listItems = document.createElement('div')
        listItems.setAttribute('class', 'list')
        listForm.appendChild(listItems)

        newNotePad.appendChild(listForm)

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

        let makeList = document.createElement('span')
        makeList.setAttribute('data-index', notes.length - 1);
        makeList.setAttribute('class', 'makeList')
        makeList.innerHTML = `<i class="fas fa-list-ul"></i>`;
        makeList.addEventListener('mouseover', showMakeList)
        optionsContainer.appendChild(makeList)

        let makeListText = document.createElement('p')
        makeListText.setAttribute('class', 'createListContainer')
        makeListText.setAttribute('data-index', notes.length - 1);
        makeListText.addEventListener('mouseout', dontShowListText)
        makeListText.addEventListener('click', makeListEvent)
        makeListText.innerText = 'Create List';

        itemDiv.appendChild(makeListText);

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

        let closeNote = document.createElement('p')
        closeNote.setAttribute('class', 'closeNote')
        closeNote.addEventListener('click', focusOut)
        closeNote.addEventListener('keydown', focusOut)
        closeNote.innerText = 'Close';
        optionsContainer.appendChild(closeNote)
        itemDiv.appendChild(optionsContainer)

        let theFirstChild = container.firstChild;
        container.insertBefore(itemDiv, theFirstChild);

        if (note['color'] === 'standard') {

            createColor(white, black, darkUnderline, darkOptionsBlur, notes.length - 1)


        } else if (note['color'] === 'red') {

            createColor(black, red, lightUnderline, lightOptionsBlur, notes.length - 1)
        
        } else if (note['color'] === 'green') {
   
            createColor(black, green, lightUnderline, lightOptionsBlur, notes.length - 1)

        } else if (note['color'] === 'blue') {
         
            createColor(black, blue, lightUnderline, lightOptionsBlur, notes.length - 1)

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
        listItems:[],
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
    setTimeout(function () {
    resizeAllGridItems()
    }, 200);
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


