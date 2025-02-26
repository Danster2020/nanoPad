const { invoke } = window.__TAURI__.core;
// const { open } = window.__TAURI__.dialog;
const { save } = window.__TAURI__.dialog;
const { Menu } = window.__TAURI__.menu;

const line_rows_el = document.getElementById("line_rows")
const text_area_el = document.getElementById('text_area');


function getElementHeight(element) {
  let computedStyle = getComputedStyle(element);

  let elementHeight = element.clientHeight;  // height with padding
  elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

  return elementHeight;
}


async function setTextRows() {
  const el_height = getElementHeight(text_area_el);
  console.log("el_height", el_height);

  const el_text = await invoke("calc_text_rows", { height: el_height })
  console.log("test:", el_text);
  line_rows_el.textContent = el_text;
}

function contentChanged() {
  setTextRows()
}

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  contentChanged()
};

function onMainContainerClick() {
  console.log("click");

  text_area_el.focus()
}


async function saveFile() {
  // const filePath = await save({
  //   filters: [
  //     {
  //       name: 'My Filter',
  //       extensions: ['txt', 'png', 'jpeg'],
  //     },
  //   ],
  // });
  // console.log('File path:', filePath);

  // const file = await create('bar.txt', { baseDir: "Downloads" });
  // await file.write(new TextEncoder().encode('Hello world'));
  // await file.close();
}

const menu = await Menu.new({
  items: [
    {
      id: 'save',
      text: 'Save',
      action: () => {
        console.log('save pressed');
        saveFile()
      },
    },
  ],
});

// If a window was not created with an explicit menu or had one set explicitly,
// this menu will be assigned to it.
menu.setAsAppMenu().then((res) => {
  console.log('menu set success', res);
});

function main() {
  const config = { attributes: true, childList: true, subtree: true, characterData: true };
  const text_area_observer = new MutationObserver(callback);
  text_area_observer.observe(text_area_el, config);

  document.getElementById("main_container").addEventListener("click", onMainContainerClick);


  // run once on startup
  setTextRows()
  text_area_el.focus()


}




main()

