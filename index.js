const puppeteer = require('puppeteer');
let date = new Date()
let day = date.getDate()
let month = date.getMonth()

let months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
]

const today = day + " " + months[month];

(async () => {
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();
    await page.goto("ÜNİ WEBSİTE LİNKİ", { waitUntil: 'networkidle2' });
    
    let found = false;

    while (!found) {
        try {
            const textContent = await page.evaluate(() => {
                return document.body.textContent || "";
            });
            if (textContent.includes(today)) {
                console.log("DUYURU VAR KONTROL ET.");
                found = true;
            } else {
                console.log("Yeni duyuru yok. Devam ediyorum...");
                await page.reload({ waitUntil: 'networkidle2' });
                await wait(5000);
            }
        } catch (error) {
            console.error("Bir hata oluştu:", error);
            await wait(5000);
        }
    }
})();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

