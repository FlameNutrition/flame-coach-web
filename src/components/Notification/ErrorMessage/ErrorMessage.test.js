import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('Check error message using fromCode method', () => {
    expect(ErrorMessage.fromCode('1001')).toStrictEqual(ErrorMessage.CODE_1001);

    expect(ErrorMessage.fromCode('2001')).toStrictEqual(ErrorMessage.CODE_2001);
    expect(ErrorMessage.fromCode('2002')).toStrictEqual(ErrorMessage.CODE_2002);
    expect(ErrorMessage.fromCode('2003')).toStrictEqual(ErrorMessage.CODE_2003);

    expect(ErrorMessage.fromCode('3001')).toStrictEqual(ErrorMessage.CODE_3001);
    expect(ErrorMessage.fromCode('3002')).toStrictEqual(ErrorMessage.CODE_3002);

    expect(ErrorMessage.fromCode('4001')).toStrictEqual(ErrorMessage.CODE_4001);
    expect(ErrorMessage.fromCode('4002')).toStrictEqual(ErrorMessage.CODE_4002);

    expect(ErrorMessage.fromCode('5001')).toStrictEqual(ErrorMessage.CODE_5001);

    expect(ErrorMessage.fromCode('9999')).toStrictEqual(ErrorMessage.CODE_9999);

    expect(ErrorMessage.fromCode('0001')).toStrictEqual(ErrorMessage.CODE_0001);
    expect(ErrorMessage.fromCode('0002')).toStrictEqual(ErrorMessage.CODE_0002);
    expect(ErrorMessage.fromCode('0003')).toStrictEqual(ErrorMessage.CODE_0003);
    expect(ErrorMessage.fromCode('0004')).toStrictEqual(ErrorMessage.CODE_0004);
    expect(ErrorMessage.fromCode('0005')).toStrictEqual(ErrorMessage.CODE_0005);
  });

  it('Check error message using fromCode method default error', () => {
    expect(ErrorMessage.fromCode('INVALID')).toStrictEqual(ErrorMessage.CODE_9999);
  });
});
