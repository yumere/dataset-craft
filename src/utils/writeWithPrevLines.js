const SEP = '%NWL%';

const writeWithPrevLines = (rl, prevLines, line, i) => {
  let str = prevLines.join(SEP);
  str += `${SEP}${line}${SEP}${i}\n`;
  rl.output.write(str);
};

exports.default = writeWithPrevLines;