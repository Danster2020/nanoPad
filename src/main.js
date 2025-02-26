const { invoke } = window.__TAURI__.core;

const line_rows_el = document.getElementById("line_rows")
const text_area_el = document.getElementById('text_area');

async function setTextRows() {
  // text_area_el.textContent.trim() // removes double \n characters
  // text_area_el.textContent.replace(/\n+/g, "\n");

  const el_height = getElementHeight(text_area_el);
  console.log("el_height", el_height);

  const el_text = await invoke("calc_text_rows", { height: el_height })
  console.log("test:", el_text);
  line_rows_el.textContent = el_text;
}

text_area_el.addEventListener('DOMSubtreeModified', contentChanged, false);

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  contentChanged()
};

const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(callback);
observer.observe(text_area_el, config);



function contentChanged() {
  setTextRows()

  // console.log("lineHeight", calculateLineHeight(text_area_el));
  // console.log("el height", getElementHeight(text_area_el));
}

// run on startup
setTextRows()

// function calculateLineHeight(element) {

//   var lineHeight = parseInt(getComputedStyle(element, 'line-height'), 10);
//   var clone;
//   var singleLineHeight;
//   var doubleLineHeight;

//   if (isNaN(lineHeight)) {
//     clone = element.cloneNode();
//     clone.innerHTML = '<br>';
//     element.appendChild(clone);
//     singleLineHeight = clone.offsetHeight;
//     clone.innerHTML = '<br><br>';
//     doubleLineHeight = clone.offsetHeight;
//     element.removeChild(clone);
//     lineHeight = doubleLineHeight - singleLineHeight;
//   }

//   return lineHeight;
// }

function getElementHeight(element) {
  let computedStyle = getComputedStyle(element);

  let elementHeight = element.clientHeight;  // height with padding
  elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

  return elementHeight;
}




