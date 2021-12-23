async function bubbleSort(containers: HTMLDivElement[], sleepTime: number){
    const status = <HTMLDivElement>document.querySelector("#status")
    if(!status) return;
    setProgress(true);
    // console.log('sleeptime = ' + sleepTime/2.0);
    let N = containers.length;
    for( let i = 0; i < N-1; i++){
        for(let j = 0; j < N-i-1; j++){
            if(stopFlag) break;
            if( parseInt(containers[j].innerText) > parseInt(containers[j+1].innerText)){
                containers[j].classList.add('active1');
                containers[j+1].classList.add('active2');
                swapInnerText(containers[j], containers[j+1]);
                await sleep(sleepTime/2.0);
                updateHeight(containers);
                await sleep(sleepTime/2.0);
                containers[j].classList.remove('active1');
                containers[j+1].classList.remove('active2');
            }
        }
        if(stopFlag) break;
    }
    setProgress(false);
    stopFlag = false;
    startButton.innerText = 'start!';
    startButton.classList.remove('started');
}

