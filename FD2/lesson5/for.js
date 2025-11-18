function fib1(n) {
    if (n === 0) {
        return [0]
    }
    if (n === 1) {
        return [0, 1]
    }
    
    let sequence = [0, 1]
    let prev1 = 1  
    let prev2 = 0  
    let current = 0
    
    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2
        sequence.push(current)
        prev2 = prev1
        prev1 = current
    }
    return sequence
}
console.log ("цикл фиб3: ", fib1(3))
console.log ("цикл фиб7: ", fib1(7))
console.log ("цикл фиб: ", fib1(1000))