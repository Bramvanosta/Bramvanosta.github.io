import RevealFx from './components/RevealFx';

const revealOne = new RevealFx(document.getElementById('revealOne'), {
  revealSettings : {
    bgcolor: '#FFFFFF',
    onCover: function(contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

revealOne.reveal();