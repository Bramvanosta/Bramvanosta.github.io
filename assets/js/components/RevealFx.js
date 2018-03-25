import anime from 'animejs';

import createDOMEl from './../helpers/createDomElement';

const defaultOptions = {
  // If true, then the content will be hidden until it´s "revealed".
  isContentHidden: true,
  // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
  revealSettings: {
    // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
    direction: 'lr',
    // Revealer´s background color.
    bgcolor: '#f0f0f0',
    // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
    duration: 500,
    // Animation easing. This is the easing to "cover" and also "uncover" the element.
    easing: 'easeInOutQuint',
    // percentage-based value representing how much of the area should be left covered.
    coverArea: 0,
    // Callback for when the revealer is covering the element (halfway through of the whole animation).
    onCover: function(contentEl, revealerEl) { return false; },
    // Callback for when the animation starts (animation start).
    onStart: function(contentEl, revealerEl) { return false; },
    // Callback for when the revealer has completed uncovering (animation end).
    onComplete: function(contentEl, revealerEl) { return false; }
  }
}

class RevealFx {
  constructor(el, options) {
    this.el = el;
    this.options = { ...defaultOptions, ...options };

    this.init();
  }

  init() {
    this.layout();
  }

  layout() {
    const position = getComputedStyle(this.el).position;

    if (position !== 'fixed' && position !== 'absolute' && position !== 'relative') {
      this.el.style.position = 'relative';
    }

    this.content = createDOMEl('div', 'block-revealer__content', this.el.innerHTML);

    if (this.options.isContentHidden) {
      this.content.style.opacity = 0;
    }

    this.revealer = createDOMEl('div', 'block-revealer__element');
    this.el.classList.add('block-revealer');
    this.el.innerHTML = '';
    this.el.appendChild(this.content);
    this.el.appendChild(this.revealer);
  }

  getTransformSettings(direction) {
		let val, origin, origin_2;

		switch (direction) {
			case 'lr' : 
				val = 'scale3d(0,1,1)';
				origin = '0 50%';
				origin_2 = '100% 50%';
				break;
			case 'rl' : 
				val = 'scale3d(0,1,1)';
				origin = '100% 50%';
				origin_2 = '0 50%';
				break;
			case 'tb' : 
				val = 'scale3d(1,0,1)';
				origin = '50% 0';
				origin_2 = '50% 100%';
				break;
			case 'bt' : 
				val = 'scale3d(1,0,1)';
				origin = '50% 100%';
				origin_2 = '50% 0';
				break;
			default : 
				val = 'scale3d(0,1,1)';
				origin = '0 50%';
				origin_2 = '100% 50%';
				break;
		};

		return {
			val,
			origin: { initial: origin, halfway: origin_2 },
		};
  }
  
  reveal(revealSettingsParam) {
		if (this.isAnimating) {
			return false;
    }
    
		this.isAnimating = true;
		
		const defaults = {
      duration: 500,
      easing: 'easeInOutQuint',
      delay: 0,
      bgcolor: '#f0f0f0',
      direction: 'lr',
      coverArea: 0
    };

    const revealSettings = revealSettingsParam || this.options.revealSettings;
    const direction = revealSettings.direction || defaults.direction;
    const transformSettings = this.getTransformSettings(direction);

		this.revealer.style.WebkitTransform = this.revealer.style.transform =  transformSettings.val;
		this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =  transformSettings.origin.initial;
		
		this.revealer.style.backgroundColor = revealSettings.bgcolor || defaults.bgcolor;
		
		this.revealer.style.opacity = 1;

    let animationSettings_2 = {
      complete: () => {
        this.isAnimating = false;
        if (typeof revealSettings.onComplete === 'function') {
          revealSettings.onComplete(this.content, this.revealer);
        }
      }
    };

    let animationSettings = {
      delay: revealSettings.delay || defaults.delay,
      complete: () => {
        this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin = transformSettings.origin.halfway;		
        if (typeof revealSettings.onCover === 'function') {
          revealSettings.onCover(this.content, this.revealer);
        }

        anime(animationSettings_2);		
      }
    };

		animationSettings.targets = animationSettings_2.targets = this.revealer;
		animationSettings.duration = animationSettings_2.duration = revealSettings.duration || defaults.duration;
		animationSettings.easing = animationSettings_2.easing = revealSettings.easing || defaults.easing;

    const coverArea = revealSettings.coverArea || defaults.coverArea;
    
		if (direction === 'lr' || direction === 'rl') {
			animationSettings.scaleX = [0, 1];
			animationSettings_2.scaleX = [1, coverArea / 100];
		} else {
			animationSettings.scaleY = [0, 1];
			animationSettings_2.scaleY = [1, coverArea / 100];
		}

		if (typeof revealSettings.onStart === 'function') {
			revealSettings.onStart(this.content, this.revealer);
    }
    
		anime(animationSettings);
	};
}

export default RevealFx;
