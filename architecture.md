Players {
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
Status {
  playerOrder: [a, b, c, d]
  roundOpener: a
  trickWinner: a
  tricksRemaining: 18
}
currentTrick

Round loop
  Round Start Sequence
  -> card dealing
  -> speaking order + speak & take
  -> chien making
  Tricks Sequence
  Round End Sequence
  -> point counting
  -> count the bouts
  -> is the bid won
  -> points are awarded to Players
  -> next round opener designated

 Trick loop
 -> first trick is opened by the round opener, subsequent tricks are opened by the previous trick's winner
 -> each player in turn play a card from the allowed cards (depending on opening suit and played trumps)
 -> strongest card wins
 -> cards from the tricks are awarded to the players winning
 -> trick winner is designated next trick opener
 -> if there are no tricks to be played, we go to Round End Sequence

Functions
deal(playerCount)
sortHand(hand)
getNextPlayerInOrder(currentPlayer)
getAllowedCards(trick, hand)
countBouts(tricks)
countScore(tricks)
getWinningCard(trick)
awardPlayerScores(tricks, bid)
