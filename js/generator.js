// if I give createElement(elements, appendChild) , it will automatically create the dom with the provided json(elements)
// and append that dom to the appendChild html element




export function createHtmlPage(elements) {
  const arr = [];
  elements.forEach((element) => {
    if(!element.tag) return;
    const tag = document.createElement(element.tag);
    if (element.class) {
      element.class.split(" ").forEach((cls) => {
        tag.classList.add(`${cls}`);
      });
    }
    
    tag.textContent = element.text;
    addingStyle(element, tag);
    if (element.children) {
      const childArr = createHtmlPage(element.children);
      childArr.forEach((childTag) => {
        tag.appendChild(childTag);
      }); 
    }
    if (element.attributes) {
      for (const i in element.attributes) {
        tag.setAttribute(`${i}`, `${element.attributes[i]}`);
      }
    }
    for (const i in element) {
      if (
        !(
          i === "tag" ||
          i === "class" ||
          i === "text" ||
          i === "children" ||
          i === "style" ||
          i === "attributes"
        )
      ) {
        tag.setAttribute(`${i}`, `${element[i]}`);
      }
    }
    arr.push(tag);
  });
  return arr;
}

function addingStyle(element, tag) {
  for (const style in element.style) {
    tag.style[style] = element.style[style];
  }
}

export function createElement(elements, appendElement) {
  const arr = createHtmlPage(elements);

  if(appendElement === null) {
    return arr;
  }
  arr.forEach((ele) => {
    appendElement.appendChild(ele);
  });
  return arr;
}




//down this is the json format for the createHtmlPage
const jsonBlueprnit = [
  {
    "tag": "string", 
    "class": "string (optional, list of classes separated by spaces)", 
    "style": "string (optional, inline styles)", 
    "attributes": { 
      "attributeKey": "attributeValue (optional)" 
    },
    "text": "string (optional, inner text for the element)", 
    "children": [ 
      {
        "tag": "string", 
        "class": "string (optional, nested classes)", 
        "style": "string (optional)", 
        "attributes": { 
          "attributeKey": "attributeValue (optional)" 
        },
        "text": "string (optional, text content for nested element)", 
        "children": [] 
      }
    ]
  }
]




