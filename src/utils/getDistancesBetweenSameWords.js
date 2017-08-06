const getDistancesBetweenSameWords = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (_not(arr[i]) && arr[i] == arr[j]) {
        res.push(j - i);
      }
    }
  }
  return res;
}

const _not = (word) => {
  return !word.match(/[^0-9a-zA-Z]/g)
  // var exclusions = [' ', '', '\"', '\'', '\t', '(', ')', '\s', ',', '.', ';'];
  // return !exclusions.includes(word);
}

exports.default = getDistancesBetweenSameWords;