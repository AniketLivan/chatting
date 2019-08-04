const $sendLocationButton = document.querySelector('#send-location');

var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

socket.on('newLocationMessage', (message) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('');
    });
});

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }
    $sendLocationButton.setAttribute('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition((position) => {
        $sendLocationButton.removeAttribute('disabled').text('Send Location');
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        $sendLocationButton.removeAttribute('disabled').text('Send Location');
        alert('unable to fetch location data');
    });
});