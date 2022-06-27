import { useEffect } from 'react';

export function useResizeAnimationStopper() {
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    // Setting an event listener for when the user resizes the window
    window.addEventListener('resize', () => {
      // Adding the utility class
      document.body.classList.add('resize-animation-stopper');
      // Clearing the timeout in case of having a previous one set
      clearTimeout(resizeTimer);
      // Setting the timeout to remove the utility class, resuming the animations
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 400);
    });
  }, []);
}
