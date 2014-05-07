var Ken = cc.Sprite.extend({
	
	ctor: function() {
		this._super();
		this.initWithFile( 'image/ken1.png' );

		this.still();
	},

	slide: function() {
		this.stopAction(this.kenAnimate);
		this.initWithFile( 'image/chicSlide.png' );
	},

	still: function() {
		var kenAnimation = new cc.Animation.create();
		kenAnimation.setDelayPerUnit(0.2);
		kenAnimation.addSpriteFrameWithFile('image/ken1.png');
		kenAnimation.addSpriteFrameWithFile('image/ken2.png');
		kenAnimation.addSpriteFrameWithFile('image/ken3.png');
		kenAnimation.addSpriteFrameWithFile('image/ken4.png');


		this.kenAnimate = new cc.RepeatForever.create(cc.Animate.create(kenAnimation));
		this.runAction(this.kenAnimate);
	}
})