'use strict';

const {getCommandHistory} = require('lib/history-utils');

describe('history-utils', () => {
    describe('getCommandHistory', () => {
        const sandbox = sinon.createSandbox();

        beforeEach(() => {
            sandbox.stub(process, 'cwd').returns('/path/to');
        });

        afterEach(() => sandbox.restore());

        it('should return commands executed in test file and all sub commands of the last command', async () => {
            const allHistory = [
                {name: 'foo', args: ['foo-arg'], stack: 'foo("foo-arg") (/path/to/test/file:10:4)'},
                {name: 'baz', args: ['baz-arg'], stack: 'baz("baz-arg") (/path/to/baz/file:20:4)'},
                {name: 'bar', args: ['bar-arg'], stack: 'bar("bar-arg") (/path/to/test/file:11:4)'},
                {name: 'qux', args: ['qux-arg'], stack: 'qux("qux-arg") (/path/to/qux/file:21:4)'}
            ];

            const history = await getCommandHistory(allHistory, '/path/to/test/file');

            assert.deepEqual(history, [
                '\tfoo("foo-arg")\n',
                '\tbar("bar-arg")\n',
                '\t\tqux("qux-arg"): qux/file:21:4\n'
            ]);
        });

        it('should truncate args for specified commands in history', async () => {
            const allHistory = [
                {name: 'foo', args: ['foo-arg'], stack: 'foo("foo-arg") (/path/to/test/file:10:4)'},
                {name: 'baz', args: ['baz-arg'], stack: 'baz("baz-arg") (/path/to/baz/file:20:4)'},
                {name: 'bar', args: ['bar-arg'], stack: 'bar("bar-arg") (/path/to/test/file:11:4)'},
                {name: 'qux', args: ['qux-arg'], stack: 'qux("qux-arg") (/path/to/qux/file:21:4)'}
            ];

            const history = await getCommandHistory(allHistory, '/path/to/test/file', ['foo', 'qux']);

            assert.deepEqual(history, [
                '\tfoo(...)\n',
                '\tbar("bar-arg")\n',
                '\t\tqux(...): qux/file:21:4\n'
            ]);
        });

        it('should eliminate cwd from file paths in history', async () => {
            const allHistory = [
                {name: 'foo', args: ['foo-arg'], stack: 'foo("foo-arg") (/path/to/test/file:10:4)'},
                {name: 'qux', args: ['qux-arg'], stack: 'qux("qux-arg") (/path/to/qux/file:21:4)'}
            ];

            const history = await getCommandHistory(allHistory, '/path/to/test/file');

            assert.calledOnce(process.cwd);

            assert.deepEqual(history, [
                '\tfoo("foo-arg")\n',
                '\t\tqux("qux-arg"): qux/file:21:4\n'
            ]);
        });

        it('should return undefined if all history is not given', async () => {
            const history = await getCommandHistory(undefined, '/path/to/test/file');

            assert.isUndefined(history);
        });

        it('should return failure message in case of exception', async () => {
            const history = await getCommandHistory([{}], '/path/to/test/file');

            assert.match(history, /failed to get command history: .*/);
        });
    });
});
