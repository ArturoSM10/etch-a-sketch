createDivs();
formEvents();
// sliderRange();
/*colocar grid y btn */
let backgroundColor;
let divColor;
let sliderValue;
let angle = 0;
function formEvents () {
    const formAction = document.querySelector(`.aside__form`);

    const colorPicker = document.querySelector(`.bg-input`);
    const colorDiv = document.querySelector(`.mouse-input`);
    const slider = document.querySelector(`.slider`);
    const bg = document.querySelector(`.div-container`);

    formAction.addEventListener(`click`, (e)=>{
        if (e.target && e.target.tagName === `BUTTON`) {
            e.preventDefault();
            /*agregar eventos a botones agregar btn aleatorio*/
        }
    });

    formAction.addEventListener(`input`, (e)=> {
        if (e.target && e.target.tagName === `INPUT`) {
            /*agregar eventos a inputs y colocar los valores por defecto ademas de enlazar a los divs por el background */
            backgroundColor = colorPicker.value;
            colorD = colorDiv.value;
            bg.style.backgroundColor = color;
        }
    });
    return;
}

function createDivs() {
    /*dejarlo en funcion de los colores y los div que se crearan con el slider max 100 */
    const pixels = document.querySelector(`.div-container`);
    pixels.style.gridTemplateRows = `repeat(4, 1fr)`
    pixels.style.gridTemplateColumns = `repeat(4, 1fr)`
    for (let j = 0; j<= (4*4)-1; j++) {
        const divs = document.createElement(`div`);
        divs.className = `div-inside`;
        pixels.appendChild(divs);
    }
    const colores = document.querySelector(".div-container");
    let valorDeX= colores.getBoundingClientRect().left;
    let valorDeY= colores.getBoundingClientRect().top;
    colores.addEventListener(`mousemove`,(e) => {
        if (e.target && e.target.tagName === `DIV`) {
            const leftBtn = document.querySelector(`.left-circle`);
            const rightBtn = document.querySelector(`.right-circle`);
            leftBtn.style.transform = `rotateZ(${((e.clientX-valorDeX)*360)/291}deg)`;
            console.log(`${-((e.clientX-valorDeX)*360)/291}`)
            rightBtn.style.transform = `rotateZ(${-((e.clientY-valorDeY)*360)/291}deg)`;
            e.target.style.backgroundColor = `black`;
            /*colocar operacion a angles*/
        }
        return angles;
    });
}

// function sliderRange() {
//     const odinSlider = document.querySelector(`.slider`);
//     console.log(odinSlider)
//     const selector = document.querySelector(`.select-btn`);
//     console.log(selector)
//     selector.addEventListener(`input`, (e) =>{

//     });
// }