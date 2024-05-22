const HEIGHTS = ['2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K', 'A']

const SUITS = ['♣', '♦', '♥', '♠']
    
class Card {
    constructor(height, suit) {
        this.index = 13 * suit + height
        this.height = HEIGHTS[height]
        this.suit = SUITS[suit]
    }

    static compare(card1, card2) {
        return card1.index - card2.index
    }
}
    
const DECK = []
for (let suit = 0; suit < 4; suit++) {
    for (let height = 0; height < 13; height++) {
        DECK.push(new Card(height, suit))
    }
}

const SEPARATED_DECK = [
    DECK.slice(0, 13),
    DECK.slice(13, 26),
    DECK.slice(26, 39),
    DECK.slice(39, 52),
]

function generateShuffledDeck() {
    // Brutal shuffle
    return DECK
        .map(card => [Math.random(), card])
        .sort()
        .map(card => card[1])
}

function generateRandomHands(value) {
    const cards = generateShuffledDeck()
    return [
        cards.slice(0*value, 1*value).sort(Card.compare),
        cards.slice(1*value, 2*value).sort(Card.compare),
        cards.slice(2*value, 3*value).sort(Card.compare),
        cards.slice(3*value, 4*value).sort(Card.compare),
    ]
}

function toName(input) {
    if (Array.isArray(input)) {
        return input.map(e => toName(e))
    } else {
        return input.name
    }
}

function randInt(max) {
    return Math.floor(Math.random() * max)
}

function playRandomly(value) {
    const hands = generateRandomHands(value)

    const game = [
        [
            [...hands[0]],
            [...hands[1]],
            [...hands[2]],
            [...hands[3]],
        ]
    ]

    for (let i = 0; i < value; i++) {
        const cardsLeft = value - i

        hands[0].splice(randInt(cardsLeft), 1)
        hands[1].splice(randInt(cardsLeft), 1)
        hands[2].splice(randInt(cardsLeft), 1)
        hands[3].splice(randInt(cardsLeft), 1)

        game.push([
            [...hands[0]],
            [...hands[1]],
            [...hands[2]],
            [...hands[3]],
        ])
    }

    return game
}

import * as d3 from "https://esm.sh/d3@7";
function render({ model, el }) {
    el.classList.add("ipymario");
    let btn = document.createElement("button");
    let value = model.get("value");
    btn.innerText=`Deal the cards`
    btn.addEventListener("click", () => {
        myfunction(value);
    });
    model.on("msg:custom", (msg) => {
        if (msg?.type === "click") btn.click();
    });
    
    btn.classList.add("mybutton");
    el.appendChild(btn);


const svg = d3.select(el)               // Move this out as we only do it once
        .append('div')
        .append('svg')
        .attr('viewBox', "-100 -100 200 200")

function myfunction(value) {
    function enter(parent) {
        const g = parent.append('g')
            .attr('class', d => d.suit)
            .attr('transform', () => `translate(0 -80)`)
            .style('opacity', '0')      // Fix the initial value

        /* ... */
    }

    /* ... */

function enter(parent) {
    const g = parent.append('g')
        .attr('class', d => d.suit) // Might as well move this here as well
        .attr('transform', () => `translate(0 -80)`)
        .style('opacity', '1')      // Fix the initial value

    g.append('rect')
        .attr('x', -4.5)
        .attr('y', -7)
        .attr('width', 9)
        .attr('height', 14)
        .classed('back', true)

    g.append('text')
        .attr('y', -1)
        .attr('text-anchor', 'middle')
        .text(d => d.suit)

    g.append('text')
        .attr('y', 6)
        .attr('text-anchor', 'middle')
        .text(d => d.height)

    return g
}

function update(element) {
    return element
}

function exit(element) {
    return element
        .transition().duration(500)
        .attr('transform', () => `translate(0 -50)`)
            .transition().duration(500)     // Notice the chaining of transitions
                .style('opacity', 0)
                    .remove()
}
        
function updateGame(data) {
    svg
        .selectChildren('g')
        .data(data, (_, i) => i)
        .join('g')
            .attr('transform', (_, i) => `rotate(${90 * i}) translate(0 80)`)
            .selectChildren('g')
            .data(d => d, d => d.index)
.join(enter, update, exit)
        .transition().duration(500)
            .attr('transform', (_, i, n) => `translate(${10 * (i - (n.length - 1) / 2)} 0)`)
            .style('opacity', '1')  // Fix the "normal" value
}

const game = playRandomly(value)
game.forEach((hands, i) => setTimeout(() => updateGame(hands), 1000 * (i+1)))
    }
}
    export default { render };
    
