const { expect } = require('chai');
const { sort, findRanges, a2dConverter } = require('../ranges-formatter');

it('should sort the given array values', () => {
  const input = [6, 1, 4, 2];
  expect(sort(input)).to.deep.equal([1, 2, 4, 6]);
});

describe('findRanges functionality', () => {
  it('should return [] for empty array', () => {
    const input = [];
    expect(findRanges(sort(input))).to.deep.equal([]);
  });

  it('should return [] for array with single element', () => {
    const input = [1];
    expect(findRanges(sort(input))).to.deep.equal([]);
  });

  it('for array with two continuous elements', () => {
    const input = [1, 2];
    expect(findRanges(sort(input))).to.deep.equal([
      {
        min: 1,
        max: 2,
        rangeCount: 2,
      },
    ]);
  });

  it('for array with two similar elements', () => {
    const input = [2, 2];
    expect(findRanges(sort(input))).to.deep.equal([
      {
        min: 2,
        max: 2,
        rangeCount: 2,
      },
    ]);
  });

  it('for array with n same elements', () => {
    const input = [4, 4, 4, 4, 4];
    expect(findRanges(sort(input))).to.deep.equal([
      {
        min: 4,
        max: 4,
        rangeCount: 5,
      },
    ]);
  });

  it('for array with n different but not continuous elements', () => {
    const input = [3, 9, 13, 17];
    expect(findRanges(sort(input))).to.deep.equal([]);
  });

  it('for array with both continuous and non-continuous elements', () => {
    const input = [3, 4, 4, 6, 12, 5, -14, 11, 10, 9, 12, 17, 19, 19];
    expect(findRanges(sort(input))).to.deep.equal([
      {
        min: 3,
        max: 6,
        rangeCount: 5,
      },
      {
        min: 9,
        max: 12,
        rangeCount: 5,
      },
      {
        min: 19,
        max: 19,
        rangeCount: 2,
      },
    ]);
  });
});

describe('A2D converter functionality', () => {
  it('should convert given empty 12-bit number to empty value', () => {
    expect(a2dConverter([])).to.deep.equal([]);
  });

  it('should convert given 12-bit number to integer value', () => {
    expect(a2dConverter([1024])).to.deep.equal([3]);
  });

  it('should convert 12 bit sensor array value ', () => {
    const input = [0, 1345, 3542, 987];
    expect(a2dConverter(input)).to.deep.equal([0, 3, 9, 2]);
  });

  it('should convert ignore max 12 bit sensor array value for 10A sensor', () => {
    const input = [4096];
    expect(a2dConverter(input)).to.deep.equal([10]);
  });

  it('should convert 10 bit sensor array value ', () => {
    const input = [0, 1024, 512];
    expect(a2dConverter(input, 10, -15, 15)).to.deep.equal([-15, 15, 0]);
  });
});

describe('Check both findrange and a2dconverter functionality', () => {
  it('should convert 12-bit sensor array values to ranges', () => {
    const input = [0, 1254, 3541, 512, 2789, 3450, 987, 1500];
    expect(findRanges(sort(a2dConverter(input)))).to.deep.equal([
      {
        min: 0,
        max: 4,
        rangeCount: 5,
      },
      {
        min: 7,
        max: 9,
        rangeCount: 3,
      },
    ]);
  });
});

