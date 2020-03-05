import * as F from '../public/scripts/functions.js';

//f#compose
describe('f#compose', () => {
	test("Falsy arguments", () => {
		const comp = F.compose(null);
		const comp2 = F.compose([]);
		expect(comp(173) == 173).toBe(true);
		expect(comp2('fjsaoijrasjoira') == 'fjsaoijrasjoira').toBe(true);
	});
	test("Basic Composition", () => {
		const f = (a,b) => a + b;
		const g = a => a*a;
		const gof = F.compose(g,f);
		[
			[[1,2],9],
			[[2,5],49],
			[[0,10],100]
		].map(([args,result])=>expect(gof(...args) === result).toBe(true));
	});
	{
		const f = o => {
			o.param = o.param*2;
			return o;
		};
		const g = o => o.param;
		const gof = F.compose(g,f);
		test("Objects Functions Composition", () => {
			[
				[{param : 2},4],
				[{param : 5},10]
			].map(([args,result])=>{
				expect(gof(args) === result).toBe(true);
			});
		});	
		test("Objects keep references", () => {
			const obj = {param : 15};
			gof(obj);
			expect(obj.param === 30).toBe(true);
		});
	}
});

//f#chain
describe('f#chain', () => {
	test("Falsy arguments", () => {
		const comp = F.chain(null);
		const comp2 = F.chain([]);
		expect(comp(173) == 173).toBe(true);
		expect(comp2('fjsaoijrasjoira') == 'fjsaoijrasjoira').toBe(true);
	});
	test("Basic Chaining", () => {
		const f = (a,b) => a + b;
		const g = a => a*a;
		const gof = F.chain(f,g);
		[
			[[1,2],9],
			[[2,5],49],
			[[0,10],100]
		].map(([args,result])=>expect(gof(...args) === result).toBe(true));
	});
	{
		const f = o => {
			o.param = o.param*2;
			return o;
		};
		const g = o => o.param;
		const gof = F.chain(f,g);
		test("Objects Functions Chaining", () => {
			[
				[{param : 2},4],
				[{param : 5},10]
			].map(([args,result])=>{
				expect(gof(args) === result).toBe(true);
			});
		});	
		test("Objects keep references", () => {
			const obj = {param : 15};
			gof(obj);
			expect(obj.param === 30).toBe(true);
		});
	}
});

//f#isVowel
describe('f#isVowel', () => {
	test("True values", () => {
		['a','e','i','o','u','y','h','é','è','í','â'].map(v=>expect(F.isVowel(v)).toBe(true));
	});
	test("False values", () => {
		[null,'', undefined, false, 1, 3, 'p', 'ž'].map(v=>expect(F.isVowel(v)).toBe(false));
	});
});

//f#concatMessages
describe('f#concatUniqSortBy', () => {
	test("Bad arguments", () => {
		expect(F.concatUniqSortBy(null, [undefined, 1])).toStrictEqual([]);
	});
	test("Good arguments", () => {
		expect(F.concatUniqSortBy([[{a : 1, b :3}, {a : -1, b : 3}], [{a : 2, b :3}, {a : -2, b : 3}]], 'a'))
		.toStrictEqual([{a : -2, b :3}, {a : -1, b : 3}, {a : 1, b :3}, {a : 2, b : 3}]);
	});
});
