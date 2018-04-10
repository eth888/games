var timeout = 4000;
var isPlaceBetDisabled = false;

var getHashURL = "getHash.php";
var submitBetURL = "submitBet.php";
var ethGameContract = null;

var response = {};
response.result = [];
var input_numberGuess = [];

var hashedServerKey = null;

var lastBankAccount = 10;
var isWeb3Detected = false;

var game = {
  //bet: null,
  bank: 0,
  randNumber: [],
  numberGuess: [],
  //numberGuessForTwo: [],
  payout: 0,
  betAmount: 0,

  /*
  getBetAmount: function() {
    return this.bet = input_bet;
  },*/
  getRandomNumber: function(input, server_seed) {

  	this.randNumber = calculateResult(server_seed, input);
  	this.randNumber[0]++;
  	this.randNumber[1]++;
  	this.randNumber[2]++;

    return this.randNumber;
  },
  getNumberGuess: function() {
    return this.numberGuess = input_numberGuess;
  },

};

var scaleFactor = 1;
$(document).ready(function(){
  	init();
});

function checkWeb3Network()
{
  if(isWeb3Detected == false && web3.eth.defaultAccount == undefined)
  {
    console.log('checkWeb3Network: ' + web3.eth.defaultAccount);
    $('body').loadingModal('destroy');
    setTimeout(()=>{
      console.log('show');
      $('body').loadingModal({text: msg22, 'animation': 'wanderingCubes'});
    }, 100);
  }
}

function checkWeb3Status()
{
	web3.version.getNetwork((err, netId) => {

      if(!err)
      {
        isWeb3Detected = true;

        switch (netId) {

          case "3":
            
            // fetch account      
            web3.eth.getAccounts((err, accs)=>{

              if (err || accs.length == 0) {

                $('body').loadingModal('destroy');
                setTimeout(()=>{
                  $('body').loadingModal({text: msg22, 'animation': 'wanderingCubes'});
                }, 100);
                setTimeout(checkWeb3Status, 3000);

                return false;
              }
              else
              {
                web3.eth.defaultAccount = accs[0];
                console.log('web3.eth.defaultAccount: ' + web3.eth.defaultAccount);

                $('#recordLink').attr('href', 'transactionRecords.php?address=' + web3.eth.defaultAccount);

                updateBalance();

                $('body').loadingModal('destroy');
              }
            });

            break;
          
          default:

            $('body').loadingModal('destroy');
            setTimeout(()=>{
              $('body').loadingModal({text: msg23, 'animation': 'wanderingCubes'});
            }, 100);          
            setTimeout(checkWeb3Status, 3000);

            break;
        }
      }
	}); 	

  if(!isWeb3Detected)
  {
    $('body').loadingModal('destroy');
    setTimeout(()=>{
      $('body').loadingModal({text: msg22, 'animation': 'wanderingCubes'});
    }, 100);

    setTimeout(checkWeb3Status, 3000);
  }

}

function updateBalance(){

	web3.eth.getBalance(web3.eth.defaultAccount, (error, result)=>{
		var ether = web3.fromWei(result, 'ether');
		game.bank = parseFloat(ether) - totalBet;
		
		drawBalance();

		console.log('balance updated');
		setTimeout(updateBalance, 3000);
	});

};

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function copyToClipboardFromInput(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).val()).select();
  document.execCommand("copy");
  $temp.remove();
}

//initial setup function
function init() {
	
	$('.keyPart').width($(window).height());

	$(window).resize(function() {
		var canvas = $('#canvas');	
		var w = canvas.width();
		if(w > 0)
			scaleFactor = 1024 / w;
	});

	// initialize web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //console.log('web3.eth.defaultAccount: ' + web3.eth.defaultAccount);
    var contractAddress = '0xa7e09c31976ae909d21964c2469c8e02f0afb79f';
    var abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "receiver",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sendFund",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "min",
          "type": "uint256"
        },
        {
          "name": "max",
          "type": "uint256"
        }
      ],
      "name": "setBetAmountLimitRange",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "setMaxPayoutRate",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_bet",
          "type": "string"
        },
        {
          "name": "_hash",
          "type": "bytes32"
        },
        {
          "name": "_playerSeed",
          "type": "string"
        }
      ],
      "name": "placeBet",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "receiveFund",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "maxBetAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "minBetAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    }];

    ethGameContract = web3.eth.contract(abi).at(contractAddress);
    checkWeb3Status();
    //checkWeb3Network();

	var canvas = $('#canvas');	
	var w = canvas.width();
	if(w > 0)
		scaleFactor = 1024 / w;

	$('body').loadingModal({text: msg17, 'animation': 'wanderingCubes'});	
}

function generateUserHash() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function calculateResult(serverSeed, playerSeed) {

    var results = [-1, -1, -1];
    
    if(serverSeed.length >= 3)
    {      
      var seedLength = serverSeed.length;
      var segmentLength1 = (seedLength - (seedLength % 3)) / 3;
      var str1 = serverSeed.substr(0, segmentLength1);
      var str2 = serverSeed.substr(segmentLength1, segmentLength1);
      var str3 = serverSeed.substr(segmentLength1 * 2, segmentLength1);

      var s1 = 0;
      for(var i = 0; i < segmentLength1; i++)
        s1 += str1.charCodeAt(i);      

      var s2 = 0;
      for(var i = 0; i < segmentLength1; i++)
        s2 += str2.charCodeAt(i);      

      var s3 = 0;
      for(var i = 0; i < segmentLength1; i++)
        s3 += str3.charCodeAt(i);
      
      if(playerSeed.length >= 3)
      {
        seedLength = playerSeed.length;
        var segmentLength2 = (seedLength - (seedLength % 3)) / 3;
        str1 = playerSeed.substr(0, segmentLength2);
        str2 = playerSeed.substr(segmentLength2, segmentLength2);
        str3 = playerSeed.substr(segmentLength2 * 2, segmentLength2);

        for(var i = 0; i < segmentLength2; i++)
          s1 += str1.charCodeAt(i); 

        for(var i = 0; i < segmentLength2; i++)
          s2 += str2.charCodeAt(i);

        for(var i = 0; i < segmentLength2; i++)
          s3 += str3.charCodeAt(i);
      }

      results[0] = s1 % 6;
      results[1] = s2 % 6;
      results[2] = s3 % 6;
    }

    return results;
}

//@return return array of random 3 numbers from user input and server seed
function genRandNumber(input, server_seed) {
  var returnArray = [];
  for (var nonce = 0; nonce < 3; nonce++)
  {
    var client_seed = input + "-" + nonce;

    //for rolling random number from 1~6
    var roll = CryptoJS.HmacSHA512(client_seed, server_seed).toString();

    var start = 0;
    var result = Math.pow(6, 6);
    while(result > Math.pow(6, 6)-1) {
      result = parseInt(roll.substring(start, start + 4), 16);
      start = start + 4;
    }
    result = (result % Math.pow(6, 4)) / Math.pow(6, 3);
    returnArray[nonce] = Math.floor(result + 1);
  }
  return returnArray;
}


function requestServerKey() {

	$.getJSON(getHashURL, (data) => {
      
      seedHash = data['hash'];
      $('#hashedSeedDisplay').val(seedHash);
      hashedServerKey = seedHash;

    });

}

function requestUnhashedKey(input, serverSeed) {

      var server_seed = serverSeed;
      console.log("server seed:" + server_seed );

      //game.getBetAmount();
      game.getRandomNumber(input, server_seed);
      game.getNumberGuess();

      console.log("randNum:" + game.randNumber);
      //update the dice canvas
      update_dice();
      

      for(var j=0; j<game.numberGuess.length; j++){

        if (j == (game.numberGuess.length-1)) {
          //handle guess for one numbers of last one
          console.log("game.numberGuess[j].number = " + game.numberGuess[j].number);

          var count = 0;
          for (var i=0; i<3; i++)
          {
            console.log("game.randNumber[i] = " + game.randNumber[i]);
            if(game.randNumber[i] === game.numberGuess[j].number)
            {
              count++;
            }
          }

          if(count === 1) {
            //alert("You got it! you won || 1x Price || of $" + (game.numberGuess[j].bet * 1) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 1);
            console.log(game.bank);
            update_bank_last();
          }else if(count === 2) {
            //alert("You got it! you won || 2x Price || of $" + (game.numberGuess[j].bet * 2) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 2);
            console.log(game.bank);
            update_bank_last();
          }else if(count === 3) {
            //alert("You got it! you won || 3x price || of $" + (game.numberGuess[j].bet * 3) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 3);
            console.log(game.bank);
            update_bank_last();
          }else{
            //alert("Sorry you lost!");
            console.log(game.bank);
            update_bank_last();
          };
        }else {
          //handle guess for one numbers
          console.log("game.numberGuess[j].number = " + game.numberGuess[j].number);

          var count = 0;
          for (var i=0; i<3; i++)
          {
            console.log("game.randNumber[i] = " + game.randNumber[i]);
            if(game.randNumber[i] === game.numberGuess[j].number)
            {
              count++;
            }
          }

          if(count === 1) {
            //alert("You got it! you won || 1x Price || of $" + (game.numberGuess[j].bet * 1) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 1);
            console.log(game.bank);
            update_bank();
          }else if(count === 2) {
            //alert("You got it! you won || 2x Price || of $" + (game.numberGuess[j].bet * 2) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 2);
            console.log(game.bank);
            update_bank();
          }else if(count === 3) {
            //alert("You got it! you won || 3x price || of $" + (game.numberGuess[j].bet * 3) + " !" );
            game.bank = game.bank + game.numberGuess[j].bet + (game.numberGuess[j].bet * 3);
            console.log(game.bank);
            update_bank();
          }else{
            //alert("Sorry you lost!");
            console.log(game.bank);
            update_bank();
          };
        }

      }
        //reset input number guess
        input_numberGuess = [];

        setTimeout(function(){

          //reset last bank account variable
          lastBankAccount = game.bank;

          //refresh the canvas
          refreshCanvas();

          if(game.bank == 0)
            vex.dialog.alert(msg1);

          document.addEventListener('click', mouseClicked, false);

        }, timeout);
		
		var tb = totalBet;
		var hashed = hashedServerKey;
		
	    totalBet = 0;
	    //requestServerKey();
		
		setTimeout(function(){
		
			showVerifySummary(hashed, serverSeed, tb);
			
		}, 4600);

}

function makeRandomText()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 9; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// End of event functions

// mouse coordinate of the screen
var mouseX = 0;
var mouseY = 0;

// button object
function Button(xL, xR, yT, yB) {
  this.xLeft = xL;
  this.xRight = xR;
  this.yTop = yT;
  this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
  if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
}

//Create button
var btnPlay = new Button(height*3/4, height, height*5/6, height);

var btn_1 = new Button(0, height/4, height/4, height/2);
var btn_2 = new Button(0, height/4, height/2, height*3/4);
var btn_3 = new Button(height/4, height/2, height/2, height*3/4);
var btn_4 = new Button(height/2, height*3/4, height/2, height*3/4);
var btn_5 = new Button(height*3/4, height, height/2, height*3/4);
var btn_6 = new Button(height*3/4, height, height/4, height/2);
var btn_Array = [btn_1, btn_2, btn_3, btn_4, btn_5, btn_6];

var btnReset = new Button(0, height/7, 0, height/8);

var btn_coin_1 = new Button(40, 40 + height/10, height*5/6, height*5/6 + height/10);
var btn_coin_10 = new Button(40 + height * 0.16, (height * 0.16 + 40) + height/10, height*5/6, height*5/6 + height/10);
var btn_coin_100 = new Button(40 + height * 2 * 0.16, (height * 2 * 0.16 + 40) + height/10, height*5/6, height*5/6 + height/10);
var btn_coin_500 = new Button(40 + height * 3 * 0.16, (height * 3 * 0.16 + 40) + height/10, height*5/6, height*5/6 + height/10);

//button action
function addCoin(mouseX, mouseY) {  
    switch (currentCoin) {
      case 0.005:
        //betCoin_image.src = 'img/1.png';
		betCoin_image = c1_image;
        context.drawImage(betCoin_image, mouseX - height/24, mouseY - height/24, height/12, height/12);
        break;
      case 0.01:
        //betCoin_image.src = 'img/10.png';
		betCoin_image = c10_image;
        context.drawImage(betCoin_image, mouseX - height/24, mouseY - height/24, height/12, height/12);
        break;
      case 0.05:
        //betCoin_image.src = 'img/100.png';
		betCoin_image = c100_image;
        context.drawImage(betCoin_image, mouseX - height/24, mouseY - height/24, height/12, height/12);
        break;
      case 0.1:
        //betCoin_image.src = 'img/500.png';
		betCoin_image = c500_image;
        context.drawImage(betCoin_image, mouseX - height/24, mouseY - height/24, height/12, height/12);
        break;
    }		
}

//handle button clicked event functions
function mouseClicked(e) {
	
	if(!isPlaceBetDisabled)
	{
	    mouseX = (e.pageX - canvas.offsetLeft) * scaleFactor;
	    mouseY = (e.pageY - canvas.offsetTop) * scaleFactor;
	    if (btnPlay.checkClicked()) {playGame()};

	    btn_Array.forEach(function(item, index){

	      if (item.checkClicked()) {
	        
	        var predicted = totalBet + currentCoin;
	        console.log('predicted: ' + predicted);

	        if (currentCoin > game.bank) {
	          //alert("Bet amount cannot be larger than your bank!");
			  
			  vex.dialog.alert(msg2);
			  
	        }
	        else if(predicted.toFixed(3) > maxStake)
	        {
	        	//context.drawImage(betButtonDim, height * 0.82, height * 0.84, height * 0.13, height * 0.13);
	        	$('body').loadingModal({text: msg21, 'animation': 'wanderingCubes'});
	        	setTimeout(()=>{
	        		$('body').loadingModal('destroy');
	        	}, 1800);

	        }
	        else {
		  
		  
	          game.bank = game.bank - currentCoin;
	          totalBet += currentCoin;
	          console.log('totalBet: ' + totalBet);

	          update_bank();
	          addCoin(mouseX, mouseY);
	          input_numberGuess.push(
	            {bet: currentCoin, number: index+1}
	          );
			  
			  context.drawImage(betButton, height * 0.82, height * 0.84, height * 0.13, height * 0.13);
			  
	          console.log(JSON.stringify(input_numberGuess));
		
	        }
	      };

	    });

	    if (btnReset.checkClicked()) {
	      refreshCanvas();
	      game.bank += totalBet;
	      totalBet = 0;
	      update_bank();
	      
	      input_numberGuess = [];
	    };

	    if (btn_coin_1.checkClicked()){
			
			currentCoin = 0.005;
			loadBGBottom();
			context.strokeStyle = "#FF9800";
			context.lineWidth=4;
			roundRect(context, 35, height * 0.826 - 5, height * 0.1 + 10, height * 0.1 + 10, 10);
			
		}else if (btn_coin_10.checkClicked()) {

			currentCoin = 0.01;
			loadBGBottom();
			context.strokeStyle = "#FF9800";
			context.lineWidth=4;
			roundRect(context, 35 + height * 0.16, height * 0.826 - 5, height * 0.1 + 10, height * 0.1 + 10, 10);			
			
		}else if (btn_coin_100.checkClicked()) {
			
			currentCoin = 0.05;
			loadBGBottom();
			context.strokeStyle = "#FF9800";
			context.lineWidth=4;
			roundRect(context, 35 + height * 0.32, height * 0.826 - 5, height * 0.1 + 10, height * 0.1 + 10, 10);			
			
		}else if (btn_coin_500.checkClicked()) {

			currentCoin = 0.1;
			loadBGBottom();
			context.strokeStyle = "#FF9800";
			context.lineWidth=4;
			roundRect(context, 35 + height * 0.48, height * 0.826 - 5, height * 0.1 + 10, height * 0.1 + 10, 10);
			
		};
	}
  
}

function changeBettedImage(index) {
  input_numberGuess.forEach
  switch(index+1) {
    case 1:
      b1_image.src = 'img/b1_betted.png';
      //b1_image.style.border = "thin solid red"; 
      b1_image.onload = function(){
        context.drawImage(b1_image, 0, height/4, height/4, height/4);
      };
      break;
    default:
      break;
  }
}

var isBetGoing = false;
var clientSeedInput = '';
//action preformed when "下注" is pressed
function playGame() {
  	
	if(totalBet > 0)
	{
		isPlaceBetDisabled = true;
		clientSeedInput = makeRandomText();
		
		vex.dialog.buttons.YES.text = msg3;
		vex.dialog.buttons.NO.text = msg4;
		vex.dialog.open({
		    message: msg5,
		    callback: function (data) {
			
		        if (data) {
				
					isBetGoing = true;
				
					if(data.clientSeed != '')
						clientSeedInput = data.clientSeed;

					var amount = web3.toWei(totalBet.toFixed(4), 'ether');
          console.log('totalBet: ' + totalBet.toFixed(4));
					console.log(input_numberGuess);
					var bet = JSON.stringify(input_numberGuess);					
					console.log('bet: ' + bet);
		          	ethGameContract.placeBet(bet, hashedServerKey, clientSeedInput, {value: amount, from: web3.eth.defaultAccount}, (error, tx)=>{

		          		if(!error)
		          		{
		          			$('body').loadingModal({text: msg6, 'animation': 'wanderingCubes'});	

		          			var url = submitBetURL + "?seedHash=" + hashedServerKey + "&playerSeed=" + clientSeedInput + "&tx=" + tx + "&bet=" + bet + "&amount=" + amount + "&from=" + web3.eth.defaultAccount;
		          			console.log('url: ' + url);
                    $.getJSON(url, (data) => {

                      console.log(JSON.stringify(data));
                      if(data['result'])
                      {
                        game.payout = data['payout'];
                        game.betAmount = totalBet.toFixed(4);
                        if(isBetGoing)
                        {
                          $('body').loadingModal('destroy');

                          setTimeout(()=>{
                            requestUnhashedKey(clientSeedInput, data['serverSeed']);        
                            isBetGoing = false;
                          }, 600);
                        }
                        else
                          isPlaceBetDisabled = false;
                      }

                    });
		          		}
		          		else
		          		{
		          			console.log('error: ' + error);
                    isPlaceBetDisabled = false;
		          		}
						
		          	});


				
		        }
			
		    },
        /*
			afterClose: function()
			{
				if(isBetGoing)
				{
					$('body').loadingModal({text: msg6, 'animation': 'wanderingCubes'});
					setTimeout(function(){ 
				
						$('body').loadingModal('destroy');
				
						handleResultRelease();
				
					}, 3000);

					setTimeout(function(){ 
				
						handleResultRelease();
				
					}, 1000);							
				}
				else
					isPlaceBetDisabled = false;
			},
      */
			input: [
		        '<style>',
		            '.vex-custom-field-wrapper {',
		                'margin: 1em 0;',
		            '}',
		            '.vex-custom-field-wrapper > label {',
		                'display: inline-block;',
		                'margin-bottom: .2em;',
		            '}',
		        '</style>',
		        '<div class="vex-custom-field-wrapper">',
		            '<label for="amount">' + msg7 + '</label>',
		            '<div class="vex-custom-input-wrapper">',
		                '<input name="amount" type="text" value="' + totalBet.toFixed(4) + ' ether" disabled />',
		            '</div>',
		        '</div>',		        
		        '<div class="vex-custom-field-wrapper">',
		            '<label for="hashedServerKey">' + msg8 + '</label>',
		            '<div class="vex-custom-input-wrapper">',
		                '<input id="hashedServerKey" name="hashedServerKey" type="text" value="' + hashedServerKey + '" disabled />',
		            '</div><div style="text-align: right;"><button class="ui-button ui-widget ui-corner-all" onclick="copyToClipboardFromInput(\'#hashedServerKey\'); return false;">' + msg10 + '</button></div>',
		        '</div>',
		        '<div class="vex-custom-field-wrapper">',
		            '<label for="clientSeed">' + msg9 + '</label>',
		            '<div class="vex-custom-input-wrapper">',
		                '<input name="clientSeed" type="text" value="' + clientSeedInput + '" />',
		            '</div>',
		        '</div>'
		    ].join('')		
		});
	}	
}

function handleResultRelease()
{
	requestUnhashedKey(clientSeedInput);				
	isBetGoing = false;
}

function showVerifySummary(hashed, unhashed, tb)
{
	isPlaceBetDisabled = true;
	vex.dialog.buttons.YES.text = msg3;	
	vex.dialog.alert({
	    message: msg11,
	    callback: function (data) {
		
	    },
		afterClose: function()
		{
			isPlaceBetDisabled = false;
			requestServerKey();
		},
		input: [
	        '<style>',
	            '.vex-custom-field-wrapper {',
	                'margin: 1em 0;',
	            '}',
	            '.vex-custom-field-wrapper > label {',
	                'display: inline-block;',
	                'margin-bottom: .2em;',
	            '}',
	        '</style>',
	        '<div class="vex-custom-field-wrapper">',
	            '<label for="unhashedServerKey">' + msg12 + '</label>',
	            '<div class="vex-custom-input-wrapper">',
	                '<input id="unhashedServerKey" name="unhashedServerKey" type="text" value="' + unhashed + '" disabled />',
	            '</div><div style="text-align: right;"><button class="ui-button ui-widget ui-corner-all" onclick="copyToClipboardFromInput(\'#unhashedServerKey\'); return false;">' + msg10 + '</button></div>',
	        '</div>',	        
	        '<div class="vex-custom-field-wrapper">',
	            '<label for="hashedServerKey">' + msg13 + '</label>',
	            '<div class="vex-custom-input-wrapper">',
	                '<input id="hashedServerKey" name="hashedServerKey" type="text" value="' + hashed + '" disabled />',
	            '</div><div style="text-align: right;"><button class="ui-button ui-widget ui-corner-all" onclick="copyToClipboardFromInput(\'#hashedServerKey\'); return false;">' + msg10 + '</button></div>',
	        '</div>',
			'<div class="vex-custom-field-wrapper">',
            	msg14 + '"<a href="https://caligatio.github.io/jsSHA" target="_blank">' + msg15 + '</a>"',
			'</div>',
	        '<div class="vex-custom-field-wrapper">',
	            '<label for="clientSeed">' + msg16 + '</label>',
	            '<div class="vex-custom-input-wrapper">',
	                '<input name="clientSeed" type="text" value="' + clientSeedInput + '" disabled />',
	            '</div>',
	        '</div>'	        
	    ].join('')		
	});
}