# Sheets Account Popover Dismiss

A Chrome extension that automatically dismisses the "You're currently signed in as..." popover in Google Sheets.

## The Problem

When you open a Google Sheet, a popover appears in the top-right corner showing which account you're signed in as. While this popover is open:

- Keyboard shortcuts like `Cmd+F` / `Ctrl+F` don't work
- Keystrokes go to the focused cell instead of the expected dialog
- You end up accidentally overwriting cell contents

This is a small but persistent annoyance that interrupts your workflow every single time you open a spreadsheet.

Multiply this by the billions of times Google Sheets is opened annually, and you're looking at a mass extinction event for human productivity.

## The Solution

This extension automatically clicks the "OK" button on that popover as soon as it appears, so your keyboard shortcuts work immediately.

## Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `sheets-account-popover-dismiss` folder
6. Open any Google Sheet - the popover should auto-dismiss!

## How It Works

The extension uses a content script that:

1. Watches for DOM changes using `MutationObserver`
2. Detects when the `.active-account-dialog` element appears
3. Verifies it's the "signed in as" dialog (not another modal)
4. Clicks the OK button automatically
5. Stops observing to minimize performance impact

## Privacy

This extension:
- Does **not** collect any data
- Does **not** make any network requests
- Does **not** access your Google account information
- Only runs on `docs.google.com/spreadsheets/*` pages
- Has no special permissions beyond running on Google Sheets

## Contributing

Found a bug or have a suggestion? Please open an issue or submit a pull request.

## License

MIT License - feel free to use, modify, and distribute.

---

*This extension was 100% vibe coded by [Claude Code](https://claude.com/claude-code).*
