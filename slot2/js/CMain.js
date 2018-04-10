function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;    

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
	
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        
        // initialize web3
        if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
        } else {
          // set the provider you want from Web3.providers
          web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

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

        var EthGame = web3.eth.contract(abi);
        _oData.ethGameContract = EthGame.at(contractAddress);
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };

    this.soundLoaded = function(){
         _iCurResource++;
		 var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
		
         if(_iCurResource === RESOURCE_TO_LOAD){
              new CSlotSettings();
              _oPreloader.unload();
            
              this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }
		
        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/press_but.ogg", "press_but");
                createjs.Sound.registerSound("./sounds/win.ogg", "win");
                createjs.Sound.registerSound("./sounds/reels.ogg", "reels");
                createjs.Sound.registerSound("./sounds/reel_stop.ogg", "reel_stop",6);
                createjs.Sound.registerSound("./sounds/start_reel.ogg", "start_reel",6);
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/press_but.mp3", "press_but");
                createjs.Sound.registerSound("./sounds/win.mp3", "win");
                createjs.Sound.registerSound("./sounds/reels.mp3", "reels");
                createjs.Sound.registerSound("./sounds/reel_stop.mp3", "reel_stop",6);
                createjs.Sound.registerSound("./sounds/start_reel.mp3", "start_reel",6);
        }
        RESOURCE_TO_LOAD += 5;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_bg","./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable","./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("mask_slot","./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but","./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but","./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but","./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but","./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim","./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg","./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg","./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        
        for(var i=1;i<NUM_SYMBOLS+1;i++){
            s_oSpriteLibrary.addSprite("symbol_"+i,"./sprites/symbol_"+i+".png");
            s_oSpriteLibrary.addSprite("symbol_"+i+"_anim","./sprites/symbol_"+i+"_anim.png");
        }
        
        for(var j=1;j<NUM_PAYLINES+1;j++){
            s_oSpriteLibrary.addSprite("payline_"+j,"./sprites/payline_"+j+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

        if(_iCurResource === RESOURCE_TO_LOAD){
            new CSlotSettings();
            _oPreloader.unload();
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu(_oData);
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
	createjs.Sound.setMute(true);
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(s_bAudioActive){
                createjs.Sound.setMute(false);
        }
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
                
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    _oData = oData;
    PAYTABLE_VALUES = new Array();
    for(var i=0;i<7;i++){
        PAYTABLE_VALUES[i] = oData["paytable_symbol_"+(i+1)];
    }
    ENABLE_FULLSCREEN = _oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;
    SHOW_CREDITS = _oData.show_credits;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;