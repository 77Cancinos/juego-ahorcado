let words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'BURRITO',
    'CHOCOLATE',
    'CARRO',
    'PESCADO',
    'MASTER',
    'MIGUEL'
]

export function getRandomWord() {

    const randomIndex =  Math.floor( Math.random() * words.length );
    return words[ randomIndex ];

}