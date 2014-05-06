var Cactus = cc.Sprite.extend ( { 
	ctor: function (gameLayer) {
		this.gameLayer = gameLayer;
		this.ken = gameLayer.ken;
		this.chicken = gameLayer.chicken;
		this._super();
		this.initWithFile('image/cactus.png');
		this.scheduleUpdate();
	},
	update: function() {
		this.setPositionX( this.getPositionX() - 5 );
		if(this.getPositionX() < -50){
			this.getParent().removeChild( this );
		}

		if( !this.chicken.ghost && this.hit( this.chicken ) )
		{
			this.chicken.ghost = true;
			this.ken.setPositionX(this.ken.getPositionX()+20);
			this.white = cc.Sprite.create("image/hurt.png");
			cc.AudioEngine.getInstance().playEffect('effects/hit.mp3');
			this.white.setScale( 100 );
			this.white.setPosition( new cc.Point(0, 0));
			this.white.setAnchorPoint( new cc.Point(0, 0));

			this.gameLayer.addChild( this.white, 200 );
			this.scheduleOnce(function(){
				this.gameLayer.removeChild(this.white);
			},0.2)
			
			this.scheduleOnce(function(){
				this.chicken.ghost = false;
			},0.5)
		}

		if( this.hit( this.ken ) ){
			this.initWithFile('image/brokenCactus.png');
			this.setPositionY(screenHeight/4.5);
		}

		if(this.chicken.getPositionX()-20 <= this.ken.getPositionX()){
			this.chicken.ghost = true;
		}
	},

	hit: function( other ) {
		var thisX = this.getPositionX();
		var thisY = this.getPositionY();
		var otherX = other.getPositionX();
		var otherY = other.getPositionY();

		return Math.abs( thisX - otherX ) <= 50 && Math.abs( thisY - otherY ) <= 50;
	}
} )