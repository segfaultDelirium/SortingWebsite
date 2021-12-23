async function quickSort(containers: HTMLDivElement[], sleepTime: number){
    const status = <HTMLDivElement>document.querySelector("#status")
    if(!status) return;
    setProgress(true);
    let N = containers.length;
    let l = 0;
    let r = N-1;

    // console.log('in quickSort before if');
    if(l < r){
        let i = await splitArray(containers, l, r, sleepTime);
        await _quicksort(containers, l, i - 1, sleepTime);
        await _quicksort(containers, i + 1, r, sleepTime);
    }
    // console.log('in quickSort after if');

    setProgress(false);
    stopFlag = false;
    startButton.innerText = 'start!';
    startButton.classList.remove('started');
}

async function _quicksort(containers: HTMLDivElement[], l: number, r: number, sleepTime: number){
    if(stopFlag) return;
    if(l < r){
        let i = await splitArray(containers, l, r, sleepTime);
        await _quicksort(containers, l, i - 1, sleepTime);
        await _quicksort(containers, i + 1, r, sleepTime);
    }
}

async function splitArray(containers: HTMLDivElement[], l: number, r: number, sleepTime: number): Promise<number>{
    let splitIndex = chooseSplitPoint(l, r);
    let splitIndexValue = parseInt(containers[splitIndex].innerText);
    let c1 = containers[splitIndex];
    let c2 = containers[r];
    c1.classList.add('active1');
    c2.classList.add('active2');
    swapInnerText(containers[splitIndex], containers[r]);
    c1.classList.remove('active1');
    c2.classList.remove('active2');
    await sleep(sleepTime/2.0);
    updateHeight(containers);
    await sleep(sleepTime/2.0);

    let currentIndex = l;
    for(let i = l; i < r; i++){
        if( parseInt(containers[i].innerText) < splitIndexValue ){
            let c1 = containers[i];
            let c2 = containers[currentIndex];
            c1.classList.add('active1');
            c2.classList.add('active2');
            swapInnerText(containers[i], containers[currentIndex]);
            await sleep(sleepTime/2.0);
            updateHeight(containers);
            await sleep(sleepTime/2.0);
            c1.classList.remove('active1');
            c2.classList.remove('active2');
            currentIndex += 1;
        }
    }
    c1 = containers[currentIndex];
    c2 = containers[r];
    c1.classList.add('active1');
    c2.classList.add('active2');
    swapInnerText(containers[currentIndex], containers[r]);
    await sleep(sleepTime/2.0);
    updateHeight(containers);
    await sleep(sleepTime/2.0);
    c1.classList.remove('active1');
    c2.classList.remove('active2');
    return currentIndex;
}

function chooseSplitPoint(l: number, r: number){
    return Math.floor(l + (r-l)/2);
}