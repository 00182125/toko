// Revisa que cada capa solo importe de las capas de abajo.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const order = ['types', 'config', 'lib', 'data', 'ui', 'chat', 'components', 'hooks', 'screens', 'app']
const allowed = {
  types: ['data'], config: [], lib: ['types', 'config'],
  data: ['types', 'config'], ui: ['types', 'config', 'lib', 'ui'],
  chat: ['types', 'data', 'lib', 'chat'],
  components: ['types', 'config', 'lib', 'data', 'ui', 'components'],
  hooks: ['types', 'chat', 'data', 'hooks'],
  screens: ['types', 'data', 'ui', 'components', 'chat', 'screens'],
  app: ['types', 'ui', 'components', 'hooks', 'screens', 'app'],
}
let errors = 0
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f)
  return statSync(p).isDirectory() ? walk(p) : [p]
})
for (const file of walk('src').filter((f) => /\.tsx?$/.test(f))) {
  const layer = file.split(/[\\/]/)[1]
  if (!allowed[layer]) continue
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/from '@\/([a-z]+)/g)) {
    if (!allowed[layer].includes(m[1])) {
      console.log(`✗ ${file} (${layer}) importa de ${m[1]}`)
      errors++
    }
  }
}
console.log(errors ? `${errors} problema(s)` : '✓ Las capas están respetadas')
process.exit(errors ? 1 : 0)
