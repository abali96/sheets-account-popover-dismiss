/**
 * Sheets Account Popover Dismiss
 *
 * Automatically dismisses the "You're currently signed in as..." popover
 * that appears when opening Google Sheets, which blocks keyboard shortcuts
 * until manually dismissed.
 */

(function() {
  'use strict';

  const DIALOG_SELECTOR = '.modal-dialog.active-account-dialog';
  const OK_BUTTON_SELECTOR = '.goog-buttonset-default';
  const SIGNED_IN_TEXT = 'signed in';

  let observer = null;
  let dismissed = false;

  /**
   * Attempts to dismiss the account popover if it exists and matches expected criteria
   */
  function tryDismissPopover() {
    const dialog = document.querySelector(DIALOG_SELECTOR);

    if (!dialog) return false;

    // Verify this is the "signed in as" dialog, not some other modal
    const dialogText = dialog.textContent || '';
    if (!dialogText.toLowerCase().includes(SIGNED_IN_TEXT)) {
      return false;
    }

    // Find and click the OK button
    const okButton = dialog.querySelector(OK_BUTTON_SELECTOR);
    if (okButton && okButton.textContent.trim() === 'OK') {
      okButton.click();
      dismissed = true;
      return true;
    }

    return false;
  }

  /**
   * Sets up MutationObserver to watch for the popover appearing
   */
  function setupObserver() {
    if (observer) {
      observer.disconnect();
    }

    dismissed = false;

    observer = new MutationObserver((mutations) => {
      // Don't keep checking if we've already dismissed
      if (dismissed) {
        observer.disconnect();
        return;
      }

      // Check if the dialog has appeared
      if (tryDismissPopover()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also try immediately in case dialog is already present
    if (tryDismissPopover()) {
      observer.disconnect();
    }

    // Safety timeout: stop observing after 30 seconds to avoid unnecessary overhead
    setTimeout(() => {
      if (observer) {
        observer.disconnect();
      }
    }, 30000);
  }

  // Handle SPA navigation (Google Sheets is a single-page app)
  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      // Re-arm the observer on navigation
      setupObserver();
    }
  });

  // Start observing
  if (document.body) {
    setupObserver();
    urlObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setupObserver();
      urlObserver.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
