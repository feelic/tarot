export const botPlayerNames = [
  'Alberto',
  'Bernadette',
  'Cuthbert',
  'Doris',
  'Elmer',
  'Augusta',
  'Boris',
  'Carlotta',
  'Dewey',
  'Esme'
];

let nameIdx = 0;

export function getBotPlayerName () {
  return botPlayerNames[nameIdx ++ % botPlayerNames.length];
}
