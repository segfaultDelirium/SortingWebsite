async function insertSort(containers: HTMLDivElement[], sleepTime: number){
    const status = <HTMLDivElement>document.querySelector("#status")
    if(!status) return;
    setProgress(true);
    let N = containers.length;
    let i = 1;
    while(i < N){
        let j = i;
        while( j > 0 && !isContainer1Smaller(containers[j-1], containers[j])){
            if(stopFlag) break;
            let c1 = containers[j-1];
            let c2 = containers[j];
            c1.classList.add('active1');
            c2.classList.add('active2');
            swapInnerText(containers[j], containers[j-1]);
            await sleep(sleepTime/2.0);
            updateHeight(containers);
            await sleep(sleepTime/2.0);
            j -= 1;
            c1.classList.remove('active1');
            c2.classList.remove('active2');
        }
        i += 1;
        if(stopFlag) break;
    }

    setProgress(false);
    stopFlag = false;
    startButton.innerText = 'start!';
    startButton.classList.remove('started');
}