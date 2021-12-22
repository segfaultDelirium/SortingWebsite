"use strict";
let containers = [];
let N = 10;
updateContainersAmount(N);
setInitialHeight(containers);
// printHeights(containers)
let sleepTimeSlider = document.getElementById("sleepTimeSlider");
let sleepTimeText = document.getElementById("sleepTimeText");
sleepTimeSlider.oninput = function () {
    sleepTimeText.innerHTML = sleepTimeSlider.value;
};
sleepTimeText.innerHTML = sleepTimeSlider.value; // Display the default slider value
let containersAmountSlider = document.getElementById('containers-amount-slider');
let containersAmountText = document.getElementById('containers-amount');
containersAmountSlider.oninput = function () {
    containersAmountText.innerHTML = containersAmountSlider.value;
    N = parseInt(containersAmountSlider.value);
    updateContainersAmount(N);
    setInitialHeight(containers);
    let sleeptime = parseInt(sleepTimeText.innerHTML);
    setTransitionTime(containers, sleeptime / 2.0);
};
containersAmountText.innerHTML = containersAmountSlider.value;
let resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener('click', () => {
    setInitialHeight(containers);
});
function updateContainersAmount(N) {
    let sortingContainer = document.getElementById('sorting-container');
    let childrenAmount = sortingContainer.children.length;
    // console.log('childrenAmount = ' + childrenAmount + " N = " + N);
    if (childrenAmount < N) {
        // console.log(childrenAmount + '< N' + " N = " + N);
        for (let i = childrenAmount + 1; i <= N; i++) {
            // console.log(sortingContainer.innerHTML)
            sortingContainer.innerHTML += `<div class="container" id="container${i}" ></div>\n`;
        }
    }
    else if (childrenAmount > N) {
        // console.log(childrenAmount + '> N' + " N = " + N);
        let diff = childrenAmount - N;
        for (let i = 0; i < diff; i++) {
            // console.log(sortingContainer.lastElementChild);
            sortingContainer.removeChild(sortingContainer.lastElementChild);
        }
    }
    let sortingContainerChildren = sortingContainer.children;
    containers = [];
    for (let i = 0; i < sortingContainerChildren.length; i++) {
        containers.push(sortingContainerChildren[i]);
    }
    // childrenAmount = sortingContainer.children.length;
    // console.log('childrenAmount = ' + childrenAmount + " N = " + N);
    // console.log(containers.length);
    let vw = window.innerWidth;
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.setProperty('width', ((vw) / N) - 3.3 + "px");
        // console.log(containers[i].style.width);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function printHeights(containers) {
    let logString = "";
    for (let i = 0; i < containers.length; i++) {
        logString += containers[i].innerText + ", ";
    }
    console.log(logString);
}
function updateHeight(containers) {
    console.log('update');
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.setProperty('height', containers[i].innerText + "px");
    }
}
function setInitialHeight(containers) {
    // console.log('inSetInitialHeight');
    // console.log(containers.length);
    for (let i = 1; i <= containers.length; i++) {
        const id = "#container" + i;
        // console.log("id = " + id);
        const container = document.querySelector(id);
        container.innerText = Math.floor(Math.random() * 600) + 10 + "";
        const height = container.innerText + "px";
        container.style.setProperty('height', height);
    }
    // console.log('inSetInitialHeight end')
}
function swapInnerText(container1, container2) {
    const temp = container1.innerText;
    container1.innerText = container2.innerText;
    container2.innerText = temp;
}
function setTransitionTime(containers, transitionTime) {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.setProperty('transition', transitionTime / 1000.0 + 's cubic-bezier(0.39, 0.575, 0.565, 1)');
    }
}
