(function(Proton, undefined) {
	/**
	 * The BehaviorEmitter class inherits from Proton.Emitter
	 *
	 * use the BehaviorEmitter you can add behaviors to self;
	 * @class Proton.BehaviorEmitter
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 */
	function BehaviorEmitter(pObj) {
		this.selfBehaviors = [];
		BehaviorEmitter._super_.call(this, pObj);
	};

	Proton.Util.inherits(BehaviorEmitter, Proton.Emitter);
	/**
	 * add the Behavior to emitter;
	 *
	 * you can use Behaviors array:emitter.addSelfBehavior(Behavior1,Behavior2,Behavior3);
	 * @method addSelfBehavior
	 * @param {Proton.Behavior} behavior like this new Proton.Color('random')
	 */
	BehaviorEmitter.prototype.addSelfBehavior = function() {
		var length = arguments.length, i;
		for ( i = 0; i < length; i++) {
			this.selfBehaviors.push(arguments[i]);
		}
	};
	/**
	 * remove the Behavior for self
	 * @method removeSelfBehavior
	 * @param {Proton.Behavior} behavior a behavior
	 */
	BehaviorEmitter.prototype.removeSelfBehavior = function(behavior) {
		var index = this.selfBehaviors.indexOf(behavior);
		if (index > -1)
			this.selfBehaviors.splice(index, 1);
	};

	BehaviorEmitter.prototype.update = function(time) {
		BehaviorEmitter._super_.prototype.update.call(this, time);

		if (!this.sleep) {
			var length = this.selfBehaviors.length, i;
			for ( i = 0; i < length; i++) {
				this.selfBehaviors[i].applyBehavior(this, time, i)
			}
		}
	}

	Proton.BehaviorEmitter = BehaviorEmitter;
})(Proton);
