function sort(array) {
  return array.sort(function (a, b) {
    return a - b;
  });
}
function findRanges(sortedInput) {
  let minIndex = 0;
  let maxIndex;
  let rangeValueCount = 1;
  const ranges = [];
  sortedInput.forEach((element, index) => {
    const difference = sortedInput[index + 1] - sortedInput[index];
    if ([0, 1].includes(difference)) {
      maxIndex = index + 1;
      rangeValueCount++;
    } else {
      if (rangeValueCount > 1) {
        ranges.push({
          min: sortedInput[minIndex],
          max: sortedInput[maxIndex],
          rangeCount: rangeValueCount,
        });
        maxIndex = undefined;
        rangeValueCount = 1;
      }
      minIndex = index + 1;
    }
  });
  return ranges;
}

function printTitles() {
  console.log('Range, Readings');
}

function printRangeinFormat(range) {
  console.log(`${range.min}-${range.max}, ${range.rangeCount}`);
}

function rangeFormatter(ranges) {
  printTitles();
  ranges.forEach((range) => {
    printRangeinFormat(range);
  });
}
function a2dConverter(analogInputs, bitValue = 12, minAmp = 0, maxAmp = 10) {
  var maxBitReading = bitToAnalogConverter(bitValue);
  return analogInputs.map((value) =>
    Math.round(((maxAmp - minAmp) * value) / maxBitReading + minAmp)
  );
}

function bitToAnalogConverter(bitValue) {
  return Math.pow(2, bitValue);
}

module.exports = { sort, findRanges, rangeFormatter, a2dConverter };
