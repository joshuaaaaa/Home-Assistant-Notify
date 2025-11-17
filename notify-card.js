class NotifyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._notifyServices = [];
    this._isInitialized = false;
    this._messageValue = '';
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = {
      title: config.title || 'Send Notification',
      default_service: config.default_service || null,
      show_title: config.show_title !== false,
      send_button_text: config.send_button_text || 'Send',
      ...config
    };
    this._isInitialized = false;
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    // Only update and render if services changed or first initialization
    const servicesChanged = this._updateNotifyServices();

    if (!this._isInitialized || servicesChanged) {
      this.render();
      this._isInitialized = true;
    }
  }

  _updateNotifyServices() {
    if (!this._hass) return false;

    // Get all services
    const services = this._hass.services;

    // Find all notify services
    const oldServicesCount = this._notifyServices.length;
    if (services.notify) {
      this._notifyServices = Object.keys(services.notify).map(service => ({
        value: `notify.${service}`,
        label: this._formatServiceName(service)
      }));
    }

    // Set default service if not already set
    if (!this._selectedService && this._notifyServices.length > 0) {
      this._selectedService = this._config.default_service || this._notifyServices[0].value;
    }

    // Return true if services changed
    return oldServicesCount !== this._notifyServices.length;
  }

  _formatServiceName(service) {
    // Format service name for display
    return service
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  render() {
    if (!this.shadowRoot) return;

    // Save current message value before re-render
    const messageInput = this.shadowRoot.getElementById('message');
    if (messageInput) {
      this._messageValue = messageInput.value;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
        }
        .card-header {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 16px;
          color: var(--primary-text-color);
        }
        .form-group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--primary-text-color);
        }
        select, textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 4px;
          background-color: var(--card-background-color);
          color: var(--primary-text-color);
          font-family: inherit;
          font-size: 14px;
          box-sizing: border-box;
        }
        select {
          cursor: pointer;
        }
        select:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        .button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
        }
        button {
          padding: 10px 24px;
          background-color: var(--primary-color);
          color: var(--text-primary-color, white);
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: var(--dark-primary-color);
        }
        button:active {
          transform: scale(0.98);
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .status-message {
          margin-top: 12px;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          text-align: center;
        }
        .status-success {
          background-color: var(--success-color, #4caf50);
          color: white;
        }
        .status-error {
          background-color: var(--error-color, #f44336);
          color: white;
        }
        .no-services {
          padding: 16px;
          text-align: center;
          color: var(--secondary-text-color);
        }
      </style>

      <ha-card>
        ${this._config.show_title ? `<div class="card-header">${this._config.title}</div>` : ''}

        ${this._notifyServices.length > 0 ? `
          <div class="form-group">
            <label for="notify-service">Notification Service:</label>
            <select id="notify-service">
              ${this._notifyServices.map(service => `
                <option value="${service.value}" ${this._selectedService === service.value ? 'selected' : ''}>
                  ${service.label}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" placeholder="Enter your notification message...">${this._messageValue}</textarea>
          </div>

          <div class="button-container">
            <button id="send-button">${this._config.send_button_text}</button>
          </div>

          <div id="status-container"></div>
        ` : `
          <div class="no-services">
            No notify services found. Please configure notification services in Home Assistant.
          </div>
        `}
      </ha-card>
    `;

    this._attachEventListeners();
  }

  _attachEventListeners() {
    const serviceSelect = this.shadowRoot.getElementById('notify-service');
    const sendButton = this.shadowRoot.getElementById('send-button');
    const messageInput = this.shadowRoot.getElementById('message');

    if (serviceSelect) {
      // Prevent HA keyboard shortcuts when selecting
      serviceSelect.addEventListener('keydown', (e) => {
        e.stopPropagation();
      });

      serviceSelect.addEventListener('keyup', (e) => {
        e.stopPropagation();
      });

      serviceSelect.addEventListener('keypress', (e) => {
        e.stopPropagation();
      });

      serviceSelect.addEventListener('change', (e) => {
        e.stopPropagation();
        this._selectedService = e.target.value;
      });

      // Prevent dropdown from closing on interaction
      serviceSelect.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      serviceSelect.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
    }

    if (sendButton) {
      sendButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this._sendNotification();
      });
    }

    if (messageInput) {
      // Stop all keyboard event propagation to prevent HA shortcuts
      messageInput.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.ctrlKey && e.key === 'Enter') {
          this._sendNotification();
        }
      });

      messageInput.addEventListener('keyup', (e) => {
        e.stopPropagation();
      });

      messageInput.addEventListener('keypress', (e) => {
        e.stopPropagation();
      });

      // Also prevent click event propagation
      messageInput.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      messageInput.addEventListener('focus', (e) => {
        e.stopPropagation();
      });

      messageInput.addEventListener('blur', (e) => {
        e.stopPropagation();
      });

      // Save value on input
      messageInput.addEventListener('input', (e) => {
        e.stopPropagation();
        this._messageValue = e.target.value;
      });
    }
  }

  async _sendNotification() {
    const messageInput = this.shadowRoot.getElementById('message');
    const sendButton = this.shadowRoot.getElementById('send-button');
    const statusContainer = this.shadowRoot.getElementById('status-container');

    const message = messageInput.value.trim();

    if (!message) {
      this._showStatus('Please enter a message', 'error');
      return;
    }

    if (!this._selectedService) {
      this._showStatus('Please select a notification service', 'error');
      return;
    }

    // Disable button during sending
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    try {
      // Split service into domain and service name
      const [domain, service] = this._selectedService.split('.');

      // Call the notify service
      await this._hass.callService(domain, service, {
        message: message
      });

      // Show success message
      this._showStatus('Notification sent successfully!', 'success');

      // Clear the message field
      messageInput.value = '';
      this._messageValue = '';

      // Reset button
      setTimeout(() => {
        sendButton.disabled = false;
        sendButton.textContent = this._config.send_button_text;
      }, 1000);

    } catch (error) {
      console.error('Error sending notification:', error);
      this._showStatus('Failed to send notification: ' + error.message, 'error');

      // Reset button
      sendButton.disabled = false;
      sendButton.textContent = this._config.send_button_text;
    }
  }

  _showStatus(message, type) {
    const statusContainer = this.shadowRoot.getElementById('status-container');
    if (!statusContainer) return;

    statusContainer.innerHTML = `
      <div class="status-message status-${type}">
        ${message}
      </div>
    `;

    // Clear status after 5 seconds
    setTimeout(() => {
      statusContainer.innerHTML = '';
    }, 5000);
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    // Return a custom config element if needed
    return document.createElement("notify-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Send Notification",
      show_title: true,
      send_button_text: "Send"
    };
  }
}

// Register the custom card
customElements.define('notify-card', NotifyCard);

// Add card to custom cards list
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'notify-card',
  name: 'Notify Card',
  description: 'A card for sending notifications to various services',
  preview: false,
  documentationURL: 'https://github.com/yourusername/notify-card'
});

console.info(
  '%c NOTIFY-CARD %c Version 1.0.1 ',
  'color: white; background: #00aaff; font-weight: bold;',
  'color: #00aaff; background: white; font-weight: bold;'
);
