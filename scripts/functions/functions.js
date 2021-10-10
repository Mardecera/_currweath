function isEmpty(arrayElement = []) {
    if (typeof arrayElement.length === 'number') {
        return !!!arrayElement.length
    } else{ return false }
}

function createElementHTML({ type = 'div', classes = [], textContent = '', value = '', src = ''} = {}) {
    const element = document.createElement(type)
    
    if (type === 'option') { element.value = value }
    if (type === 'img'){ element.src = src }
    
    classes.forEach(class_ => { element.classList.add(class_) })
    element.textContent = textContent
    return element
}

export { isEmpty, createElementHTML }