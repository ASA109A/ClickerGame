const upgrades = {
    cursor:{
        price: 40,
        priceMultiplication: 1.25,
        count: 0,
        buff: 0.5,
        id: 'clickPlusBuff',
        textButtonsUpdate: function(){
            return `+${this.buff} cursor (Price: ${this.price}) [You have: ${this.count}]`
        },
        apply: function(){
            scorePerClick += this.buff
            scorePerClick = roundToHalf(scorePerClick)
            howMuchPerClick()
        }
    },
    percents:{
        price: 500,
        priceMultiplication : 1.2,
        count: 0,
        buff: 1.5,
        id: '50PercentPlusBuff',
        textButtonsUpdate: function(){
            return `+50% (Price: ${this.price}) [You have: ${this.count}]`
        },
        apply: function(){
            scorePerClick *= 1.5
            upgrades.cursor.buff *= 1.5
            scorePerClick = roundToHalf(scorePerClick)
            upgrades.cursor.buff = roundToHalf(upgrades.cursor.buff)
            document.getElementById('clickPlusBuff').textContent = `+${upgrades.cursor.buff} cursor (Price: ${upgrades.cursor.price}) [You have: ${upgrades.cursor.count}]`
            howMuchPerClick()
        }
    },
    perSecond:{
        price: 50,
        priceMultiplication: 1.2,
        count: 0,
        perSecond: 0,
        buff: 0.25,
        id: 'perSecondPlusBuff',
        textButtonsUpdate: function(){
            return `+0.25 per second (Price: ${this.price}) [You have: ${this.count}]`
        },
        apply: function(){
            perSecondPlusBuff += 0.25
            perSecondPlusBuff = roundToHalf(perSecondPlusBuff)
            howMuchPerClick()
        }
    },

};

let currentScore = 0;
let scorePerClick = 1;
let perSecondPlusBuff = 0;

function priceSystem(price){
    if(currentScore < price){
        return false
    } else{
        currentScore -= price
        howMuchPerClick()
        resultDisplay()
        return true
    };
};

function roundToHalf(x){
    return Math.round(x * 4) / 4;
}

function howMuchPerClick(){
    document.getElementById('howMuchPerClick').textContent = `SCORE PER CLICK: ${scorePerClick} , PER SECOND: ${perSecondPlusBuff}`
    
};

function resultDisplay(){
    const DisplayScore = document.getElementById('scoreDisplay')
    DisplayScore.textContent = `CURRENT SCORE: ${currentScore}`
    howMuchPerClick()
};

function addBuffEasy(config){
    const btn = document.getElementById(config.id)
    if (!btn) return

    document.getElementById(config.id).addEventListener('click', function(){
        if(!priceSystem(config.price)){
            return
        }

        config.price *= config.priceMultiplication
        config.price = roundToHalf(config.price)
        config.count += 1
        btn.textContent = config.textButtonsUpdate()

        btn.textContent = 
            typeof config.textButtonsUpdate === 'function'
            ? config.textButtonsUpdate()
            : config.textButtonsUpdate;

        if (typeof config.apply === 'function') {
            config.apply();
        }
    })
};

const perSecond = setInterval(() => {
    currentScore += perSecondPlusBuff
    resultDisplay()
}, 1000);


document.getElementById('buttonClick').addEventListener('click', function(){
    currentScore += scorePerClick
    resultDisplay()
});

addBuffEasy(upgrades.cursor)

addBuffEasy(upgrades.percents)

addBuffEasy(upgrades.perSecond)

document.getElementById('buttonShop').addEventListener('click', function(){
    const optionDiv = document.getElementById('shopList');
    optionDiv.classList.toggle('hidden')

});

