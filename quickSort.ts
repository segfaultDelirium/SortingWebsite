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
    // console.log('in splitArray');
    let splitIndex = chooseSplitPoint(l, r);
    // console.log(splitIndex)
    // console.log(containers.length);
    let splitIndexValue = parseInt(containers[splitIndex].innerText);
    // console.log('before swap')
    // console.log(containers[splitIndex])
    // console.log(containers.length)
    // console.log(r);
    // console.log(containers[r])
    swapInnerText(containers[splitIndex], containers[r]);
    // console.log('after swap')
    await sleep(sleepTime/2.0);
    updateHeight(containers);
    await sleep(sleepTime/2.0);

    let currentIndex = l;
    for(let i = l; i < r; i++){
        if( parseInt(containers[i].innerText) < splitIndexValue ){
            swapInnerText(containers[i], containers[currentIndex]);
            await sleep(sleepTime/2.0);
            updateHeight(containers);
            await sleep(sleepTime/2.0);
            currentIndex += 1;
        }
    }
    swapInnerText(containers[currentIndex], containers[r]);
    await sleep(sleepTime/2.0);
    updateHeight(containers);
    await sleep(sleepTime/2.0);
    return currentIndex;
}

function chooseSplitPoint(l: number, r: number){
    return Math.floor(l + (r-l)/2);
}