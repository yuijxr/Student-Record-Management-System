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
const popupSearch = document.querySelector('.popup-search');

//////// CLOSE BUTTONS VAR //////////
const closeBtn = document.querySelector('.close_btn');
const closeIBtn = document.querySelector('.close-i-btn');
const closePeekBtn = document.querySelector('.close-peek-btn');
const closePopBtn = document.querySelector('.close-pop-btn');
const closeIsEmptyBtn = document.querySelector('.close-isEmpty-btn');
const closeSearchBtn = document.querySelector('.close-search-btn')

//////// LIST VAR //////////
const listTitle = document.querySelector('.list-title');
const listName = document.querySelector('.list-name');
const listContainer = document.querySelector('.studentlist-container');

//////// OTHER BUTTONS //////////
const doneBtn = document.querySelector('.done-btn');
const searchBtn = document.querySelector('.search-btn');
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
const searchMessage = document.querySelector('.search-message');

let currentIndex = 1;
let currentOperation;

class Node {
    constructor(studentData) {
        this.studentData = studentData;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(studentData) {
        const newNode = new Node(studentData);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    prepend(studentData) {
        const newNode = new Node(studentData);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    removeFirst() {
        if (!this.head) {
            return null;
        }
        const removedNode = this.head;
        this.head = this.head.next;
        this.size--;
        return removedNode.studentData;
    }

    removeLast() {
        if (!this.head) {
            return null;
        }

        let current = this.head;
        let previous = null;

        while (current.next) {
            previous = current;
            current = current.next;
        }

        if (previous) {
            previous.next = null;
            this.tail = previous;
        } else {
            this.head = null;
            this.tail = null;
        }

        this.size--;
        return current.studentData;
    }

    getFirst() {
        return this.head ? this.head.studentData : null;
    }

    isEmpty() {
        return this.size === 0;
    }
}

const linkedList = new LinkedList();

function pushBackList(studentData) {
    linkedList.append(studentData);
    updateIndex();
    renderList();
}

function pushFrontList(studentData) {
    linkedList.prepend(studentData);
    updateIndex();
    renderList();
}

function popFrontList() {
    const removedStudentData = linkedList.removeFirst();
    if (removedStudentData === null) {
        updateMessage(popMessage, 'The list is empty. Nothing to pop.');
        changeTitle('popFront');
        popupPop.classList.add('show');
    } else {
        updateIndex();
        renderList();
    }
}

function popBackList() {
    const removedStudentData = linkedList.removeLast();
    if (removedStudentData === null) {
        updateMessage(popMessage, 'The list is empty. Nothing to pop.');
        changeTitle('popBack');
        popupPop.classList.add('show');
    } else {
        updateIndex();
        renderList();
    }
}

function peekList() {
    const studentData = linkedList.getFirst();
    if (studentData === null) {
        updateMessage(peekMessage, 'The list is empty. Nothing to peek.');
        changeTitle('Peek');
        peekIndex.innerHTML = ``;
        peekName.innerHTML = ``;
        peekNum.innerHTML = ``;
        peekBlock.innerHTML = ``;
        peekGwa.innerHTML = ``;
        peekMessage.style.display = 'block';
        popupPeek.classList.add('show');
    } else {
        displayPeekInfo(studentData);
        popupPeek.classList.add('show');
    }
}

function searchList() {
    changeTitle('Search');
    popupSearch.classList.add('show');

    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        const studentNumToSearch = searchInput.value;

        if (studentNumToSearch === '') {
            updateMessage(searchMessage, 'Please enter the student number.');
            return;
        }

        const index = searchStudentList(studentNumToSearch);

        if (index !== -1) {
            updateMessage(searchMessage, `Student found at index ${index + 1}.`);
        } else {
            updateMessage(searchMessage, 'Student not found in the list.');
        }
    });

    closeSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        updateMessage(searchMessage, '');
    });
}

function searchStudentList(studentNum) {
    let current = linkedList.head;
    let index = 0;
    while (current) {
        if (current.studentData.studentNum === studentNum) {
            return index;
        }
        current = current.next;
        index++;
    }
    return -1;
}

function isEmptyList() {
    if (linkedList.isEmpty()) {
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
        index: listElement.studentData.index,
        name: listElement.studentData.name,
        studentNum: listElement.studentData.studentNum,
        block: listElement.studentData.block,
        gwa: listElement.studentData.gwa
    };
}

function displayPeekInfo(studentData) {
    if (studentData === null) {
        peekIndex.innerHTML = `<span>Index: </span>`;
        peekName.innerHTML = `<span>Name: </span>`;
        peekNum.innerHTML = `<span>Student No.: </span>`;
        peekBlock.innerHTML = `<span>Block: </span>`;
        peekGwa.innerHTML = `<span>GWA: </span>`;
        peekMessage.style.display = 'block';
    } else {
        peekIndex.innerHTML = `<span>Index: </span>${studentData.index}`;
        peekName.innerHTML = `<span>Name: </span>${studentData.name}`;
        peekNum.innerHTML = `<span>Student No.: </span>${studentData.studentNum}`;
        peekBlock.innerHTML = `<span>Block: </span>${studentData.block}`;
        peekGwa.innerHTML = `<span>GWA: </span>${studentData.gwa}`;
        peekMessage.style.display = 'none';
    }
}

function updateMessage(element, message) {
    element.textContent = message;
}

function changeTitle(title) {
    const titleElements = document.querySelectorAll('.peek-title, .pop-title, .isEmpty-title, .search-title');
    titleElements.forEach((element) => {
        element.textContent = title;
    });
}

function updateIndex() {
    let current = linkedList.head;
    let index = 1;
    while (current) {
        current.studentData.index = index;
        current = current.next;
        index++;
    }
    currentIndex = index;
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

function renderList() {
    listContainer.innerHTML = '';
  
    let current = linkedList.head;
    while (current) {
      const studentData = current.studentData;
      const newList = createListElement(studentData);
      listContainer.appendChild(newList);
      current = current.next;
    }
}

//////// FOR PUSHBACK AND PUSHFRONT //////////
doneBtn.addEventListener('click', () => {
    const studentData = getStudentData();

    if (!studentData.name || !studentData.studentNum || !studentData.block || !studentData.gwa) {
        alert('Please fill in all fields before submitting.');
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
});

isEmpty.addEventListener('click', () => {
    isEmptyList();
});

search.addEventListener('click', () => {
    const searchName = document.querySelector('.search-name');
    searchList();
    searchName.focus();
});

instruction.addEventListener('click', () => {
    popupInstruction.classList.add('show');
});

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
});

closePeekBtn.addEventListener('click', () => {
    popupPeek.classList.remove('show');
});

closePopBtn.addEventListener('click', () => {
    popupPop.classList.remove('show');
});

closeIsEmptyBtn.addEventListener('click', () => {
    popupIsEmpty.classList.remove('show');
});

closeSearchBtn.addEventListener('click', () => {
    popupSearch.classList.remove('show');
});
