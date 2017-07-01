/**
 * Created by travisreed7 on 6/25/17.
 */

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);