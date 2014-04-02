var Chicken = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'image/chic1.png' );

		this.still();
	},

	slide: function() {
		this.stopAction(this.chicAnimate);
		this.initWithFile( 'image/chicSlide.png' );
	},

	still: function() {
		var chicAnimation = new cc.Animation.create();
		chicAnimation.setDelayPerUnit(0.2);
		chicAnimation.addSpriteFrameWithFile('image/chic1.png');
		chicAnimation.addSpriteFrameWithFile('image/chic2.png');

		this.chicAnimate = new cc.RepeatForever.create(cc.Animate.create(chicAnimation));
		this.runAction(this.chicAnimate);
	}
})