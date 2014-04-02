var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.chicken = new Chicken();
        this.chicken.setPosition(new cc.Point( screenWidth/2 , screenHeight/2 ));
        this.addChild(this.chicken,1)
        this.chicken.scheduleUpdate();

        this.setKeyboardEnabled(true);

        return true;
    },

    onKeyDown: function( e ) {
        if( e == cc.KEY.shift ){
            this.chicken.slide();
        }
    },

    onKeyUp: function() {
        this.chicken.still();
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

