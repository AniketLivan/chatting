const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        var from = 'Aniket';
        var text = 'Some Text';
        var message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        

    });
});

describe('generateLocationMessage', () => {
    it('should generate the current location object', () => {
        var from = 'Anik';
        var latitude = 12;
        var longitude = 12;
        var url = 'https://www.google.com/maps?q=12,12';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toMatchObject({from, url});
    });
});