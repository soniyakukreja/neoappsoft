run this in index.js by commention other  things...if
function* generator(i){
    console.log('aaaaaaaaa')
    yield i
    console.log('bbbbbbbbbbbbb')

    yield i+10
}

const gen = generator(10)

console.log(gen.next.value())
console.log(gen.next.value())
console.log(gen.next)