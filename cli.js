#!/usr/bin/env node

const commander = require('commander')
const program = new commander.Command()
const path = require('path');
const mapActions = {
    create: {
        alias: 'c',
        description:'create a project',
        examples: [
            'ywc-cli create <project-name>'
        ]
    },
    // config: {
    //     alias: 'conf',
    //     description: 'config project variable',
    //     examples: [
    //         'ywc-cli config set <k><v>',
    //         'ywc-cli config get <k>'
    //     ]
    // },
    '*':{
        alias: '',
        description: 'command not found',
        examples: []
    }
}

Reflect.ownKeys(mapActions).forEach(action => {
    program
        .command(action) // 配置指令名字
        .alias(mapActions[action].alias) // 指令别名
        .description(mapActions[action].description) // 指令描述
        .action(() => {
            if(action === '*') {
                console.log(mapActions[action].description);
            } else {
                // yu-cli create xxx  [node, yu-cli, create, xxx]
                require(path.resolve(__dirname,'lib',action))(...process.argv.slice(3));
            }
        })
});

program.on('--help', () => {
    console.log('\nExamples:');
    Reflect.ownKeys(mapActions).forEach(action => {
        mapActions[action].examples.forEach(example => {
            console.log(example);
        })
    });
})

program.parse();