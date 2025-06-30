function reverseString(str) {
    return str.split('').reverse().join('');
}

test('reverses a string', () => {
    expect(reverseString('hello')).toBe('olleh');
});
