const test = require('ava');
const { snek, desnek } = require('../lib/casing.js');

test('transform object keys from camelCase to snake_case', t => {
	const input = {
        foo: "foo",
        fooBar: "foo_bar",
        fooBar100: "foo_bar_100",
        foo100bars: "foo_100bars",
        foo200Bars: "foo_200_bars",
        FooBar: "FooBar",
        Foo: "Foo",
        nestedObject: {
            fooBar: "foo_bar",
        },
    };

    const expected = {
        foo: "foo",
        foo_bar: "foo_bar",
        foo_bar_100: "foo_bar_100",
        foo_100bars: "foo_100bars",
        foo_200_bars: "foo_200_bars",
        FooBar: "FooBar",
        Foo: "Foo",
        nested_object: {
            foo_bar: "foo_bar",
        },
    };

    t.deepEqual(snek(input), expected)
});

test('transform object keys from snake_case to camelCase', t => {
    const input = {
        foo: "foo",
        foo_bar: "foo_bar",
        foo_bar_100: "foo_bar_100",
        foo_100bars: "foo_100bars",
        foo_200_bars: "foo_200_bars",
        FooBar: "FooBar",
        Foo: "Foo",
        nested_object: {
            foo_bar: "foo_bar",
        },
    };

    const expected = {
        foo: "foo",
        fooBar: "foo_bar",
        fooBar100: "foo_bar_100",
        foo100bars: "foo_100bars",
        foo200Bars: "foo_200_bars",
        FooBar: "FooBar",
        Foo: "Foo",
        nestedObject: {
            fooBar: "foo_bar",
        },
    };

    t.deepEqual(desnek(input), expected)
});
