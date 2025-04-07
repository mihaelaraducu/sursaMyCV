
import $ from 'jquery';
global.$ = global.jQuery = $;

let animated = false;

function isElementInViewport(el, offset = 100) {
  const elementTop = el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return elementTop <= windowHeight - offset && elementBottom >= 0;
}

function resetSkills() {
  // Reset progress bar animations by pausing them
  $('.progress-bar').css('animation-play-state', 'paused');
  $('.pull-right').text('0%'); // Reset the percentage to 0%
}

function animateSkills() {
  // Trigger progress bar animations by resuming them
  $('.progress-bar').css('animation-play-state', 'running');

  // Animate percentages
  $('.pull-right').each(function () {
    const target = parseInt($(this).text()); // Get the target percentage from the text
    const $this = $(this);
    $this.text('0%'); // Reset the percentage to 0%
    $({ countNum: 0 }).animate(
      { countNum: target },
      {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.text(Math.floor(this.countNum) + '%'); // Update the percentage during animation
        },
        complete: function () {
          $this.text(this.countNum + '%'); // Ensure the final percentage is correct
        }
      }
    );
  });
}

// Trigger animation on scroll
$(window).on('scroll', function () {
  const skillsSection = document.getElementById('skills');
  if (!animated && isElementInViewport(skillsSection, 150)) {
    resetSkills(); // Reset progress bars before animating
    animateSkills();
    animated = true;
  }
});

// Trigger animation on "More about me" button click
$('#more-about-me-btn').on('click', function () {
  const skillsSection = document.getElementById('skills');
  skillsSection.scrollIntoView({ behavior: 'smooth' });
  if (!animated) {
    resetSkills(); // Reset progress bars before animating
    animateSkills();
    animated = true;
  }
});
