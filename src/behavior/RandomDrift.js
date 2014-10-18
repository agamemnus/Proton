(function(Proton, undefined) {
	function RandomDrift(driftX, driftY, delay, life, easing) {
		RandomDrift._super_.call(this, life, easing);
		this.reset(driftX, driftY, delay);
		this.time = 0;
		this.name = "RandomDrift";
	}


	Proton.Util.inherits(RandomDrift, Proton.Behavior);
	RandomDrift.prototype.reset = function(driftX, driftY, delay, life, easing) {
		this.panFoce = new Proton.Vector2D(driftX, driftY);
		this.panFoce = this.normalizeForce(this.panFoce);
		this.delay = delay;
		if (life)
			RandomDrift._super_.prototype.reset.call(this, life, easing);
	}

	RandomDrift.prototype.applyBehavior = function(particle, time, index) {
		RandomDrift._super_.prototype.applyBehavior.call(this, particle, time, index);
		this.time += time;
		if (this.time >= this.delay) {
			
			particle.a.addXY(Proton.MathUtils.randomAToB(-this.panFoce.x, this.panFoce.x), Proton.MathUtils.randomAToB(-this.panFoce.y, this.panFoce.y));
			this.time = 0;
		};
	};

	Proton.RandomDrift = RandomDrift;
})(Proton);
