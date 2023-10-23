// Sample complex object
const data = {
    name: 'John Doe',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
    },
    hobbies: ['reading', 'painting', 'gaming', 'gaming'],
    friends: [
        { name: 'Jane Smith', age: 28 },
        { name: 'Kate Pierce', age: 29 },
        { name: 'Mike Johnson', age: 32 },
        { name: 'Emily Davis', age: 29 }
    ],
    meanAge: '0'

};

// Function to display the data visually in a template
function displayData() {
    // Clear existing content
    $('#output').empty();

    // Display name
    $('<h2>').text(`Name: ${data.name}`).appendTo('#output');

    // Display age
    $('<p>').text(`Age: ${data.age}`).appendTo('#output');

    // Display address
    $('<p>').text(`Address: ${data.address.street}, ${data.address.city}, ${data.address.country}`).appendTo('#output');

    // Display hobbies
    $('<p>').text(`Hobbies: ${data.hobbies.join(', ')}`).appendTo('#output');

    // Display friends
    $('<h3>').text('Friends:').appendTo('#output');
    const $friendsList = $('<ul>').appendTo('#output');
    data.friends.forEach(friend => {
        $('<li>').text(`${friend.name} - Age: ${friend.age}`).appendTo($friendsList);
    });

    $('<p>').text(`Mean Age: ${data.meanAge}`).appendTo('#output');
}

// Function to modify the data using lodash methods
function modifyData() {
    // Get the lodash method from the data attribute of the clicked button
    const lodashMethod = $(this).data('lodash-method');

    // Modify the data using the selected lodash method
    switch (lodashMethod) {
        case 'shuffle':
            data.hobbies = _.shuffle(data.hobbies);
            break;
        case 'reverse':
            data.friends = _.reverse(data.friends);
            break;
        case 'sortBy':
            data.friends = _.sortBy(data.friends, 'age');
            break;
        case 'sampleSize':
            data.friends = _.sampleSize(data.friends, 2);
            break;
        case 'sortByName':
            data.friends = _.sortBy(data.friends, 'name');
            break;
        case 'filter':
            data.friends = _.filter(data.friends, { age: 29 });
            break;
        case 'map':
            data.friends = _.map(data.friends, friend => ({ ...friend, name: friend.name.toUpperCase() }));
            break;
        case 'mean':
            const totalAge = _.sumBy(data.friends, 'age');
            const meanAge = totalAge / data.friends.length;
            data.meanAge = meanAge; // Update the data object with the mean age
            break;
        case 'uniq':
            data.hobbies = _.uniq(data.hobbies);
            break;
        case 'older':
            data.age = _.add(data.age, 1)
            break;

    }

    // Display the modified data
    displayData();
}

// Function to initialize the application
function init() {
    // Display the initial data
    displayData();

    // Array of button texts and corresponding lodash methods
    const buttonData = [
        { text: 'Shuffle Hobbies', lodashMethod: 'shuffle' },
        { text: 'Reverse Friends', lodashMethod: 'reverse' },
        { text: 'Sort Friends by Age', lodashMethod: 'sortBy' },
        { text: 'Sample 2 Friends', lodashMethod: 'sampleSize' },
        { text: 'Sort Friends by Name', lodashMethod: 'sortByName' },
        { text: 'Filter Friends by Age 29', lodashMethod: 'filter' },
        { text: 'Uppercase Friend Names', lodashMethod: 'map' },
        { text: 'Mean age', lodashMethod: 'mean' },
        { text: 'Remove Duplicate Hobbies', lodashMethod: 'uniq' },
        { text: 'Make John older', lodashMethod: 'older' }
    ];

    // Create buttons for lodash modifications
    buttonData.forEach(button => {
        const $button = $('<button>').text(button.text).appendTo('#buttons');
        $button.data('lodash-method', button.lodashMethod);
        $button.on('click', modifyData);
    });
}

// Document ready event
$(document).ready(() => {
    // Initialize the application
    init();
});