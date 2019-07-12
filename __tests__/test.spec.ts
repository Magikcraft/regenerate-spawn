import { something } from '../lib/index'

describe('@magikcraft/regenerate-spawn.something', () => {
	it('exists', () => {
		expect(something).toBeTruthy()
	})
	it("returns 'Hello'", () => {
		const returnValue = something()
		expect(returnValue).toBe('Hello')
	})
})
