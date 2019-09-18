import { Url } from '../src/utils/url'

test('test:utils/url.js',() => {
    expect(Url.join('a','b')).toBe('a/b')
    expect(Url.join('a/','b')).toBe('a/b')
    expect(Url.join('a','/b')).toBe('a/b')
})