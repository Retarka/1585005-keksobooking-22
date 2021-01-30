// eslint-disable-next-line no-unused-vars
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


function randomInteger(min, max) {
  // получить случайное число от (min-1.1) до (max+1.2)
  let rand = min - 1.1 + Math.random() * (max - min + 1.2);
  return Math.round(rand);
}

alert(randomInteger(1.1, 5.1));

