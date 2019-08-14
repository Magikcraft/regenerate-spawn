import commando from '@magikcraft/commando'
import { Logger } from '@magikcraft/regenerate-spawn/lib/log'
import * as utils from 'utils'

const log = Logger(__filename)

log('@magikcraft/regenerate-spawn loaded!')

// @TODO make configurable via environment
// @TODO take a list of worlds to regen spawn points in
const periodMinutes = 5 // every 5 minutes
const radius = 3
const world = utils.world('world')
const spawn = world.getSpawnLocation()

const regenerate = async () => {
	log('Regenerating spawn...')

	const chunk = spawn.getChunk()
	const x = chunk.getX()
	const z = chunk.getZ()
	for (let dx = 0 - radius; dx < radius; dx++) {
		for (let dz = 0 - radius; dz < radius; dz++) {
			await setTimeout(() => {}, 1000)
			console.log(`Regenerating ${dx} ${dz}`)
			world.regenerateChunk(x + dx, z + dz)
		}
	}
}

setTimeout(regenerate, periodMinutes * 60 * 1000)
;(global as any).__regenerate = regenerate

log(`Spawn Regeneration loaded with ${periodMinutes} minute period`)
log(`Available as command: /regenerate-spawn`)

commando('regenerate-spawn', (args, player) => {
	console.log(`regenerate-spawn command called by ${player.name}`)
	regenerate()
	return true
})

/**
 * Allows ops to blow up the spawn point (or any other location)
 * Can be used to test the regenerate-spawn functionality
 */
commando('blow', (args, player) => {
	if (!player.isOp()) {
		return
	}
	console.log(`blow command called by ${player.name}`)
	const here = player.getLocation()
	here.getWorld().createExplosion(here, 50)
	return true
})
