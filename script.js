//////// OPERATIONS VAR //////////
const pushBack = document.querySelector('.pushBack');
const pushFront = document.querySelector('.pushFront');
const popBack = document.querySelector('.popBack');
const popFront = document.querySelector('.popFront');
const peek = document.querySelector('.peek');
const isEmpty = document.querySelector('.isEmpty');
const search = document.querySelector('.search');

//////// POPUPS VAR //////////
const popupList = document.querySelector('.popup-list');
const popupInstruction = document.querySelector('.popup-i')
const popupPeek = document.querySelector('.popup-peek');
const popupPop = document.querySelector('.popup-pop');
const popupIsEmpty = document.querySelector('.popup-isEmpty');

//////// CLOSE BUTTONS VAR //////////
const closeBtn = document.querySelector('.close_btn');
const closeIBtn = document.querySelector('.close-i-btn');
const closePeekBtn = document.querySelector('.close-peek-btn');
const closePopBtn = document.querySelector('.close-pop-btn');
const closeIsEmptyBtn = document.querySelector('.close-isEmpty-btn');

//////// LIST VAR //////////
const listTitle = document.querySelector('.list-title');
const listName = document.querySelector('.list-name');
const listContainer = document.querySelector('.studentlist-container');

//////// OTHER BUTTONS //////////
const doneBtn = document.querySelector('.done-btn');
const instruction = document.querySelector('.circle-i');

//////// PEEK INFOS //////////
const peekIndex = document.querySelector('.peek-index');
const peekName = document.querySelector('.peek-name');
const peekNum = document.querySelector('.peek-num');
const peekBlock = document.querySelector('.peek-block');
const peekGwa = document.querySelector('.peek-gwa');

//////// POPUP MESSAGES //////////
const peekMessage = document.querySelector('.peek-message');
const popMessage = document.querySelector('.pop-message');
const isEmptyMessage = document.querySelector('.isEmpty-message');

let currentIndex = 1;
let currentOperation;

function pushBackList(studentData) {
    const newList = createListElement(studentData);
    listContainer.appendChild(newList);
    updateIndex()
}

function pushFrontList(studentData) {
    const newList = createListElement(studentData);
    listContainer.insertBefore(newList, listContainer.firstChild);
    updateIndex()
}

function popFrontList() {
    const firstList = listContainer.firstElementChild;

    if (firstList) {
        listContainer.removeChild(firstList);
        updateIndex();
    } else {
        updateMessage(popMessage, 'The list is empty. Nothing to pop.')
        changeTitle('popFront')
        popupPop.classList.add('show');
    }
}

function popBackList() {
    const lastList = listContainer.lastElementChild;

    if (lastList) {
        listContainer.removeChild(lastList);
        updateIndex();
    } else {
        updateMessage(popMessage, 'The list is empty. Nothing to pop.')
        changeTitle('popBack')
        popupPop.classList.add('show');
    }
}

function peekList() {
    const firstRecord = listContainer.firstElementChild;

    if(listContainer.childElementCount === 0) {
        updateMessage(peekMessage, 'The list is empty. Nothing to peek.')
        changeTitle('Peek');
        peekIndex.innerHTML = ``;
        peekName.innerHTML = ``;
        peekNum.innerHTML = ``;
        peekBlock.innerHTML = ``;
        peekGwa.innerHTML = ``;
        peekMessage.style.display = 'block'; 
        popupPeek.classList.add('show');
    } else {
        const studentData = extractStudentData(firstRecord);
        displayPeekInfo(studentData);
        popupPeek.classList.add('show');
    }
}

function isEmptyList() {
    if(listContainer.childElementCount === 0) {
        changeTitle('isEmpty');
        updateMessage(isEmptyMessage, 'The list is empty / True.')
        popupIsEmpty.classList.add('show');
    } else {
        changeTitle('isEmpty');
        popupIsEmpty.classList.add('show');
        updateMessage(isEmptyMessage, 'The list is not empty / False.')
    }
}

function extractStudentData(listElement) {
    return {
        index: listElement.querySelector('.student-index').textContent,
        name: listElement.querySelector('.student-name').textContent,
        studentNum: listElement.querySelector('.student-num').textContent,
        block: listElement.querySelector('.student-block').textContent,
        gwa: listElement.querySelector('.student-gwa').textContent
    };
}

function displayPeekInfo(studentData) {
    peekIndex.innerHTML = `<span>Index: </span>${studentData.index}`;
    peekName.innerHTML = `<span>Name: </span>${studentData.name}`;
    peekNum.innerHTML = `<span>Student No.: </span>${studentData.studentNum}`;
    peekBlock.innerHTML = `<span>Block: </span>${studentData.block}`;
    peekGwa.innerHTML = `<span>GWA: </span>${studentData.gwa}`;
    peekMessage.style.display = 'none'; 
}

function updateMessage(element, message) {
    element.textContent = message;
}

function changeTitle(title) {
    const titleElements = document.querySelectorAll('.peek-title, .pop-title, .isEmpty-title');
    titleElements.forEach((element) => {
        element.textContent = title;
    });
}

function updateIndex() {
    const existingLists = document.querySelectorAll('.student-index');
    
    existingLists.forEach((indexElement, index) => {
        indexElement.textContent = (index + 1).toString();
    });

    currentIndex = existingLists.length + 1;
}

function createListElement(studentData) {
    const newList = document.createElement('div');
    newList.classList.add('lists');

    newList.innerHTML = `<li class="student-index">${studentData.index}</li>
                        <li class="student-name">${studentData.name}</li>
                        <li class="student-num">${studentData.studentNum}</li>
                        <li class="student-block">${studentData.block}</li>
                        <li class="student-gwa">${studentData.gwa}</li>`;

    return newList;
}

//////// FOR PUSHBACK AND PUSHFRONT //////////
doneBtn.addEventListener('click', () => {
    const studentData = getStudentData();

    if(!studentData.name || !studentData.studentNum || !studentData.block || !studentData.gwa) {
        alert('Please fill in all fields before submitting.') // needs to be changed
        return;
    }

    if (currentOperation === 'pushBack') {
        studentData.index = currentIndex;
        pushBackList(studentData);
    } else if (currentOperation === 'pushFront') {
        studentData.index = 1; 
        pushFrontList(studentData);
    }

    popupList.classList.remove('show');

    const nameInput = document.querySelector('.list-name');
    const studentNumInput = document.querySelector('.list-no');
    const blockInput = document.querySelector('.list-block');
    const gwaInput = document.querySelector('.list-gwa');

    nameInput.value = '';
    studentNumInput.value = '';
    blockInput.value = '';
    gwaInput.value = '';
});

function getStudentData() {
    const nameInput = document.querySelector('.list-name');
    const studentNumInput = document.querySelector('.list-no');
    const blockInput = document.querySelector('.list-block');
    const gwaInput = document.querySelector('.list-gwa');

    const studentData = {
        index: 1,
        name: nameInput.value,
        studentNum: studentNumInput.value,
        block: blockInput.value,
        gwa: gwaInput.value,
    };

    return studentData;
}

function updateOperationAndTitle(operation) {
    currentOperation = operation;
    listTitle.textContent = `${operation} a Student`;
    popupList.classList.add('show');
}

//////// OPERATIONS EVENT LISTENER //////////
pushBack.addEventListener('click', () => {
    updateOperationAndTitle('pushBack');
    listName.focus();
});
  
pushFront.addEventListener('click', () => {
    updateOperationAndTitle('pushFront');
    listName.focus();
});

popFront.addEventListener('click', () => {
    popFrontList();
});

popBack.addEventListener('click', () => {
    popBackList();
});

peek.addEventListener('click', () => {
    peekList()
})

isEmpty.addEventListener('click', () => {
    isEmptyList();
})

instruction.addEventListener('click', () => {
    popupInstruction.classList.add('show');
})

//////// CLOSE BUTTONS //////////
closeBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('.list-name');
    const studentNumInput = document.querySelector('.list-no');
    const blockInput = document.querySelector('.list-block');
    const gwaInput = document.querySelector('.list-gwa');

    nameInput.value = '';
    studentNumInput.value = '';
    blockInput.value = '';
    gwaInput.value = '';
    
    popupList.classList.remove('show');
});

closeIBtn.addEventListener('click', () => {
    popupInstruction.classList.remove('show');
})

closePeekBtn.addEventListener('click', () => {
    popupPeek.classList.remove('show');
})

closePopBtn.addEventListener('click', () => {
    popupPop.classList.remove('show');
})

closeIsEmptyBtn.addEventListener('click', () => {
    popupIsEmpty.classList.remove('show');
})
