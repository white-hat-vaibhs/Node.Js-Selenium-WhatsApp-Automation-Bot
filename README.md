# WhatsApp Automation Bot - Selenium

This repository contains a **WhatsApp Automation Bot** built using **Selenium WebDriver** and **Node.js**. The bot is designed to send personalized messages to contacts listed in a CSV file. It automates the process of initiating chats and sending messages on WhatsApp Web, handling common issues like overlays and ensuring smooth execution.

---

## Features 🚀

- **CSV-Based Personalization**: Reads contact details (name and phone number) from a CSV file to send personalized messages.
- **Automated Messaging**: Sends messages to multiple contacts without manual intervention.
- **Overlay Handling**: Manages popups or overlays that may block the send button.
- **Error Logging**: Logs any errors encountered during the process, including failed message deliveries.
- **Configurable Delays**: Adds a delay between messages to prevent spam detection.
- **Direct WhatsApp Web Integration**: Uses WhatsApp Web URLs to interact directly with specific phone numbers.

---

## Requirements 🛠️

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **Google Chrome** (Latest version)
- **ChromeDriver** (Matching version of your Chrome browser)

---

## Installation 📥

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-automation-bot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd whatsapp-automation-bot
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Ensure `chromedriver` is placed in the root directory of the project.

---

## Usage 📋

1. **Prepare your CSV file**: Create a `contacts.csv` file with the following columns:
   - `Name`
   - `Phone Number` (Include country code, e.g., `+1` for USA)

2. **Update the message**: Customize the message in the script:
   ```javascript
   const message = "Follow this link to join my WhatsApp community: \n\nhttps://chat.whatsapp.com/Fp5BtpmKCnFDJnLaRHu5as";
   ```

3. **Run the script**:
   ```bash
   node index.js
   ```

4. **Scan the QR Code**: Open WhatsApp Web and scan the QR code displayed in the browser.

5. The bot will send personalized messages to all contacts in the CSV file.

---

## CSV Format 📄

Ensure the `contacts.csv` file is structured as follows:

| Name       | Phone Number    |
|------------|-----------------|
| John Doe   | +1234567890     |
| Jane Smith | +0987654321     |

---

## Error Handling 🔍

The bot logs errors for:
- Invalid phone numbers
- Missing fields in the CSV file
- Issues with WhatsApp Web loading or overlays

All successful and failed attempts are logged in the console.

---

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository and submit pull requests for bug fixes or new features.

---

## License 📜

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Disclaimer ⚠️

- This project is for educational purposes only.
- Ensure compliance with WhatsApp's terms of service and privacy policies.
