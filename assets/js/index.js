import waitFor from './helpers/waitFor';

import RevealFx from './components/RevealFx';
import MenuItem from './components/MenuItem';

const revealOne = new RevealFx(document.getElementById('revealOne'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #f19872, #e86c9a)',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const revealTwo = new RevealFx(document.getElementById('revealTwo'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #f19872, #e86c9a)',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const revealThree = new RevealFx(document.getElementById('revealThree'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #f19872, #e86c9a)',
    direction: 'bt',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const revealFour = new RevealFx(document.getElementById('revealFour'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #3a3d98, #6f22b9)',
    direction: 'lr',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const revealFive = new RevealFx(document.getElementById('revealFive'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #3a3d98, #6f22b9)',
    direction: 'lr',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const revealSix = new RevealFx(document.getElementById('revealSix'), {
  revealSettings : {
    background: 'linear-gradient(45deg, #3a3d98, #6f22b9)',
    direction: 'lr',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

const items = Array.from(document.querySelectorAll('.c-links .c-links__item'));
items.forEach(item => new MenuItem(item));

async function init() {
  revealOne.reveal();
  await waitFor(300);
  revealTwo.reveal();
  await waitFor(200);
  revealThree.reveal();
  await waitFor(500);
  revealFour.reveal();
  await waitFor(150);
  revealFive.reveal();
  await waitFor(150);
  revealSix.reveal();
}

init();
