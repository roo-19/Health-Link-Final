const { Jimp } = require('jimp');
const path = require('path');

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

async function softenAndColorize() {
    const publicDir = path.join(__dirname, '..', 'public');
    
    const imageConfigs = [
        {
            file: 'hero_sl_telemedicine.png',
            // Site Primary Blue #002B9A & Emerald #00A86B
            tint: hexToRgb('#002B9A'),
            factor: 0.14
        },
        {
            file: 'hero_sl_ayucare.png',
            // Site Secondary Emerald #00A86B / #54B476
            tint: hexToRgb('#00A86B'),
            factor: 0.12
        },
        {
            file: 'hero_sl_ayurveda.png',
            // Site Golden Amber #D4AF37 & Emerald
            tint: hexToRgb('#D4AF37'),
            factor: 0.15
        },
        {
            file: 'hero_sl_counseling.png',
            // Soft Rose-Blush #F472B6 & Emerald
            tint: hexToRgb('#F472B6'),
            factor: 0.12
        },
        {
            file: 'hero_sl_sacredspace.png',
            // Sacred Violet #8B5CF6 & Gold
            tint: hexToRgb('#8B5CF6'),
            factor: 0.12
        }
    ];

    for (const conf of imageConfigs) {
        const filePath = path.join(publicDir, conf.file);
        try {
            console.log(`Processing ${conf.file}...`);
            const image = await Jimp.read(filePath);
            
            // Scan pixels and softly blend with exact site color
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];

                this.bitmap.data[idx + 0] = Math.round(r * (1 - conf.factor) + conf.tint.r * conf.factor);
                this.bitmap.data[idx + 1] = Math.round(g * (1 - conf.factor) + conf.tint.g * conf.factor);
                this.bitmap.data[idx + 2] = Math.round(b * (1 - conf.factor) + conf.tint.b * conf.factor);
            });

            await image.write(filePath);
            console.log(`Successfully color-tuned ${conf.file}!`);
        } catch (err) {
            console.error(`Error processing ${conf.file}:`, err);
        }
    }
}

softenAndColorize();
