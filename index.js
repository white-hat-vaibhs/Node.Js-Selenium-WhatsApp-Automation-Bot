const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

// Path to ChromeDriver
const chromedriverPath = path.join(__dirname, 'chromedriver');

async function sendMessageToContacts() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(new chrome.ServiceBuilder(chromedriverPath))
        .build();

    try {
        console.log("Launching WhatsApp Web...");
        await driver.get('https://web.whatsapp.com');
        console.log("Scan the QR code to log in...");
        await driver.sleep(20000); // Wait for QR code scanning

        console.log("Logged in successfully!");

        // Read contacts from the CSV file
        const contacts = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream('contacts.csv')
                .pipe(csv())
                .on('data', (row) => contacts.push(row))
                .on('end', resolve)
                .on('error', reject);
        });

        for (let contact of contacts) {
            const name = contact.Name || "Friend"; // Fallback if "Name" column is missing
            const phoneNumber = contact["Phone Number"];
            const personalizedMessage = `Hi ${name},\n\nFollow this link to join my WhatsApp community: \n\nhttps://chat.whatsapp.com/your-url`;

            console.log(`Sending message to ${name}...`);

            // Open chat for the given phone number with the personalized message
            await driver.get(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(personalizedMessage)}`);
            await driver.sleep(5000); // Wait for the chat to load

            try {
                // Wait for and handle any overlay/dialog that may block the "send" button
                const overlay = await driver.findElements(By.css('div[aria-label="Starting chat"]'));
                if (overlay.length > 0) {
                    console.log("Waiting for overlay to disappear...");
                    await driver.wait(
                        until.stalenessOf(overlay[0]), // Wait until the overlay disappears
                        10000
                    );
                }

                // Wait for the "send" button and click it
                const sendButton = await driver.wait(
                    until.elementLocated(By.css('span[data-icon="send"]')),
                    15000 // Wait for up to 15 seconds for the send button to appear
                );
                await driver.executeScript("arguments[0].click();", sendButton); // Ensure the button is clicked
                console.log(`Message sent to ${name} (${phoneNumber}).`);
            } catch (e) {
                console.error(`Failed to send message to ${name} (${phoneNumber}):`, e.message);
            }

            // Wait before sending the next message to avoid being flagged as spam
            await driver.sleep(5000);
        }
        console.log("All messages sent successfully!");
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

sendMessageToContacts();
