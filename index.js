let lineCount = 50;

let wIncrement = window.innerWidth / lineCount;


let colorMap = {

}




function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(33);
    for (let w = -wIncrement * 50; w < window.innerWidth; w += wIncrement) {
        let c = [random(150, 255), random(150, 255), random(150, 255)];
        // let c = [255, 255, 255]
        for (let h = -wIncrement; h < window.innerHeight * 1.7; h += wIncrement) {
            colorMap[w + "," + h] = [random(150, 255), random(150, 255), random(150, 255)];
        }
    }
}



function transform(A, x) {
    let output = new Array(x.length);
    if (A[0].length == x.length) {
        let rCount = 0;
        for (let row of A) {
            let sum = 0;
            for (let i = 0; i < x.length; i++) {
                sum += row[i] * x[i];
            }
            output[rCount++] = sum;
        }
        return output;
    }else{
        console.error("Passed malformed matrix/vec");
    }

    return -1;
}



let target = [[2, 2], 
              [1, 1]];

let A = [[1, 0], 
         [0, 1]];

let b1 = 0;
function draw() {
    frameRate(30)
    // stroke(random(0, 255), random(0, 255), random(0, 255));
    stroke(255);
    strokeWeight(3)
    // fill(random(0, 255), random(0, 255), random(0, 255));

    // background(33, 33, 33, frameCount/6);
    background(33, 33, 33, 50);

    let lastPoint = [0, 0];
    for (let w = -wIncrement * 50; w < window.innerWidth; w += wIncrement) {
        for (let h = -wIncrement; h < window.innerHeight * 1.7; h += wIncrement) {
            //each point w,h is represented by a vector {w, -h} in cartesian space
            //this is the fourth quadrant of cartesian coordinates
            


            let color = colorMap[w + "," + h];
            // stroke(color[0], color[1], color[2]);
            stroke(255 - frameCount*4, frameCount * 4, frameCount*2);

            let x = transform(A, [w, h]);
            for(let i = 0; i < 2; i++){
                for(let j = 0; j < 2; j++){
                    A[i][j] += target[i][j]/900000;
                    // if( i == j && j == 0 && frameCount % 10 == 0){
                    //     console.log(A[i][j]);
                    // }
                    if(abs(A[i][j]) > abs(target[i][j])) A[i][j] = target[i][j];
                }
            }

            
            // let pos = (w / window.innerWidth) * (255*3);
            // // console.log(pos);
            // // console.log(pos);
            // if(pos < 255){
            //     stroke(255, 100, 100);
            // }else if(pos < 255*2){
            //     stroke(100, 255, 100);
            // }else{
            //     stroke(100, 100, 255);
            // }
            // stroke(pos % 255, (pos - (pos%255)) % 255, (pos - 2*(pos%255)) % 255);
            point(x[0], x[1]);

            // line(1, 1, 1000, 1000);

            // line(x[0], x[1], x[0], x[1] - wIncrement);
            // line(x[0], x[1], x[0] - wIncrement, x[1]);
            lastPoint = x;
        }
    }

    document.getElementById("matrix").innerHTML = `
        ${A[0][0].toPrecision(2)}, ${A[0][1].toPrecision(2)} <br>
        ${A[1][0].toPrecision(2)}, ${A[1][1].toPrecision(2)}
    `
    b1 += 0.001;
}