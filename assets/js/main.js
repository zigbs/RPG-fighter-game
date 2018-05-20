$(document).ready(function () {


    class Fighter {
        constructor(name, magicpower, punchPower, kickPower) {
            this.state = ["null", "punch", "kick", "block", "magic", "dead"]
            this.name = name;
            this.score = 0;
            this.health = 100;
            this.healthReGen = 0.1;
            this.magic = 20;
            this.magic1 = 15;   //user magic attack #1
            this.magic2 = 20;   //user magic attack #2
            this.magic3 = 25;   //user magic attack #3
            this.magic1Time = 500;
            this.magic2Time = 800;
            this.magic3Time = 1200;
            this.magicReGen = 0.1;
            this.punchTime = 300; //ms
            this.kickTime = 500; //ms
            this.blockTime = 1800; //ms
            this.kickStrength = kickPower;
            this.punchStrength = punchPower;  ///WORKING ON THIS AREA
            this.blockStrength = 6;                 //(10 - .blockStrength) *= FighterAttackStrength
            this.magicPower = magicpower;
            this.attackStreak;
            this.userReady = "false";
            this.startGame = function () {
                setupBackground();
                getEnemy();
                //this.placeCharacters();
                playGame();
                //place characters
                $('#selectionRow').hide();
                $('#character-select').hide();
            }
            this.gameRestart = function () {
                User.userReady = "false";
                setMenu();
                playerSelect();
                $('#character-select').show();
                $('#selectionRow').show();
            }
            this.subtractHealth = function (damage) {
                this.health -= damage;
                return this.health;
            }
            this.updateScore = function (newPts) {
                this.score += newPts;
                return this.score;
            }
            this.addHealth = function (healing) {
                this.health += healing;
                return this.health;
            }
            this.regenHealth = function (regenerateRate) {
                this.health += 3;
                return this.health;
            }
            this.regenMagic = function (regenerateMagic) {
                this.magic += 1
                return this.magic;
            }
            this.blockAttack = function (damage) {
                damage *= (User.blockStrength * 0.1);
                this.health -= damage;
                return this.health;
            }
            this.checkHealth = function () {
                if (this.health <= 0) {
                    setTimeout(function () {
                        this.gameRestart();
                    }, 5000);
                }
            }
        }
    };
    //off the bat let's create our two objects we'll be using:
    var User = new Fighter();
    var Enemy;
    //Player definitions:   name/magic/punch/kick/img/
    var Chrono = new Fighter("Chrono", "Lightning", 5, 8);
    var Ayla = new Fighter("Ayla", "Power", 6, 4, );
    var Frog = new Fighter("Frog", "Water", 5, 7, 8);
    var Lucca = new Fighter("Lucca", "Fire", 4, 8);
    var Marle = new Fighter("Marle", "Water", 4, 8);
    var Robo = new Fighter("Robo", "Logic", 6, 7, 8);
    var Magus = new Fighter("Magus", "Shadow", 5, 9);


    var listFighters = [Ayla, Chrono, Frog, Lucca, Marle, Robo, Magus]


    function getEnemy() {
        var Enemies = listFighters;
        Enemies.splice(listFighters.indexOf(User), 1);
        Enemy = Enemies[Math.floor(Math.random() * Enemies.length)];
    }
    function playerSelect() {
        if (User.userReady === "false") {
            $('#gameContainer').hide();

            $('#aylaSelect').click(function () {
                User = Ayla;
                User.userReady = "true";
                setup();
                console.log("Ayla Picked");
                $('#charSelect').html("<h3>Ayla picked</h3>");
            });
            $('#cronoSelect').click(function () {
                User = Chrono;
                User.userReady = "true";
                setup();
                console.log("Chrono Picked");
                $('#charSelect').html("<h3>Chrono picked</h3>");
            });
            $('#frogSelect').click(function () {
                User = Frog;
                User.userReady = "true";
                setup();
                console.log("Frog Picked");
                $('#charSelect').html("<h3>Frog picked</h3>");
            });
            $('#luccaSelect').click(function () {
                User = Lucca;
                User.userReady = "true";
                setup();
                console.log("Lucca has been picked");
                $('#charSelect').html("<h3>Lucca picked</h3>");
            });
            $('#marleSelect').click(function () {
                User = Marle;
                User.userReady = "true";
                setup();
                console.log("Marle has been picked");
                $('#charSelect').html("<h3>Marle picked</h3>");
            });
            $('#roboSelect').click(function () {
                User = Robo;
                User.userReady = "true";
                setup();
                console.log("Robo has been picked");
                $('#charSelect').html("<h3>Robo picked</h3>");
            });
            $('#magusSelect').click(function () {
                User = Magus;
                User.userReady = "true";
                setup();
                console.log("Magus has been picked");
                $('#charSelect').html("<h3>Magus picked</h3>");
            });
        }
    }

    function setupBackground() {
        var randomBG = Math.floor((Math.random() * 5) + 1);
        console.log(randomBG);
        if (randomBG === 1) {
            $('body').css("background-image", "url('assets/bg/enhasa.jpg')");
            $('body').css("background-repeat", "no-repeat");
            $('body').css("background-color", "#222222");
        } else if (randomBG === 2) {
            $('body').css("background-image", "url('assets/bg/dayofLavos.png')");
            $('body').css("background-repeat", "no-repeat");
            $('body').css("background-color", "#111111");
        } else if (randomBG === 3) {
            $('body').css("background-image", "url('assets/bg/ancientSewers.jpg')");
            $('body').css("background-repeat", "no-repeat");
            $('body').css("background-color", "#121212");
        } else if (randomBG === 4) {
            $('body').css("background-image", "url('assets/bg/lovelyBeach.jpg')");
            $('body').css("background-repeat", "no-repeat");
            $('body').css("background-color", "#222222");
        } else if (randomBG === 5) {
            $('body').css("background-image", "url('assets/bg/openSky.jpg')");
            $('body').css("background-repeat", "repeat");
            $('body').css("background-color", "#222222");
        }
    }

    function setMenu() {
        $('body').css("background-image", "url('assets/bg/titleScreen.png')");
    }

    function generateUserImage() {
        if (User.name == "Ayla") {
            $('#player1img').html('<img class="card-img-top" style="z-index=10;" id="userImage" src="assets/images/6ayla/ctart06.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Chrono") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/1chrono/ctart08.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Frog") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/5frog/ctart11.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Lucca") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/3lucca/ctart03.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Marle") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/2marle/ctart02.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Robo") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/4robo/ctart13.jpg" height="50%" alt="Player 1">');
        } else if (User.name == "Magus") {
            $('#player1img').html('<img class="card-img-top" id="userImage" src="assets/images/7magus/ctart07.jpg" height="50%" alt="Player 1">');
        }
    }

    function generateEnemyImage() {
        if (Enemy.name == "Ayla") {
            $('#enemyimg').html('<img class="card-img-top" style="z-index=10;" id="userImage" src="assets/images/6ayla/ctart06.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Chrono") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/1chrono/ctart08.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Frog") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/5frog/ctart11.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Lucca") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/3lucca/ctart03.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Marle") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/2marle/ctart02.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Robo") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/4robo/ctart13.jpg" height="50%" alt="Player 1">');
        } else if (Enemy.name == "Magus") {
            $('#enemyimg').html('<img class="card-img-top" id="userImage" src="assets/images/7magus/ctart07.jpg" height="50%" alt="Player 1">');
        }
    }




    function playGame() {
        $('#playerSelectContainer').html("");
        $('#gameContainer').show("");
        generateUserImage();
        generateEnemyImage();

        //generateUserItems();
        //generateEnemyItems();
        var LargeButtons = '<div class="card-body" id="userItemGroup"><button type="button" id="uItem1" class="btn btn-primary">1</button><button type="button" id="uItem2" class="btn btn-primary">2</button><button type="button" id="uItem3" class="btn btn-primary">3</button><button type="button" id="uItem4" class="btn btn-primary">4</button><button type="button" id="uItem5" class="btn btn-primary">5</button><button type="button" id="uItem6" class="btn btn-primary">6</button></div>'
        var LargeButtons2 = '<div class="card-body" id="userItemGroup"><button type="button" id="uItem1" class="btn btn-primary">1</button><button type="button" id="uItem2" class="btn btn-primary">2</button><button type="button" id="uItem3" class="btn btn-primary">3</button><button type="button" id="uItem4" class="btn btn-primary">4</button><button type="button" id="uItem5" class="btn btn-primary">5</button><button type="button" id="uItem6" class="btn btn-primary">6</button></div>';

        $('#player1img').append(LargeButtons);
        $('#enemyimg').append(LargeButtons2);


        alert("Your opponent has: " + Enemy.health + " HP.  Fight wisely.");

        if (User.health === 0 || Enemy.health === 0 || User.userReady === "false") {
            User.checkHealth();
            Enemy.checkHealth();
        }
        else if (User.health > 0 && Enemy.health > 0 && User.userReady === "true") {
            $('#character-select').hide();
            $('#kick').click(function () {
                console.log("KICK");
                User.state = "kick";
                var subtractionHealth = Enemy.subtractHealth(User.kickStrength);
                console.log(Enemy.health);
                console.log(subtractionHealth);
                $('#enemyHP').css("width", Enemy.health).text(Enemy.health);
                $('#jumboP').html("<h1>KICK!!!</h1>");
                $('#belowjumbo').append("<em>- 30pts</em>");
                $('#userScore').text(User.updateScore(300));
                setTimeout(function () {
                    $('#belowjumbo').append(" ");
                    User.state = "null";
                }, User.kickTime);
            });

            $('#punch').click(function () {
                console.log("Punch");                                               //logs punch
                User.state = "punch";                                               //sets User state
                var subtractionHealth = Enemy.subtractHealth(User.punchStrength);
                console.log(Enemy.health);
                console.log(subtractionHealth);
                $('#enemyHP').css("width", Enemy.health).text(Enemy.health);
                $('#jumboP').html("<h1>PUNCH!!!</h1>");
                $('#belowjumbo').append("<em>- 20pts</em>");
                $('#userScore').text(User.updateScore(200));
                setTimeout(function () {
                    $('#belowjumbo').append(" ");
                    User.state = "null";
                }, User.punchTime);
            });
            $('#block').click(function () {
                console.log("Block");
                User.state = "block";
                $('#jumboP').html("<h1>BLOCK!!!</h1>");
                $('#belowjumbo').html("<em>- 2pts</em>");
                setTimeout(function () {
                    $('#belowjumbo').append(" ");
                    User.state = "null";
                }, User.blockTime);
            });
            $('#magic1').click(function () {
                if (User.score >= 500) {
                    User.state = "magic";
                    console.log("MAGIC");
                    var addHealth = User.addHealth(10);
                    console.log(addHealth);
                    $('#userHP').css("width", User.health).text(User.health);
                    $('#jumboP').html("<h1>MAGIC!!!</h1>");
                    $('#belowjumbo').html("<em>+ 50 HP</em>");
                    $('#userScore').text(User.updateScore(-500));
                    setTimeout(function () {
                        $('#belowjumbo').append(" ");
                        User.state = "null";
                    }, User.magic1Time);
                }
            });
            //insert Item stuff in here

        } else if (User.score < 500) {
            
        }
    }


    //running Game Code

    function setup() {
        if (User.userReady === "false") {
            User.gameRestart();
        } else if (User.userReady === "true") {
            User.startGame();
        }
    }
    setup();


});