// We want to type somethng in and add it.
// a "submit" event on the form
// the ability to delete items
// filter and find items on list.

// ASSIGN DOM ELEMENTS TO VARIABLES
const form = document.querySelector('#addForm');
const itemList = document.querySelector('#items');
const filter = document.querySelector('#filter');

// console.log(form);
// console.log(items);

// ADD EVENT LISTENERS
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
filter.addEventListener('keyup', filterItems);

// CREATE FUNCTIONS FOR EACH EVENT
// add item
function addItem(e) {
    e.preventDefault();
    // get input VALUE
    const newItem = document.querySelector('#item').value;

    // create new li element with same classes
    const li = document.createElement('li');
    li.className = 'list-group-item';
    // console.log(li);
    // add text node with input value
    li.appendChild(document.createTextNode(newItem));

    // Create delete button element
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // append text node to button
    deleteBtn.appendChild(document.createTextNode('X'));
    // append button to the li element
    li.appendChild(deleteBtn);

    // add our completed li element to parent itemList
    itemList.appendChild(li);
}
// and test it: add Hello to input field; should see new li with delete button in Items area

// tried an ES6 const addItem, got "cannot access 'addItem' before initialization", look at docs - same happened with removeItem
// let and const doesn't 'hoist'

// remove an item from the Items list
function removeItem(e) {
    // test
    // console.log(1);
    // responds to a click ANYWHERE in li element, not what we want: only on the red X
    // use IF statement to target red X delete button
    if (e.target.classList.contains('delete')) {
        // ask user to confirm deletion
        if (confirm('Are you sure?')) {
            const li = e.target.parentElement;
            // our target is the button, li is its parent
            itemList.removeChild(li);
            // remove li from the ul itemList
        }
    }
}
// don't forget to test by clicking on red X

// Filter items
function filterItems(e) {
    // convert input text to lowercase
    const text = e.target.value.toLowerCase();
    // console.log(text);
    // assign all li elements to var items
    
    // const items = document.getElementsByTagName('li');
    
    // console.log(items);

    // ==============================
    // This is what i found by using querySelectorAll, returns nodelist, gets itemName from item.firstChild.data, that's DATA not textContent - NO, WORKS FOR BOTH OK
    // just choose one way to assign, prefer to keep it consistent querySelector/querySelectorAll at the mo
    const items = document.querySelectorAll('li');
    // console.log(items);
    // querySelectorAll returns a NodeList; (need an HTMLCollection, so get by tag:) - do we?? Not Really, see above

    Array.from(items).forEach(function(item){
        const itemName = item.firstChild.textContent;

        // compare input to items:
        if (itemName.toLowerCase().indexOf(text)!=-1){
            item.style.display = 'block';
        } else {
            item.style.display = "none";
        }

        console.log(itemName);
    })
    // =======================================

    
}