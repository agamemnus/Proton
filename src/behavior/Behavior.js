(function(Proton, undefined) {
	Behavior.id = 0;
	/**
	 * The Behavior class is the base for the other Behavior
	 *
	 * @class Behavior
	 * @constructor
	 */
	function Behavior(life, easing) {
		/**
		 * The behavior's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'Behavior_' + Behavior.id++;
		this.life = Proton.Util.initValue(life, Infinity);
		/**
		 * The behavior's decaying trend, for example Proton.easeOutQuart;
		 * @property easing
		 * @type {String}
		 * @default Proton.easeLinear
		 */
		this.easing = Proton.ease.setEasingByName(easing);
		this.age = 0;
		this.energy = 1;
		/**
		 * The behavior is Dead;
		 * @property dead
		 * @type {Boolean}
		 */
		this.dead = false;
		/**
		 * The behavior's parents array;
		 * @property parents
		 * @type {Array}
		 */
		this.parents = [];
		/**
		 * The behavior name;
		 * @property name
		 * @type {string}
		 */
		this.name = 'Behavior';
	}


	Behavior.prototype = {
		/**
		 * Reset this behavior's parameters
		 *
		 * @method reset
		 * @param {Number} this behavior's life
		 * @param {String} this behavior's easing
		 */
		reset : function(life, easing) {
			this.life = Proton.Util.initValue(life, Infinity);
			this.easing = Proton.Util.initValue(easing, Proton.ease.setEasingByName(Proton.easeLinear));
		},
		/**
		 * Normalize a force by 1:100;
		 *
		 * @method normalizeForce
		 * @param {Proton.Vector2D} force 
		 */
		normalizeForce : function(force) {
			return force.multiplyScalar(Proton.MEASURE);
		},

		/**
		 * Normalize a value by 1:100;
		 *
		 * @method normalizeValue
		 * @param {Number} value
		 */
		normalizeValue : function(value) {
			return value * Proton.MEASURE;
		},

		/**
		 * Initialize the behavior's parameters for all particles
		 *
		 * @method initialize
		 * @param {Proton.Particle} particle
		 */
		initialize : function(particle) {
		},
		
		/**
		 * Apply this behavior for all particles every time
		 *
		 * @method applyBehavior
		 * @param {Proton.Particle} particle
		 * @param {Number} the integrate time 1/ms
		 * @param {Int} the particle index
		 */
		applyBehavior : function(particle, time, index) {
			this.age += time;
			if (this.age >= this.life || this.dead) {
				this.energy = 0;
				this.dead = true;
				this.destroy();
			} else {
				var scale = this.easing(particle.age / particle.life);
				this.energy = Math.max(1 - scale, 0);
			}
		},
		
		/**
		 * Destroy this behavior
		 * @method destroy
		 */
		destroy : function() {
			var index;
			var length = this.parents.length, i;
			for ( i = 0; i < length; i++) {
				this.parents[i].removeBehavior(this);
			}

			this.parents = [];
		}
	};

	Proton.Behavior = Behavior;
})(Proton);
