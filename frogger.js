/* Glenn Snowden Homework 4 */
/*  Global variables */
var scene, camera, renderer, scoreHTML, livesHTML, restart;
var lane1 = [],lane2 = [],lane3 = [],lane4 = [],log1 = [],log2 = [],log3 = [];
var initLanes = 1;
var frogs = [];
var currentFrog = 0;
var fp = false;
var lives = 5;
var fieldWidth = 15;
var foward = false;
/*  */
var start = false;
var squash = false;
var hop = false;
var splash = false;
var loader = new THREE.AudioLoader();
var audioListener = new THREE.AudioListener();
var score = 0;
var scoreLane;

function init() {
    scene = new THREE.Scene();
    //camera = new THREE.OrthographicCamera(window.innerWidth / -70, window.innerWidth / 70, window.innerHeight / 70, window.innerHeight / -70, 0.1, 1000);
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth*7.8/8, window.innerHeight*7/8);
    document.body.appendChild(renderer.domElement);

    camera.add(audioListener);
    var worldPosition = camera.getWorldDirection();

    spawnFrog();
    camera.lookAt(worldPosition.x, worldPosition.y, worldPosition.z);
    camera.position.y = 4;
    camera.position.z = 15;
    initField();

    livesHTML = document.getElementById("lives");
    livesHTML.innerHTML = "Lives: " + lives;

    scoreHTML = document.getElementById("score");
    scoreHTML.innerHTML = "Score: " + score;


}

function spawnFrog() {
    scoreLane = 1;
    var geometry = new THREE.BoxGeometry(.95, .90, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    frogs[currentFrog] = new THREE.Mesh(geometry, material);
    frogs[currentFrog].position.z = 0.1;
    scene.add(frogs[currentFrog]);
}

function initField() {

    var i = 1;
    /* Render Roads */
    for (i; i < 5; i++) {
        var geometry = new THREE.PlaneGeometry(fieldWidth, 1, 20);
        var material = new THREE.MeshBasicMaterial({
            color: 0x53565a,
            side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        plane.position.y = i;
        plane.position.z = -.475;
        scene.add(plane);
    }

    /* Render middle area */
    var geometry = new THREE.PlaneGeometry(fieldWidth, 1, 20);
    var material = new THREE.MeshBasicMaterial({
        color: 0xa00000,
        side: THREE.DoubleSide
    });

    var plane = new THREE.Mesh(geometry, material);
    plane.position.y = 5;
    plane.position.z = -.475;
    scene.add(plane);

    /*  Render water */
    for (var j = 6; j < 9; j++) {
        var geometry = new THREE.PlaneGeometry(fieldWidth, 1, 20);
        var material = new THREE.MeshBasicMaterial({
            color: 0x040ecc,
            side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        plane.position.y = j;
        plane.position.z = -.475;
        scene.add(plane);
    }

    /* Render End*/
    var geometry = new THREE.PlaneGeometry(fieldWidth, 1, 20);
    var material = new THREE.MeshBasicMaterial({
        color: 0xccc814,
        side: THREE.DoubleSide
    });

    var plane = new THREE.Mesh(geometry, material);
    plane.position.y = 9;
    plane.position.z = -.475;
    scene.add(plane);

}

function spawnLane1(i) {
    var geometry = new THREE.BoxGeometry(.95, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    lane1[i] = new THREE.Mesh(geometry, material);
    lane1[i].position.x = -3 * (initLanes * i);
    lane1[i].position.y = 1;
    scene.add(lane1[i]);
}

function spawnLane2(i) {
    var geometry = new THREE.BoxGeometry(2, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    lane2[i] = new THREE.Mesh(geometry, material);
    lane2[i].position.x = 3 * (initLanes * i) + (initLanes * i * 2);
    lane2[i].position.y = 2;
    scene.add(lane2[i]);

}

function spawnLane3(i) {
    var geometry = new THREE.BoxGeometry(.95, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0xfc6d00
    });
    lane3[i] = new THREE.Mesh(geometry, material);
    lane3[i].position.x = -3 * (initLanes * i);
    lane3[i].position.y = 3;
    scene.add(lane3[i]);

}

function spawnLane4(i) {
    var geometry = new THREE.BoxGeometry(.95, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0x8100a8
    });
    lane4[i] = new THREE.Mesh(geometry, material);
    lane4[i].position.x = 3 * (initLanes * i);
    lane4[i].position.y = 4;
    scene.add(lane4[i]);

}

function spawnLog1(i) {
    var geometry = new THREE.BoxGeometry(2, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0x5b3507
    });
    log1[i] = new THREE.Mesh(geometry, material);
    log1[i].position.x = (initLanes * i) * 6;
    log1[i].position.y = 6;
    log1[i].position.z = -.45;
    scene.add(log1[i]);
}

function spawnLog2(i) {
    var geometry = new THREE.BoxGeometry(2, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0x5b3507
    });
    log2[i] = new THREE.Mesh(geometry, material);
    log2[i].position.x = 3 * 2 * (initLanes * i);
    log2[i].position.y = 7;
    log2[i].position.z = -0.5;

    scene.add(log2[i]);

}

function spawnLog3(i) {
    var geometry = new THREE.BoxGeometry(2, .95, .95);
    var material = new THREE.MeshBasicMaterial({
        color: 0x5b3507
    });
    log3[i] = new THREE.Mesh(geometry, material);
    log3[i].position.x = 3 * 2 * (initLanes * i);
    log3[i].position.y = 8;
    log3[i].position.z = -0.5;
    scene.add(log3[i]);
}

function loadSound() {
    if (start) {
        var startSound = new THREE.Audio(audioListener);
        loader.load(
            // resource URL
            'https://raw.githubusercontent.com/CavemanMC/frogger/master/sounds/start.wav',
            // Function when resource is loaded
            function(audioBuffer) {
                // set the audio object buffer to the loaded object
                startSound.setBuffer(audioBuffer);

                // play the audio
                startSound.play();

            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Function called when download errors
            function(xhr) {
                console.log('An error happened');
            }
        );
        start = false;
    }
    else if (hop) {
        var hopSound = new THREE.Audio(audioListener);
        loader.load(
            // resource URL
            'https://raw.githubusercontent.com/CavemanMC/frogger/master/sounds/hop.wav',
            // Function when resource is loaded
            function(audioBuffer) {
                // set the audio object buffer to the loaded object
                hopSound.setBuffer(audioBuffer);

                // play the audio
                hopSound.play();

            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Function called when download errors
            function(xhr) {
                console.log('An error happened');
            }
        );
        hop = false;
    }
    else if (squash) {
        var squashSound = new THREE.Audio(audioListener);
        loader.load(
            // resource URL
            'https://raw.githubusercontent.com/CavemanMC/frogger/master/sounds/squash.wav',
            // Function when resource is loaded
            function(audioBuffer) {
                // set the audio object buffer to the loaded object
                squashSound.setBuffer(audioBuffer);

                // play the audio
                squashSound.play();

            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Function called when download errors
            function(xhr) {
                console.log('An error happened');
            }
        );
        squash = false;
    }
    else if (splash) {
        var splashSound = new THREE.Audio(audioListener);
        loader.load(
            // resource URL
            'https://raw.githubusercontent.com/CavemanMC/frogger/master/sounds/splash.wav',
            // Function when resource is loaded
            function(audioBuffer) {
                // set the audio object buffer to the loaded object
                splashSound.setBuffer(audioBuffer);

                // play the audio
                splashSound.play();

            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Function called when download errors
            function(xhr) {
                console.log('An error happened');
            }
        );
        splash = false;
    }

}

function render() {

    requestAnimationFrame(render);

    if (lives <= 0 && restart) {
        scene.add(frogs[currentFrog]);
        lives = 5;
        score = 0;
        livesHTML.innerHTML = "Lives: " + lives;
        scoreHTML.innerHTML = "Score: " + score;
        for (var i = 0; i <= currentFrog; i++) {
            scene.remove(frogs[i]);
        }
        frogs = [];
        currentFrog = 0;
        spawnFrog();

        start = true;
        loadSound();
        restart = false;
    }
    else if (lives == 0) {

        scene.remove(frogs[currentFrog]);
        livesHTML.innerHTML = "GAME OVER!";
    }
    else {
        livesHTML.innerHTML = "Lives: " + lives;
        scoreHTML.innerHTML = "Score: " + score;
    }

    // Render the scene.
    /* Render cars*/
    for (var i = 0; i < 3; i++) {
        if (lane1[i].position.x >= (fieldWidth / 2)) {
            lane1[i].position.x -= fieldWidth;
        }
        else {
            lane1[i].position.x += 0.04;
        }

        if (lane2[i].position.x <= -(fieldWidth / 2) - 1.05) {
            lane2[i].position.x += fieldWidth + 1.05;
        }
        else {
            lane2[i].position.x -= 0.03;
        }

        if (lane3[i].position.x >= (fieldWidth / 2)) {
            lane3[i].position.x -= fieldWidth;
        }
        else {
            lane3[i].position.x += 0.05;
        }

        if (lane4[i].position.x <= -(fieldWidth / 2)) {
            lane4[i].position.x += fieldWidth;
        }
        else {
            lane4[i].position.x -= 0.045;
        }
        /* Render Logs*/
        if (log1[i].position.x >= (fieldWidth / 2) + 1) {
            log1[i].position.x -= fieldWidth + 2;
        }
        else {
            log1[i].position.x += 0.04;
        }

        if (log2[i].position.x <= -(fieldWidth / 2) - 1) {
            log2[i].position.x += fieldWidth + 2;
        }
        else {
            log2[i].position.x -= 0.045;
        }

        if (log3[i].position.x >= (fieldWidth / 2) + 1) {
            log3[i].position.x -= fieldWidth + 2;
        }
        else {
            log3[i].position.x += 0.03;
        }
        if (frogs[currentFrog].position.x > 8 || frogs[currentFrog].position.x < -8) {


            splash = true;
            loadSound();
            frogs[currentFrog].position.x = 0;
            frogs[currentFrog].position.y = 0;
            lives--;
            scoreLane = 1;
            if (fp == true) {
                moveCamera();
            }
        }
    }


    /* Collision Detection*/
    if (frogs[currentFrog].position.y == 1) {
        for (var i = 0; i < 3; i++) {
            if (lane1[i].position.x + 0.475 < frogs[currentFrog].position.x - 0.475 || lane1[i].position.x - 0.475 > frogs[currentFrog].position.x + 0.475) {

            }
            else {

                squash = true;
                loadSound();
                frogs[currentFrog].position.x = 0;
                frogs[currentFrog].position.y = 0;
                lives--;
                scoreLane = 1;
                if (fp == true) {
                    moveCamera();
                }
            }
        }
    }
    else if (frogs[currentFrog].position.y == 2) {
        for (var i = 0; i < 3; i++) {
            if (lane2[i].position.x + 1 < frogs[currentFrog].position.x - 0.475 || lane2[i].position.x - 1 > frogs[currentFrog].position.x + 0.475) {}
            else {

                squash = true;
                loadSound();
                frogs[currentFrog].position.x = 0;
                frogs[currentFrog].position.y = 0;
                lives--;
                scoreLane = 1;
                if (fp == true) {
                    moveCamera();
                }
            }
        }
    }
    else if (frogs[currentFrog].position.y == 3) {
        for (var i = 0; i < 3; i++) {
            if (lane3[i].position.x + 0.475 < frogs[currentFrog].position.x - 0.475 || lane3[i].position.x - 0.475 > frogs[currentFrog].position.x + 0.475) {}
            else {

                squash = true;
                loadSound();
                frogs[currentFrog].position.x = 0;
                frogs[currentFrog].position.y = 0;
                lives--;
                scoreLane = 1;

                if (fp == true) {
                    moveCamera();
                }
            }
        }
    }
    else if (frogs[currentFrog].position.y == 4) {
        for (var i = 0; i < 3; i++) {
            if (lane4[i].position.x + 0.475 < frogs[currentFrog].position.x - 0.475 || lane4[i].position.x - 0.475 > frogs[currentFrog].position.x + 0.475) {}
            else {

                squash = true;
                loadSound();
                frogs[currentFrog].position.x = 0;
                frogs[currentFrog].position.y = 0;
                lives--;
                scoreLane = 1;
                if (fp == true) {
                    moveCamera();
                }
            }
        }
    }
    else if (frogs[currentFrog].position.y == 6) {
        var onLog;
        for (var i = 0; i < 3; i++) {
            if (log1[i].position.x + 1 < frogs[currentFrog].position.x || log1[i].position.x - 1 > frogs[currentFrog].position.x) {

            }
            else {
                onLog = true;
            }
        }
        if (onLog == true) {

            frogs[currentFrog].position.x += 0.04;
            if (fp == true) {
                moveCamera();
            }
        }
        else {

            splash = true;
            loadSound();
            frogs[currentFrog].position.x = 0;
            frogs[currentFrog].position.y = 0;
            lives--;
            scoreLane = 1;
            if (fp == true) {
                moveCamera();
            }
        }
    }
    else if (frogs[currentFrog].position.y == 7) {
        var onLog;
        for (var i = 0; i < 3; i++) {
            if (log2[i].position.x + 1 < frogs[currentFrog].position.x || log2[i].position.x - 1 > frogs[currentFrog].position.x) {

            }
            else {
                onLog = true;
            }
        }
        if (onLog) {
            frogs[currentFrog].position.x -= 0.045;
            if (fp == true) {
                moveCamera();
            }
        }
        else {

            splash = true;
            loadSound();
            frogs[currentFrog].position.x = 0;
            frogs[currentFrog].position.y = 0;
            lives--;
            scoreLane = 1;
            if (fp == true) {
                moveCamera();
            }
        }
    }
    else if (frogs[currentFrog].position.y == 8) {
        var onLog;
        for (var i = 0; i < 3; i++) {
            if (log3[i].position.x + 1 < frogs[currentFrog].position.x || log3[i].position.x - 1 > frogs[currentFrog].position.x) {

            }
            else {
                onLog = true;
            }
        }
        if (onLog) {
            frogs[currentFrog].position.x += 0.03;
            if (fp == true) {
                moveCamera();
            }
        }
        else {

            splash = true;
            loadSound();
            frogs[currentFrog].position.x = 0;
            frogs[currentFrog].position.y = 0;
            if (fp == true) {
                moveCamera();
            }

            lives--;
            scoreLane = 1;
        }
    }
    else if (frogs[currentFrog].position.y == 9) {
        currentFrog++;
        spawnFrog();
				if (fp == true) {
                moveCamera();
        }

    }
    /* Render Logs */

    renderer.render(scene, camera);
}

/* Handle arrows keys for movement */
document.onkeydown = function(e) {
    if (lives > 0) {
        switch (e.keyCode) {
            case 37:
                if (frogs[currentFrog].position.x - 1 > -8) {
                    frogs[currentFrog].position.x -= 1;
                    if (fp == true) {
                        moveCamera();
                    }
                    hop = true;
                    loadSound();
                }

                break;
            case 38:
                if (frogs[currentFrog].position.y + 1 < 10) {
                    frogs[currentFrog].position.y += 1;
                    if (fp == true) {
                        moveCamera();
                    }
                    hop = true;
                    console.log(frogs[currentFrog].position.y + " " + scoreLane);
                    if (frogs[currentFrog].position.y == scoreLane) {
                        score += 100;
                        if (scoreLane < 9) {
                            scoreLane++;

                        }
                    }

                    loadSound();
                }
                break;
            case 39:
                if (frogs[currentFrog].position.x + 1 < 8) {
                    frogs[currentFrog].position.x += 1;
                    if (fp == true) {
                        moveCamera();
                    }
                    hop = true;
                    loadSound();
                }
                break;
            case 40:
                if (frogs[currentFrog].position.y) {
                    frogs[currentFrog].position.y -= 1;
                    if (fp == true) {
                        moveCamera();
                    }
                    hop = true;
                    loadSound();
                }
                break;
            case 32:
                if (fp == true) {
                    fp = false;
                    camera.lookAt(0, 0, 0);
                    camera.position.x = 0;
                    camera.position.y = 0;
                    camera.position.z = 15;
                }
                else {
                    fp = true;
                    moveCamera();
                }
                break;
        }
    }
    else {
        if (e.keyCode == 13) {
            restart = true;
            start = true;
        }
    }
};

function moveCamera() {
    camera.position.x = frogs[currentFrog].position.x;
    camera.position.y = frogs[currentFrog].position.y;
    camera.position.z = frogs[currentFrog].position.z;
    camera.lookAt(new THREE.Vector3(camera.position.x, camera.position.y + .0001, camera.position.z));

    camera.updateProjectionMatrix();
}
/* MAIN -- HERE is where execution begins after window load */
function main() {
    init();
    for (var i = 0; i < 3; i++) {
        spawnLane1(i);
        spawnLane2(i);
        spawnLane3(i);
        spawnLane4(i);
        spawnLog1(i);
        spawnLog2(i);
        spawnLog3(i);
    }


    initLanes = 0;
    start = true;
    loadSound();
    render();

} // end main
