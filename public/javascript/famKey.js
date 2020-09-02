const adj = ['adaptable', 'adventurous', 'affectionate', 'ambitious', 'amiable',
  'compassionate', 'considerate', 'courageous', 'courteous', 'diligent',
  'empathetic', 'exuberant', 'frank', 'generous', 'gregarious',
  'impartial', 'intuitive', 'inventive', 'passionate', 'persistent',
  'philosophical', 'practical', 'rational', 'reliable', 'resoureful',
  'sensible', 'sincere', 'sympathetic', 'unassuming', 'witty'];

function randInt(){

  let randNum = (Math.floor(Math.random() * 100)).toString();

  if (randNum.length < 2) { randNum = '0' + randNum }

  return randNum;

}

function randAdj(){

  let x = Math.floor(Math.random() * 30);

  return adj[x];

}

function famKey(surname) {

  if(surname.slice(-1) != 's'){
    surname += 's'
  }

  let uId = randAdj() + surname + randInt();

  return uId;

}
