function reverseString(str) {
    return str.split('').reverse().join('');
}

test('reverse string using TDD', () => {
    expect(reverseString('abc')).toBe('cba');
});
