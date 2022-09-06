let colorHex = [0,0,0];
let rangeValue = 4;
let state = ``;
let colors =[`#fff`,`#000`];

colors=formEvents();
createDivs();
painting();
let a = hexToRgb(`#b141fb`);
console.log(a)

colors[1].to
function formEvents () {
    const formAction = document.querySelector(`.aside__form`);
    const background = document.querySelector(`.div-container`);
    const arrayColor = [`#fff`,`#000`];

    formAction.addEventListener(`click`, (e)=>{
        if (e.target && e.target.tagName === `BUTTON`) {
            e.preventDefault();
            switch (e.target.className) {
                case `random`:
                    state = `random`;
                break;
                case `clc`:
                    background.innerHTML = "";
                    createDivs();
                break;
                case `dark`:
                    state = `dark`;
                break;
            }
        }
    });
    formAction.addEventListener(`input`, (e)=> {
        if (e.target && e.target.tagName === `INPUT`) {
            switch (e.target.className) {
                case `bg-input`:
                    arrayColor[0]= e.target.value;
                    background.style.backgroundColor = `${e.target.value}`;
                break;
                case `slider`:
                    const textValue = document.querySelector(`.range__value`);
                    rangeValue = e.target.value;
                    textValue.textContent=rangeValue;
                break;
            }
        }
    });
    formAction.addEventListener(`change`, (e)=> {
        if (e.target && e.target.tagName ===`INPUT`) {
            switch (e.target.className) {
                case `slider`:
                    background.innerHTML = "";
                    createDivs();
                break;
                case `mouse-input`:
                    state = `mouse color`
                    arrayColor[1]= e.target.value;
                break;
            }
        }
    });
    return arrayColor;
}

function createDivs() {
    const background = document.querySelector(`.div-container`);
    background.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`
    background.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`
    for (let i = 0; i < Math.pow(rangeValue,2); i++) {
        const divs = document.createElement(`div`);
        divs.className = `div-inside`;
        background.appendChild(divs);
    }
}

function painting() {
    const background = document.querySelector(".div-container");
    const leftBtn = document.querySelector(`.left-circle`);
    const rightBtn = document.querySelector(`.right-circle`);
    const xValue = background.getBoundingClientRect().left;
    const yValue = background.getBoundingClientRect().top;

    background.addEventListener(`mouseover`,(e) => {
        if (e.target && e.target.className === `div-inside`) {
            leftBtn.style.transform = `rotateZ(${((e.clientX - xValue)*360)/background.getBoundingClientRect().width}deg)`;
            rightBtn.style.transform = `rotateZ(${((e.clientY - yValue)*360)/background.getBoundingClientRect().width}deg)`;
            if (state === `random`) {
                colorHex[0] = Math.floor(Math.random()*255);
                colorHex[1] = Math.floor(Math.random()*255);
                colorHex[2] = Math.floor(Math.random()*255);
                e.target.style.backgroundColor = `rgb(${colorHex[0]},${colorHex[1]},${colorHex[2]})`;
            }
            else if (state === `dark`) {
                let rgbColor = []
                if (e.target.style.backgroundColor.includes === `#`) {
                    switch (e.target.style.backgroundColor) {
                        case ``:
                            rgbColor =hexToRgb(`#ffffff`);
                        break;
                        default:
                            rgbColor = hexToRgb(`${e.target.style.backgroundColor}`);
                        break;
                    }
                }
                else if (e.target.style.backgroundColor.includes === `rgb`){
                    console.log(`ejecuto rgb`)
                    rgbColor = e.target.style.backgroundColor;
                    rgbColor=rgbColor.split(`rgb`, 2);
                    rgbColor =rgbColor[1].split (`,`, 3);
                    console.log(rgbColor)
                    rgbColor =[rgbColor[0] -= 17, rgbColor[1] -= 17, rgbColor[3] -= 17]
                    if (rgbColor[0] < 0 || rgbColor[1] < 0 || rgbColor[2] < 0) {
                        rgbColor = [0,0,0];
                    }
                    e.target.style.backgroundColor= `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
                }
                else {
                    console.log(e.target.style.backgroundColor)
                }
                e.target.style.backgroundColor= `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
            }

            else {
                e.target.style.backgroundColor = `${colors[1]}`;
            }
        }
    });
}

function hexToRgb(hexColor) {
    hexColor = hexColor.split(`#`,2);
    console.log(hexColor[1])
    let rgbString = [];
    for (let i = 0; i < 6; i += 2) {
        rgbString.push(parseInt(`${hexColor[1][i]}${hexColor[1][i+1]}`,16));
    }
    return  rgbString;
}