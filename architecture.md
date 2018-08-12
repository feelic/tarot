```
players {
  a: {
    name: albert
    score: 0
    hand: []
    tricks: []
  }
  b: {...}
  c: {...}
  d: {...}
}
status {
  playerOrder: [a, b, c, d]
  roundOpener: a
  trickWinner: a
  tricksRemaining: 18
}
currentTrick {

}
```

INIT_GAME:

- create player profiles
- define player order

DEAL:

- set tricks and hand to empty Array
- deal cards to players and to the chien

START_BIDDING:

- give speaking turn to first player in order

PLACE BID:

- player bids or passes
- give speaking turn to next player

AWARD_BID:

- the chien is revealed to everyone
- display chien making interface to bid winner

MAKE_CHIEN:

- selected cards make up the bid winner's hand
- discarded cards go to this players tricks

TRICK_START:

- round opener gets prompted card selection
- allowed cards are highlighted

PLAY_CARD:

- card is revealed in center
- next player is prompted card selection
- if all players have played, go to award tricks

AWARD_TRICK:

- decrement tricks remaining
- trick winner gets the trick's cards to their tricks stack
- trick winner is designated next trick opener
- if there are no tricks to be played, go to END_ROUND

END_ROUND:

- bid taker points are counted
- bid taker bouts are counted
- check if the bid is succesful
- points are awarded to winning players
- next round opener is designated
- go to START_ROUND

Functions
deal(playerCount)
sortHand(hand)
getNextPlayerInOrder(currentPlayer)
getAllowedCards(trick, hand)
countBouts(tricks)
countScore(tricks)
getWinningCard(trick)
awardPlayerScores(tricks, bid)
