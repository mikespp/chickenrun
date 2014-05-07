var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBackground();
        this.createChicken();
        this.createKen();


        this.startDate = new Date();
        this.startTime = this.startDate.getTime();
        this.createLabel();

        this.createPumpkin(1);
        this.createCactus(2);
        this.createWorm(1);

        this.setTouchEnabled(true); 
        this.setTouchMode(1);

        this.setKeyboardEnabled(true);

        this.scheduleUpdate();
        cc.AudioEngine.getInstance().playMusic('musics/march.mp3', true);
        return true;
    },

    createBackground: function(){
        this.background = new Background();
        this.background.setPosition(new cc.Point( 0 , 0 ));
        this.addChild(this.background,1)
        this.background.scheduleUpdate();
    },

    createChicken: function(){
        this.chicken = new Chicken();
        this.chicken.setPosition(new cc.Point( screenWidth/2 , screenHeight/5 ));
        this.addChild(this.chicken,1)
        this.chicken.scheduleUpdate();
    },

    createKen: function(){
        this.ken = new Ken();
        this.ken.setPosition(new cc.Point( screenWidth/4 , screenHeight/3.75 ) );
        this.addChild( this.ken,1 );
        this.ken.scheduleUpdate();
    },


    createPumpkin: function(x){

        this.scheduleOnce(function(){
            var pumpkin = new Pumpkin( this );
            pumpkin.setPosition( new cc.Point( screenWidth + 100 , screenHeight/5 ));
            this.addChild( pumpkin, 2 );
            this.createPumpkin(Math.floor(Math.random()*2) + 1);
        }, x);

    },
    createCactus: function(x){

        this.scheduleOnce(function(){
            var cactus = new Cactus( this );
            cactus.setPosition( new cc.Point( screenWidth + 100 , screenHeight/4 ));
            this.addChild( cactus, 2 );
            this.createCactus(Math.floor(Math.random()*10) + 1);
        }, x);

    },
    createWorm: function(x){
        
        this.scheduleOnce(function(){
            var worm = new SuperWorm( this );
            worm.setPosition( new cc.Point( screenWidth + 100 , screenHeight/2 ));
            this.addChild( worm, 3 );
            this.createWorm(Math.floor(Math.random()*5) + 10);
        }, x);

    },
    onKeyDown: function( e ) {
        if( e == cc.KEY.shift ){
            if(this.chicken.status == Chicken.STATUS.GROUND){
                this.chicken.status = Chicken.STATUS.SLIDE;
                this.chicken.slide();
            }
        }
        if( e==cc.KEY.space ){
            this.chicken.jump();
        }
    },

    

    onKeyUp: function() {
        this.chicken.checkLanded();
        this.chicken.still();
    },

    onTouchBegan:function( touch, event ) { 
        if( this.chicken.status == Chicken.STATUS.DEAD ){
            var director = cc.Director.getInstance(); 
            director.replaceScene(cc.TransitionFade.create(1.5, new StartScene())); 
        }
    } ,

    createLabel: function() { 
        this.scoreLabel = cc.LabelTTF.create( this.score, 'Arial', 50 ); 
        this.scoreLabel.setColor( new cc.Color3B( 0, 0, 0 ) );
        this.scoreLabel.setPosition( cc.p( screenWidth -100, screenHeight -80 ) ); 
        this.addChild( this.scoreLabel , 4 ); 
    },

    updateScoreLabel: function() { 
        var currentDate = new Date(); 
        var time = ( currentDate.getTime() - this.startTime ) / 1000; 
        this.score = time.toFixed(1); 
        this.scoreLabel.setString( (this.score) ); 
    },

    update: function(){
        if(this.chicken.getPositionX()-40 <= this.ken.getPositionX()){
            this.chicken.ghost = true;
            cc.AudioEngine.getInstance().playEffect('effects/scream.mp3')
            cc.AudioEngine.getInstance().playMusic('effects/end.mp3',true);
            this.over = cc.Sprite.create("image/kfc.jpg");
            this.over.setPosition( new cc.Point(0, 0));
            this.over.setAnchorPoint( new cc.Point(0, 0));

            this.chicken.status = Chicken.STATUS.DEAD;

            this.addChild( this.over, 201 );
            this.unscheduleUpdate();

            this.scoreLabel = cc.LabelTTF.create( this.score, 'Arial', 50 ); 
            this.scoreLabel.setColor( new cc.Color3B( 0, 0, 0 ) );
            this.scoreLabel.setPosition( cc.p( screenWidth / 1.45, screenHeight / 2 ) ); 
            this.addChild( this.scoreLabel , 201 ); 
            
        } else{
            this.updateScoreLabel();
        }
        
    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

