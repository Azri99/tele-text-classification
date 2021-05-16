const bayes = require('bayes');

const model = require('./model/model.json');
const {text, target} = require('./model/classification');

const train = async _ => {
    const classifier = bayes();
    
    const positive = model.filter(x => x.target === target.positive);
    const negative = model.filter(x => x.target === target.negative);

    positive.map(async x => await classifier.learn(x.text, text.positive));
    negative.map(async x => await classifier.learn(x.text, text.negative));

    return classifier;
}

const prediction = async (text) => {
    const classifier = await train();
    return await classifier.categorize(text);
}

module.exports = {
    train,
    prediction
};