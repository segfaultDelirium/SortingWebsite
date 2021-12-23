
let containers: HTMLDivElement[] = []
let N: number = 10

updateContainersAmount(N);
setInitialHeight(containers);
// printHeights(containers)

let sleepTimeSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("sleepTimeSlider");
let sleepTimeText = document.getElementById("sleepTimeText");
sleepTimeSlider!.oninput = function() {
    sleepTimeText!.innerHTML = sleepTimeSlider.value;
}
sleepTimeText!.innerHTML = sleepTimeSlider.value; // Display the default slider value

let containersAmountSlider: HTMLInputElement = <HTMLInputElement>document.getElementById('containers-amount-slider');
let containersAmountText = document.getElementById('containers-amount');
containersAmountSlider!.oninput = function(){
    containersAmountText!.innerHTML = containersAmountSlider.value;
    N = parseInt(containersAmountSlider.value);
    updateContainersAmount(N);
    setInitialHeight(containers);
    let sleeptime = parseInt(sleepTimeText!.innerHTML);
    setTransitionTime(containers, sleeptime/2.0);
}
containersAmountText!.innerHTML = containersAmountSlider.value;

type sortTypes = "bubble" | "insert" | "quick";

const startButton = <HTMLButtonElement>document.querySelector("#start-btn");
let stopFlag = false;
startButton.addEventListener('click', () =>{
    const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="sort-type"]');
    let selectedSort: sortTypes = <sortTypes>radioButtons[0].value;
    for(const rb of radioButtons){
        if(rb.checked){
            selectedSort = <sortTypes>rb.value;
            break;
        }
    }
    const currentSortType = document.getElementById('selected-sorting-algorithm');
    currentSortType!.innerHTML = selectedSort;
    if( !startButton.classList.contains('started')){
        startButton.innerText = "stop!";
        startButton.classList.add('started');
        let sleeptime = parseInt(sleepTimeText!.innerHTML);
        setTransitionTime(containers, sleeptime/2.0);
        switch(selectedSort){
            case "bubble": bubbleSort(containers, sleeptime); break;
            case "insert": insertSort(containers, sleeptime); break;
            case "quick": quickSort(containers, sleeptime); break;
        }
        updateHeight(containers);
    }else{
        stopFlag = true;
    }
});



let resetButton = document.querySelector("#reset-btn");
resetButton!.addEventListener('click', () => {
    setInitialHeight(containers);
})

function updateContainersAmount(N: number){
    let sortingContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('sorting-container');
    let childrenAmount = sortingContainer.children.length;
    // console.log('childrenAmount = ' + childrenAmount + " N = " + N);
    if(childrenAmount < N){
        // console.log(childrenAmount + '< N' + " N = " + N);
        for(let i = childrenAmount+1; i <= N; i++){
            // console.log(sortingContainer.innerHTML)
            sortingContainer.innerHTML += `<div class="container" id="container${i}" ></div>\n`;
        }
    }else if(childrenAmount > N){
        // console.log(childrenAmount + '> N' + " N = " + N);
        let diff = childrenAmount - N;
        for(let i = 0; i < diff; i++){
            // console.log(sortingContainer.lastElementChild);
            sortingContainer.removeChild(sortingContainer.lastElementChild!);
        }
    }

    let sortingContainerChildren = sortingContainer.children;
    containers = [];
    for(let i = 0; i < sortingContainerChildren.length; i++){
        containers.push(<HTMLDivElement>sortingContainerChildren[i]);
    }

    // childrenAmount = sortingContainer.children.length;
    // console.log('childrenAmount = ' + childrenAmount + " N = " + N);
    // console.log(containers.length);

    let vw = window.innerWidth;
    for( let i = 0; i < containers.length; i++){
        containers[i].style.setProperty('width', ((vw)/N) - 3.3 + "px" );
        // console.log(containers[i].style.width);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printHeights(containers: HTMLDivElement[]){
    let logString = "";
    for( let i = 0; i < containers.length; i++){
        logString += containers[i].innerText + ", ";
    }
    console.log(logString)
}

function updateHeight(containers: HTMLDivElement[]){
    console.log('update')
    for( let i = 0; i < containers.length; i++){
        containers[i].style.setProperty('height', containers[i].innerText + "px" );
    }
}

function setInitialHeight(containers: HTMLDivElement[]){
    // console.log('inSetInitialHeight');
    // console.log(containers.length);
    for(let i = 1; i <= containers.length; i++){
        const id = "#container" + i
        // console.log("id = " + id);
        const container = <HTMLDivElement>document.querySelector(id);
        container.innerText = Math.floor(Math.random() * 600) + 10 + "";
        const height = container.innerText + "px";
        container.style.setProperty('height', height );
    }
    // console.log('inSetInitialHeight end')
}

function swapInnerText(container1: HTMLDivElement, container2: HTMLDivElement){
    const temp = container1.innerText;
    container1.innerText = container2.innerText;
    container2.innerText = temp;
}

function setTransitionTime(containers: HTMLDivElement[], transitionTime: number){
    for( let i = 0; i < containers.length; i++){
        containers[i].style.setProperty('transition', transitionTime/1000.0 + 's cubic-bezier(0.39, 0.575, 0.565, 1)');
    }
}

function setProgress(isInProgress: boolean){
    const status = <HTMLDivElement>document.querySelector("#status")
    if(isInProgress){
        status.innerText = "in progress";
        status.style.color = 'red';
        status.style.background = 'silver';
    }else{
        status.innerText = "Done!";
        status.style.color = 'yellowgreen';
        status.style.background = 'black';
    }
}

function isContainer1Smaller(container1: HTMLDivElement, container2: HTMLDivElement){
    let val1: number = parseInt(container1.innerText);
    let val2: number = parseInt(container2.innerText);
    // console.log(val1)
    // console.log(val2)
    // console.log()
    return val1 < val2;
}
