# Notify Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

Custom Lovelace card for sending notifications in Home Assistant with an easy-to-use interface.

<img width="515" height="410" alt="image" src="https://github.com/user-attachments/assets/8e1d96c2-16d0-4fb7-968c-243e865f0421" />

## Features

- 📱 **Select notification service** - Choose from all available notify services (mobile app, Telegram, etc.)
- ✉️ **Message input** - Text field for composing your notification message
- 🚀 **One-click send** - Send notifications with a single click
- 🔍 **Auto-discovery** - Automatically detects all available `notify.*` services in your Home Assistant

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to "Frontend"
3. Click the menu (three dots) in the top right
4. Select "Custom repositories"
5. Add this repository URL
6. Select category "Lovelace"
7. Click "Install"
8. Restart Home Assistant

### Manual Installation

1. Download `notify-card.js` from the latest release
2. Copy it to `config/www/notify-card.js` in your Home Assistant
3. Add the resource in your Lovelace dashboard:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/notify-card.js`
   - Resource type: `JavaScript Module`
4. Restart Home Assistant

## Usage

### Basic Configuration

Add the card to your Lovelace dashboard:

```yaml
type: custom:notify-card
title: Send Notification
```

### Advanced Configuration

```yaml
type: custom:notify-card
title: Odeslat notifikaci
default_service: notify.mobile_app_your_phone
show_title: true
send_button_text: Odeslat
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Send Notification" | Card title |
| `default_service` | string | (first available) | Default notify service to select |
| `show_title` | boolean | true | Show/hide card title |
| `send_button_text` | string | "Send" | Text on the send button |

## Screenshots

![Notify Card](https://via.placeholder.com/500x300?text=Notify+Card+Screenshot)

## Example Services

The card will automatically detect all your notify services:
- `notify.mobile_app_iphone`
- `notify.mobile_app_android`
- `notify.telegram`
- `notify.alexa_media`
- And any other `notify.*` service in your Home Assistant


## License

MIT License - feel free to use and modify as needed.

## Support

If you like this card, please ⭐ star this repository!

Found a bug or have a feature request? Please open an issue.


## http://buymeacoffee.com/jakubhruby


<img width="150" height="150" alt="qr-code" src="https://github.com/user-attachments/assets/2581bf36-7f7d-4745-b792-d1abaca6e57d" />
