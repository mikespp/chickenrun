var Chicken = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'image/chic1.png' );
		this.vy = 0;
		this.g = -2.5;
		this.status = Chicken.STATUS.GROUND;
		this.still();
	},

	jump: function(){
		this.vy = 25;
		this.status = Chicken.STATUS.JUMP;
	},

	slide: function() {
		if(this.status = Chicken.STATUS.SLIDE){
			this.stopAction(this.chicAnimate);
			this.initWithFile( 'image/chicSlide.png' );
		}
	},

	still: function() {
		var chicAnimation = new cc.Animation.create();
		chicAnimation.setDelayPerUnit(0.2);
		chicAnimation.addSpriteFrameWithFile('image/chic1.png');
		chicAnimation.addSpriteFrameWithFile('image/chic2.png');

		if( this.chicAnimate ) this.stopAction( this.chicAnimate );
		this.chicAnimate = new cc.RepeatForever.create(cc.Animate.create(chicAnimation));
		this.runAction(this.chicAnimate);
	},

	check_landed: function(){
		if(this.getPositionY() <= screenHeight/2){
			this.setPositionY(screenHeight/2);
			this.status = Chicken.STATUS.GROUND;
		}
	},

	update: function(){
		this.updateY();
	},

	updateY: function(){
		if(this.status == Chicken.STATUS.GROUND){
			this.vy = 0;
		}
		else if(this.status == Chicken.STATUS.JUMP){
			// this.vy = this.g;
			this.setPositionY( this.getPositionY() + this.vy );
			this.status = Chicken.STATUS.FALL;
		}
		else if(this.status == Chicken.STATUS.FALL){
			this.vy += this.g;
			this.setPositionY( this.getPositionY() + this.vy );

			if(this.getPositionY() <= screenHeight/2){
				this.status = Chicken.STATUS.GROUND;
				this.setPositionY(screenHeight/2);
			}
		}
	}
});

Chicken.STATUS = {
	GROUND : 0,
	SLIDE : 3,
	JUMP : 1,
	FALL : 2
};