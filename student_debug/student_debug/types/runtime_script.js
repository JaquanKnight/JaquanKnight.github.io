// Runtime Error Example
function divide(a, b) {
    if (b === 0) {
    return "Division by zero error"
    }
     return a / b;
}
console.log(divide(5, 0)); // Should now return "Division by zero error"

console.log(divide(10, 2)); // Should return 5