function reverse(str) {
    return str.split('').reverse().join('');
}

test('reverses string', () => {
    expect(reverse('node')).toBe('edon');
});
