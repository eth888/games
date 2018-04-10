var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

//alert('width: ' + width);

var diceArray = [];
var dice_width = height/12;
//var dice_width = 0;

var currentCoin = 0.1;
var totalBet = 0;
var maxStake = 0.3;

var numImagesLoaded = 0;
var numImages = 41;


var betCoin_image = null;

var dice1_image = new Image();
dice1_image.src = 'img/dice_1.png';
dice1_image.onload = function(){handleImageLoaded();}

var dice2_image = new Image();
dice2_image.src = 'img/dice_2.png';
dice2_image.onload = function(){handleImageLoaded();}

var dice3_image = new Image();
dice3_image.src = 'img/dice_3.png';
dice3_image.onload = function(){handleImageLoaded();}

var dice4_image = new Image();
dice4_image.src = 'img/dice_4.png';
dice4_image.onload = function(){handleImageLoaded();}

var dice5_image = new Image();
dice5_image.src = 'img/dice_5.png';
dice5_image.onload = function(){handleImageLoaded();}

var dice6_image = new Image();
dice6_image.src = 'img/dice_6.png';
dice6_image.onload = function(){handleImageLoaded();}

diceArray = [dice1_image, dice2_image, dice3_image];

var betButtonDim = new Image();
betButtonDim.src = 'img/next-button-gray.png';
betButtonDim.onload = function(){handleImageLoaded();}

var betButton = new Image();
betButton.src = 'img/next-button.png';
betButton.onload = function(){handleImageLoaded();}

var paperSlip = new Image();
paperSlip.src = 'img/paper-slip.jpg';
paperSlip.onload = function(){handleImageLoaded();}

var bg_top = new Image();
bg_top.src = 'img/bg_top.jpg';
bg_top.onload = function(){handleImageLoaded();}

var lose_image_1 = new Image();
lose_image_1.src = 'img/b1_lose.png';
lose_image_1.onload = function(){handleImageLoaded();}

var lose_image_2 = new Image();
lose_image_2.src = 'img/b2_lose.png';
lose_image_2.onload = function(){handleImageLoaded();}

var lose_image_3 = new Image();
lose_image_3.src = 'img/b3_lose.png';
lose_image_3.onload = function(){handleImageLoaded();}

var lose_image_4 = new Image();
lose_image_4.src = 'img/b4_lose.png';
lose_image_4.onload = function(){handleImageLoaded();}

var lose_image_5 = new Image();
lose_image_5.src = 'img/b5_lose.png';
lose_image_5.onload = function(){handleImageLoaded();}

var lose_image_6 = new Image();
lose_image_6.src = 'img/b6_lose.png';
lose_image_6.onload = function(){handleImageLoaded();}

var bg_mid = new Image();
bg_mid.src = 'img/bg_mid.jpg';
bg_mid.onload = function(){handleImageLoaded();}

var bg_buttom = new Image();
bg_buttom.src = 'img/bg_bottom.jpg';
bg_buttom.onload = function(){handleImageLoaded();}

var c1_image = new Image();
c1_image.src = 'img/1.png';
c1_image.onload = function(){handleImageLoaded();}

var c10_image = new Image();
c10_image.src = 'img/10.png';
c10_image.onload = function(){handleImageLoaded();}

var c100_image = new Image();
c100_image.src = 'img/100.png';
c100_image.onload = function(){handleImageLoaded();}

var c500_image = new Image();
c500_image.src = 'img/500.png';
c500_image.onload = function(){handleImageLoaded();}

var bowl_image = new Image();
bowl_image.src = 'img/bowl.png';
bowl_image.onload = function(){handleImageLoaded();}

var b1_image = new Image();
b1_image.src = 'img/b1.png';
b1_image.onload = function(){handleImageLoaded();}

var b2_image = new Image();
b2_image.src = 'img/b2.png';
b2_image.onload = function(){handleImageLoaded();}

var b3_image = new Image();
b3_image.src = 'img/b3.png';
b3_image.onload = function(){handleImageLoaded();}

var b4_image = new Image();
b4_image.src = 'img/b4.png';
b4_image.onload = function(){handleImageLoaded();}

var b5_image = new Image();
b5_image.src = 'img/b5.png';
b5_image.onload = function(){handleImageLoaded();}

var b6_image = new Image();
b6_image.src = 'img/b6.png';
b6_image.onload = function(){handleImageLoaded();}

var center_image = new Image();
center_image.src = 'img/center.png';
center_image.onload = function(){handleImageLoaded();}

var images = {};
images['b1_win'] = new Image();
images['b1_win'].src = 'img/b1_win.jpg';
images['b1_win'].onload = function(){handleImageLoaded();}

images['b2_win'] = new Image();
images['b2_win'].src = 'img/b2_win.jpg';
images['b2_win'].onload = function(){handleImageLoaded();}

images['b3_win'] = new Image();
images['b3_win'].src = 'img/b3_win.jpg';
images['b3_win'].onload = function(){handleImageLoaded();}

images['b4_win'] = new Image();
images['b4_win'].src = 'img/b4_win.jpg';
images['b4_win'].onload = function(){handleImageLoaded();}

images['b5_win'] = new Image();
images['b5_win'].src = 'img/b5_win.jpg';
images['b5_win'].onload = function(){handleImageLoaded();}

images['b6_win'] = new Image();
images['b6_win'].src = 'img/b6_win.jpg';
images['b6_win'].onload = function(){handleImageLoaded();}

images['b1'] = new Image();
images['b1'].src = 'img/b1_off.jpg';
images['b1'].onload = function(){handleImageLoaded();}

images['b2'] = new Image();
images['b2'].src = 'img/b2_off.jpg';
images['b2'].onload = function(){handleImageLoaded();}

images['b3'] = new Image();
images['b3'].src = 'img/b3_off.jpg';
images['b3'].onload = function(){handleImageLoaded();}

images['b4'] = new Image();
images['b4'].src = 'img/b4_off.jpg';
images['b4'].onload = function(){handleImageLoaded();}

images['b5'] = new Image();
images['b5'].src = 'img/b5_off.jpg';
images['b5'].onload = function(){handleImageLoaded();}

images['b6'] = new Image();
images['b6'].src = 'img/b6_off.jpg';
images['b6'].onload = function(){handleImageLoaded();}

function handleImageLoaded()
{
	numImagesLoaded++;
	if(numImagesLoaded == numImages)
	{
		loadImagesComplete();
	}
}

function loadImagesComplete()
{
	$('body').loadingModal('destroy');
	
	loadBGMid();
	loadBGTop();
	loadBGBottom();
  	
	// selection rectangle
	context.strokeStyle = "#FF9800";
	context.lineWidth=4;
	roundRect(context, 35 + height * 0.48, height * 0.826 - 5, height * 0.1 + 10, height * 0.1 + 10, 10);
	
	requestServerKey();
	update_bank();
	
	document.addEventListener('click', mouseClicked, false);

}

function loadBGTop_last() {
  document.removeEventListener('click', mouseClicked, false);

    context.drawImage(bg_top, 0, 0, height, height/4 - height/24);

	drawBalance();

	
	//var changeInBank = game.bank - lastBankAccount;
	var changeInBank = game.payout - game.betAmount;
	
    make_dice();

    console.log("game.numberGuess = " + JSON.stringify(game.numberGuess));

    var bettedNumber = [];
    function bettedNumberIncluded(n){
      var found = false;
      for (var i = 0; i < bettedNumber.length; i++) {
        if (bettedNumber[i].number == n) {
          found = true;
          break;
        }
      }
      return found;
    }

    for (var i = 0; i < game.numberGuess.length; i++) {
      if (!bettedNumberIncluded(game.numberGuess[i].number)) {
        bettedNumber.push({"number": game.numberGuess[i].number});
      }
    }
    console.log("bettedNumber = " + JSON.stringify(bettedNumber));

    for (var i = 0; i < bettedNumber.length; i++) {
      bettedNumber[i].winCount = 0;
      for (var j = 0; j < game.randNumber.length; j++) {

        if (bettedNumber[i].number == game.randNumber[j]) {
          bettedNumber[i].winCount = bettedNumber[i].winCount + 1;
        }
      }
    }
    console.log("bettedNumber = " + JSON.stringify(bettedNumber));
    for (var i = 0; i < bettedNumber.length; i++) {
      switch(bettedNumber[i].number) {
        case 1:
			
			var py = height * 0.25;
			//drawChangeInBank(py * 0.5 - 40, py - 12, changeInBank);
			drawChangeInBank(height * 0.5 - 40, py, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_1, 0, py, py, py);
          }else {
            
              var timer = 0;
              function switch_win_1() {
                context.drawImage(images.b1_win, 0, py, py, py);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_1,500);
                }    
                console.log("switch_win_1 execute");
              }
              function switch_normal_1() {
                context.drawImage(images.b1, 0, py, py, py);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_1,500);
                }
                console.log("switch_normal_1 execute");
              }
              switch_normal_1();
			  			  
			  
          }
          break;
        case 2:
			
			//drawChangeInBank(height * 0.25 * 0.5 - 40, height * 0.75 + 33, changeInBank);
			drawChangeInBank(height * 0.5 - 40, height * 0.25, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_2, 0, height/2, height/4, height/4);
          }else {

              var timer = 0;
              function switch_win_2() {
                context.drawImage(images.b2_win, 0, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_2,500);
                }    
              }
              function switch_normal_2() {
                context.drawImage(images.b2, 0, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_2,500);
                }
              }
              switch_normal_2();

          }
          break;
        case 3:
			
			//drawChangeInBank(height * 0.25 * 0.5 + height * 0.25 - 40, height * 0.75 + 33, changeInBank);
			drawChangeInBank(height * 0.5 - 40, height * 0.25, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_3, height/4, height/2, height/4, height/4);
          }else {

              var timer = 0;
              function switch_win_3() {
                context.drawImage(images.b3_win, height/4, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_3,500);
                }    
              }
              function switch_normal_3() {
                context.drawImage(images.b3, height/4, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_3,500);
                }
              }
              switch_normal_3();

          }
          break;
        case 4:
			
			//drawChangeInBank(height * 0.25 * 0.5 + height * 0.5 - 40, height * 0.75 + 33, changeInBank);
			drawChangeInBank(height * 0.5 - 40, height * 0.25, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_4, height/2, height/2, height/4, height/4);
          }else {

              var timer = 0;
              function switch_win_4() {
                context.drawImage(images.b4_win, height/2, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_4,500);
                }    
              }
              function switch_normal_4() {
                context.drawImage(images.b4, height/2, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_4,500);
                }
              }
              switch_normal_4();

          }
          break;
        case 5:
			
			//drawChangeInBank(height * 0.25 * 0.5 + height * 0.75 - 40, height * 0.75 + 33, changeInBank);
			drawChangeInBank(height * 0.5 - 40, height * 0.25, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_5, height*3/4, height/2, height/4, height/4);
          }else {

              var timer = 0;
              function switch_win_5() {
                context.drawImage(images.b5_win, height*3/4, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_5,500);
                }    
              }
              function switch_normal_5() {
                context.drawImage(images.b5, height*3/4, height/2, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_5,500);
                }
              }
              switch_normal_5();

          }
          break;
        case 6:
			
			//drawChangeInBank(height * 0.25 * 0.5 + height * 0.75 - 40, height * 0.25 - 12, changeInBank);
			drawChangeInBank(height * 0.5 - 40, height * 0.25, changeInBank);
			
          if (bettedNumber[i].winCount == 0) {
              context.drawImage(lose_image_6, height*3/4, height/4, height/4, height/4);
          }else {

              var timer = 0;
              function switch_win_6() {
                context.drawImage(images.b6_win, height*3/4, height/4, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_normal_6,500);
                }    
              }
              function switch_normal_6() {
                context.drawImage(images.b6, height*3/4, height/4, height/4, height/4);
                timer += 500;
                if(timer < timeout){
                  setTimeout(switch_win_6,500);
                }
              }
              switch_normal_6();

          }
          break;          
      }
    }
    

}

function drawChangeInBank(x, y, changeInBank) {

  var changeToDisplay ="";

  context.fillStyle = "red";
  context.font = "34px Arial";
  if (changeInBank > 0) {
	  
	  context.fillStyle = "green";
	  changeToDisplay = "+" + "$" + Math.abs(changeInBank.toFixed(3)).toString();
	  
  }else if (changeInBank < 0) {
	  
	  changeToDisplay = "-" + "$" + Math.abs(changeInBank.toFixed(3)).toString();
	  
  }
  context.fillText(changeToDisplay, x, y);
}

function loadBGTop() {
    
	context.drawImage(bg_top, 0, 0, height, height/4 - height/24);

  drawStake();
	drawBalance();
		
  //draw the undo button
  context.fillStyle = "#00bcd4";
  context.fillRect(0, 0, height/7, height/12);
  context.fillStyle = "white";
  context.font = "32px 微軟正黑體";
  context.fillText(msg18, height * 0.036, height * 0.046); 
	
  make_dice();
}

function drawStake()
{
	context.drawImage(paperSlip, height * 0.7, height * 0.1, height * 0.3, height * 0.08);    
  context.fillStyle = "brown";
  context.font = "35px Arial";
  context.fillText(msg20 + "：" + totalBet.toFixed(3) + " eth", height * 0.65 + height/16, height * 0.15);	
}

function drawBalance()
{
  context.drawImage(paperSlip, 0, height * 0.1, height * 0.3, height * 0.08);
  context.fillStyle = "brown";
  context.font = "35px Arial";
  context.fillText(msg19 + "：" + game.bank.toFixed(3) + " eth", height * 0.01, height * 0.15);
}

function loadBGMid() {
    context.drawImage(bg_mid, 0, height/4 - height/24, height, height/2 + height/12);
    make_base_mid();
}

function loadBGBottom() {
    
	context.drawImage(bg_buttom, 0, height*3/4 + height/24, height, height/4 - height/24);
  make_base_bottom();

	context.drawImage(paperSlip, height * 0.038, height * 0.95, height * 0.6, height * 0.04);
	
  context.fillStyle = "brown";
  context.font = "28px 微軟正黑體";
  context.fillText("0.005", height * 0.08, height * 0.98);
	context.fillText("0.01", height * 0.23, height * 0.98);
	context.fillText("0.05", height * 0.386, height * 0.98);
	context.fillText("0.1", height * 0.546, height * 0.98);
}

function make_base_mid()
{
    context.drawImage(b1_image, 0, height/4, height/4, height/4);
    context.drawImage(b2_image, 0, height/2, height/4, height/4);
    context.drawImage(b3_image, height/4, height/2, height/4, height/4);
    context.drawImage(b4_image, height/2, height/2, height/4, height/4);
    context.drawImage(b5_image, height*3/4, height/2, height/4, height/4);
    context.drawImage(b6_image, height*3/4, height/4, height/4, height/4);
    context.drawImage(center_image, height/4, height/4, height/2, height/4);
}

function make_base_bottom()
{
	context.drawImage(betButtonDim, height * 0.82, height * 0.84, height * 0.13, height * 0.13);
	
	//drawing coin icons
    context.drawImage(c1_image, 40, height * 0.826, height * 0.1, height * 0.1);
    context.drawImage(c10_image, height * 0.16 + 40, height * 0.826, height * 0.1, height * 0.1);
    context.drawImage(c100_image, height * 0.32 + 40, height * 0.826, height * 0.1, height * 0.1);
    context.drawImage(c500_image, height * 0.48 + 40, height * 0.826, height * 0.1, height * 0.1);
}

function make_dice()
{
    context.drawImage(bowl_image, height/4, 0, height/2, height/5);
	context.drawImage(diceArray[0], height*11/24, height/24, height/12, height/12);
    context.drawImage(diceArray[1], height*0.35, height*0.0416, height/12, height/12);
    context.drawImage(diceArray[2], height*0.566, height*0.0416, height/12, height/12);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

//update function
function update_bank(){
  loadBGTop();
};

//update bank account when last guess
function update_bank_last(){
  loadBGTop_last();
}

function update_dice(){
  
  for (var i=0; i<3; i++) {
    switch (game.randNumber[i]) {
      case 1:
      diceArray[i] = dice1_image;
        break;
      case 2:
      diceArray[i] = dice2_image;
        break;
      case 3:
      diceArray[i] = dice3_image;
        break;
      case 4:
      diceArray[i] = dice4_image;
        break;
      case 5:
      diceArray[i] = dice5_image;
        break;
      case 6:
      diceArray[i] = dice6_image;
        break;
      default:
        break;
    }
  }

  make_dice();
}

function refreshCanvas() {
  
  loadBGMid();
  loadBGTop();
  
  context.drawImage(betButtonDim, height * 0.82, height * 0.84, height * 0.13, height * 0.13);
}


