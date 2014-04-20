var Background = cc.Node.extend({ 
	ctor: function() { 
		this._super();

		this.background1 = cc.Sprite.create(' image/background.jpg '); 
		this.background1.setPosition( 400, 300 ); 
		this.addChild( this.background1 );

		this.background2 = cc.Sprite.create(' image/backgroud.jpg '); 
		this.background2.setPosition( 400, 1200 ); 
		this.addChild( this.background2 ); 
	},

	update: function( dt ) { 
		if ( this.background1.getPositionX() < -400 ) { 
			this.background1.setPosition( new cc.Point( this.background2.getPositionX()+800 , 300) ); 
		} 
		else if( this.background2.getPositionX() < -400 ) { 
			this.background2.setPosition( new cc.Point( this.background1.getPositionX()+800 , 300 ) ); 
		}

		this.slideBackground(); 
	},

	slideBackground : function(){ 
		this.background1.setPosition( new cc.Point( this.background1.getPositionX() - 4 , 300 ) ); 
		this.background2.setPosition( new cc.Point( this.background2.getPositionY() - 4 , 300 ) ); 
	},
});