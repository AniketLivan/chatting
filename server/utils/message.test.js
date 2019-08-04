const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        var from = 'Aniket';
        var text = 'Some Text';
        var message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        

    });
});