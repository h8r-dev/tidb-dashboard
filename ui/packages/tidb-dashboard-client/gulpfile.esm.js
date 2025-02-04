import { task, watch, series, parallel } from 'gulp'
import shell from 'gulp-shell'

///////////////////////////

task(
  'swagger:gen_spec',
  shell.task('../../../scripts/generate_swagger_spec.sh')
)
task('swagger:gen_client', shell.task('./swagger/gen_api.sh'))
task('swagger:gen', series('swagger:gen_spec', 'swagger:gen_client'))
task('swagger:watch', () =>
  watch(['../../../cmd/**/*.go', '../../../pkg/**/*.go'], series('swagger:gen'))
)

///////////////////////////

task('tsc:watch', shell.task('tsc -w'))
task('tsc:build', shell.task('tsc'))

///////////////////////////

if (process.env.WATCH_API === '1') {
  task('dev', series('swagger:gen', parallel('swagger:watch', 'tsc:watch')))
} else {
  // WATCH_API = 0
  task('dev', series('swagger:gen', 'tsc:build'))
}

task('build', series('swagger:gen', 'tsc:build'))
