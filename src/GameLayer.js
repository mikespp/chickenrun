var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.background = new Background();
        this.background.setPosition(new cc.Point( 0 , 0 ));
        this.addChild(this.background,1)
        this.background.scheduleUpdate();

        this.chicken = new Chicken();
        this.chicken.setPosition(new cc.Point( screenWidth/2 , screenHeight/5 ));
        this.addChild(this.chicken,1)
        this.chicken.scheduleUpdate();

        this.ken = new Ken();
        this.ken.setPosition(new cc.Point( screenWidth/4 , screenHeight/3.75 ) );
        this.addChild( this.ken,1 );
        this.ken.scheduleUpdate();

        this.createPumpkin(1);

        this.setKeyboardEnabled(true);

        this.scheduleUpdate();
        return true;
    },

    createPumpkin: function(x){

        this.scheduleOnce(function(){
            var pumpkin = new Pumpkin( this );
            pumpkin.setPosition( new cc.Point( screenWidth + 100 , screenHeight/5 ));
            this.addChild( pumpkin, 2 );
            this.createPumpkin(Math.floor(Math.random()*5) + 1);
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
        this.chicken.check_landed();
        this.chicken.still();
    },

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

