var Background = cc.Node.extend({ 
	ctor: function() { 
		this._super();

		this.background1 = cc.Sprite.create(' image/background.jpg ');
		this.background1.setPosition( 400, 300 );
		this.addChild( this.background1 );

		this.background2 = cc.Sprite.create(' image/background.jpg '); 
		this.background2.setPosition( 1200, 300 ); 
		this.addChild( this.background2 ); 

		this.background3 = cc.Sprite.create(' image/background.jpg '); 
		this.background3.setPosition( 2000, 300 ); 
		this.addChild( this.background3 ); 
	},

	update: function( dt ) { 
		if ( this.background1.getPositionX() <= -400 ) { 
			this.background1.setPosition( new cc.Point( 2000, 300 ) ); 
		} 
		else if( this.background2.getPositionX() <= -400 ) { 
			this.background2.setPosition( new cc.Point( 2000, 300 ) ); 
		}
		else if( this.background3.getPositionX() <= -400 ) { 
			this.background3.setPosition( new cc.Point( 2000, 300 ) ); 
		}

		this.slideBackground(); 
	},

	slideBackground : function(){ 
		this.background1.setPosition( new cc.Point( this.background1.getPositionX() - 5 , 300 ) ); 
		this.background2.setPosition( new cc.Point( this.background2.getPositionX() - 5 , 300 ) ); 
		this.background3.setPosition( new cc.Point( this.background3.getPositionX() - 5 , 300 ) ); 
	},
});