#!/usr/bin/env node

const commander = require('commander')
const program = new commander.Command()
const path = require('path');

// 配置指令
const mapActions = {
    create: {
        alias: 'c',
        description:'create a project',
        examples: [
            'ywc-cli create <project-name>'
        ]
    },
    '*':{
        alias: '',
        description: 'command not found',
        examples: []
    }
}

// 执行指令
Reflect.ownKeys(mapActions).forEach(action => {
    program
        .command(action) // 配置指令名字
        .alias(mapActions[action].alias) // 指令别名
        .description(mapActions[action].description) // 指令描述
        .action(() => {
            if(action === '*') {
                console.log(mapActions[action].description);
            } else {
                // ywc-cli create xxx  [node, ywc-cli, create, xxx]
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