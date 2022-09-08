let colorHex = [0,0,0];
let rangeValue = 4;
let state = ``;
let colors =[`#fff`,`#000`];

colors=formEvents();
createDivs();
painting();

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
        divs.id = `0`;
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
                e.target.id = 0;
                colorHex[0] = Math.floor(Math.random()*255);
                colorHex[1] = Math.floor(Math.random()*255);
                colorHex[2] = Math.floor(Math.random()*255);
                e.target.style.backgroundColor = `rgb(${colorHex[0]},${colorHex[1]},${colorHex[2]})`;
            }
            else if (state === `dark`) {
                let rgbColor = [];
                let iteration = parseInt(e.target.id,10);
                if (e.target.style.backgroundColor === ``) {
                    rgbColor =hexToRgb(`#FFFFFF`);
                    e.target.style.backgroundColor = `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
                }
                else {
                    rgbColor = e.target.style.backgroundColor;
                    rgbColor=rgbColor.slice(4, -1);
                    rgbColor = rgbColor.split(`,`,3);
                    switch (iteration) {
                        case 10:
                            rgbColor = [0,0,0];
                        break;
                        default:
                            rgbColor[0] = parseInt(rgbColor[0],10) - parseInt(rgbColor[0],10)/(10-iteration);
                            rgbColor[1] = parseInt(rgbColor[1],10) - parseInt(rgbColor[1],10)/(10-iteration);
                            rgbColor[2] = parseInt(rgbColor[2],10) - parseInt(rgbColor[2],10)/(10-iteration);
                            e.target.id = (iteration +=1);
                        break;

                    }
                }
                e.target.style.backgroundColor= `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
            }

            else {
                e.target.id = 0;
                e.target.style.backgroundColor = `${colors[1]}`;
            }
        }
    });
}

function hexToRgb(hexColor) {
    hexColor = hexColor.split(`#`,2);
    let rgbString = [];
    for (let i = 0; i < 6; i += 2) {
        rgbString.push(parseInt(`${hexColor[1][i]}${hexColor[1][i+1]}`,16));
    }
    return  rgbString;
}