# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-11-17

### Fixed
- Fixed re-rendering issue that caused text field to lose focus
- Fixed dropdown menu closing unexpectedly during selection
- Added event propagation stopping to prevent Home Assistant keyboard shortcuts from interfering
- Text field now properly retains its value during updates
- Improved stability when interacting with form elements

### Changed
- Card only re-renders when services change or during initial load
- All input events now stop propagation to prevent conflicts with HA shortcuts

## [1.0.0] - 2025-11-16

### Added
- Initial release of Notify Card
- Automatic detection of all notify services in Home Assistant
- Dropdown selector for choosing notification service
- Text area for composing messages
- Send button with visual feedback
- Success/error status messages
- Support for mobile notifications (notify.mobile_app_*)
- Support for Telegram notifications (notify.telegram)
- Support for all other notify.* services
- Keyboard shortcut (Ctrl+Enter) to send message
- Customizable card title
- Customizable button text
- HACS compatibility
- Czech language support in documentation

### Features
- Clean, modern UI that matches Home Assistant design
- Auto-discovery of notification services
- Real-time feedback on notification status
- Configurable default service
- Responsive design
