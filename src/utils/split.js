const split = (text) => {
  let res = [],
      word = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[^0-9a-zA-Z]/g)) {
      if (word.length) {
        res.push(word);
        word = '';
      }
      res.push(text[i])
    } else {
      word = word.concat(text[i])
    }
  }
  if (word.length) {
    res.push(word);
  }
  return res
};

exports.default = split;