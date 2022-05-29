const db = require('../config/connection')
const { StaffPicks, Sides, Drink } = require('../models')

const drinkData = require('./drink.json')
const sidesData = require('./sides.json')
const staffPicksData = require('./staffPicks.json')

db.once('open', async () => {
    try {
        await Drink.deleteMany({});
        await Drink.create(drinkData)
        await Sides.deleteMany({});
        await Sides.create(sidesData);
        await StaffPicks.deleteMany({});
        await StaffPicks.create(staffPicksData);
    
        console.log('Seeded successfully!');
        process.exit(0)
    } catch (err) {
        console.log('Seeding unsuccessful')
        throw err;
    }

})