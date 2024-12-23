const array = [12, 10, 22, 5, 25];
for(var i = 0; i < array.length; i++){
    setTimeout(function(){
        console.log("The element in position " + i + " is: " + array[i]);
    }, 5000);
}

// The output of the code will be:
// The element in position 5 is: undefined
// The element in position 5 is: undefined
// The element in position 5 is: undefined
// The element in position 5 is: undefined
// The element in position 5 is: undefined
// The reason is that the setTimeout function is executed after the loop has finished, 
// as it takes much less than 5 seconds to finish the loop,
// and because we used the keyword var to declare the variable i, it makes i funtion-scoped,
// leading to the value of i to be global for all setTimeouts, so the value of i is array.length in all the cases
// because the loop incremented  i until it reached array.length = 5.
// And because the array has only 5 elements, the value of array[5] is undefined.

// To fix this issue, we can use the keyword let to declare the variable i,
// this way the value of i will be block-scoped and will be different in each iteration.