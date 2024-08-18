/*--------
    Make the Options Button 
    . on click
    . show or hide the `.sides` div
---------*/
const optionsHeading = document.querySelector('#options h2');
const sidesDiv = document.querySelector('.sides');
optionsHeading.addEventListener('click', function() 
{
    sidesDiv.classList.toggle('hidden');
});

/*---------
    Program the two fill inputs to do the following:
    . Display the correct colors on the inputs and outputs and paddles    
    . using an `input` event
        . Change the player's fill property to the value of the input
        . Change the pad's fill property  to the player's fill property
        . Show the fill's hex code in the output div 

-----------*/

const fillInputs = document.querySelectorAll('.fill');
fillInputs.forEach((input, index) => 
{
    input.value = player[index].fill;
    const outputDiv = input.nextElementSibling;
    outputDiv.innerHTML = player[index].fill;
    input.addEventListener('input', function(e)
    {
        player[index].fill = e.target.value;
        player[index].pad.setProps({ fill: player[index].fill
    });
        outputDiv.innerHTML = player[index].fill;
        main();
    });
});

/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/

const upInputs = document.querySelectorAll('.u');

upInputs.forEach((input, index) => 
{
    input.value = player[index].keys.u;
    const outputDiv = input.nextElementSibling;
    outputDiv.innerHTML = player[index].keys.u;
    input.addEventListener('keydown', function(e) 
    {
        e.preventDefault(); 
        const keyPressed = e.key;
        input.value = keyPressed;
        player[index].keys.u = keyPressed;
        outputDiv.innerHTML = keyPressed;
    });

    input.addEventListener('focus', function() 
    {
        currentState = 'pause';
        console.log("Game paused. Press Escape to unpause.");
    });
});

function addControlInputListeners(controlClass, keyProperty) 
{
    const controlInputs = document.querySelectorAll(controlClass);

    controlInputs.forEach((input, index) => 
    {
        input.value = player[index].keys[keyProperty];
        const outputDiv = input.nextElementSibling;

        outputDiv.innerHTML = player[index].keys[keyProperty];
        input.addEventListener('keydown', function(e) 
        {
            e.preventDefault();
            const keyPressed = e.key;
            input.value = keyPressed;
            player[index].keys[keyProperty] = keyPressed;
            outputDiv.innerHTML = keyPressed;
        });

        input.addEventListener('focus', function() 
        {
            currentState = 'pause';
            console.log("Game paused. Press Escape to unpause.");
        });
    });
}

addControlInputListeners('.u', 'u');       
addControlInputListeners('.d', 'd');       
addControlInputListeners('.s', 's');       




