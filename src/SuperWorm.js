var SuperWorm = cc.Sprite.extend({

	ctor: function( gameLayer ) {
		this.gameLayer = gameLayer;
		this.ken = gameLayer.ken;
		this.chicken = gameLayer.chicken;
		this._super();
		this.initWithFile('image/superWorm.png');
		this.scheduleUpdate();
	},

	update: function() {
		this.setPositionX( this.getPositionX() - 7 );
		if(this.getPositionX() < -50){
			this.getParent().removeChild( this );
		}

		if( !this.chicken.ghost && this.hit( this.chicken ) )
		{
			this.chicken.ghost = true;

			this.ken.setPositionX(this.ken.getPositionX()-20);
			this.white = cc.Sprite.create("image/chicPow2.png");
			cc.AudioEngine.getInstance().playEffect('effects/tada.mp3');

			
			this.white.setPosition( new cc.Point(0, 0));
			this.white.setAnchorPoint( new cc.Point(0, 0));

			this.gameLayer.addChild( this.white, 200 );
			this.scheduleOnce(function(){
				this.gameLayer.removeChild(this.white);
			},0.5)
			
			this.scheduleOnce(function(){
				this.chicken.ghost = false;
			},0.5)
			this.initWithFile('image/red.jpg')
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

})