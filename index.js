let listContainer = document.getElementById("main")
listContainer.classList.add('con')

let addItem = document.getElementById('addBtn')

let saveBtn = document.getElementById("saveBtn")


saveBtn.onclick = function(){
    localStorage.setItem('list', JSON.stringify(ListItems)) 
    
}


function getParsedList (){
    let savedData = localStorage.getItem("list")
    let parsedList = JSON.parse(savedData)
    console.log(parsedList)
    if(parsedList === null){
        ListItems = []
    }else{
        ListItems = parsedList
    }
   
}

getParsedList()


function lineStricking(checkboxId, lableId, itemId){
    let check = document.getElementById(checkboxId)
    let laaa = document.getElementById(lableId)
    
    console.log(laaa)

    laaa.classList.toggle('strick')

    let indexI = ListItems.findIndex(function(eachI){
        let idd = 'item' + eachI.id
        if(idd === itemId){
            return true
        }else{
            return false
        }
    })

    let wanted = ListItems[indexI]
    if(wanted.isChecked === true){
        wanted.isChecked = false
    }else{
        wanted.isChecked = true
    }
    
}

function deleteingItem(itemId){
    
    let dd = document.getElementById(itemId)
    console.log(dd)
    listContainer.removeChild(dd)
    let delItem = ListItems.findIndex(function(eachI){
        let iid = "item" + eachI.id
        if(iid === itemId){
            return true
        }else{
            return false
        }
    })
    console.log(delItem)
    ListItems.splice(delItem, 1)
}

function creatingTodo(Items){
    let checkboxId = "che" + Items.id
    let lableId = 'lab'+ Items.id
    let itemId = "item" + Items.id
   
    let listElement = document.createElement('li')
    listElement.id = itemId
    listElement.classList.add('con')
    listContainer.appendChild(listElement)
    
    let checkboxElement = document.createElement('input')
    checkboxElement.type = 'checkbox'
    checkboxElement.id = checkboxId
    checkboxElement.checked = Items.isChecked

    listElement.appendChild(checkboxElement)

    checkboxElement.onclick = function(){
        lineStricking(checkboxId, lableId, itemId)
    }
    
    let lableContainer = document.createElement('div')
    listElement.appendChild(lableContainer)

    let lableElement = document.createElement('label')
    lableElement.id = lableId
    lableElement.textContent = Items.text
    lableElement.setAttribute('for', checkboxId)

    if(checkboxElement.checked === true){
        lableElement.classList.add("strick")
    }else{

        lableElement.classList.remove('strick')
    }
    
    lableContainer.appendChild(lableElement)
    
    let delBtn = document.createElement('button')
    delBtn.textContent = "D"
    listElement.appendChild(delBtn)

    delBtn.onclick = function(){
        deleteingItem(itemId)
    }
    
}

addItem.onclick = function(){
    let inputEl = document.getElementById('inpuuuu')
    let value = inputEl.value
    let inputId = ListItems.length + 1
    if(value === ""){
        alert("please")
        return;
    }
 
    let newList = {
     text: value,
     id : inputId,
     isChecked: false
     
    }

    ListItems.push(newList)
  
    creatingTodo(newList)
    inputEl.value = ""
 
 }

for(let Items of ListItems){
    creatingTodo(Items)
}