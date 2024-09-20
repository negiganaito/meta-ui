//  [
//       {
//         type: 'search-list',
//         name: 'position',
//         message: 'Component position: ',
//         default: 'business',
//         choices: ['core', 'business', 'social'],
//       },
//       {
//         type: 'input',
//         name: 'name',
//         message: 'Component name: ',
//       },
//     ],
//     actions: [{}],

const findGitRoot = require('./find-git-root');

const root = findGitRoot();

module.exports = (plop) => {
  plop.setWelcomeMessage('This utility is a helper to create component');

  plop.setGenerator('create', {
    prompts: [
      {
        type: 'list',
        name: 'position',
        message: 'Component position: ',
        default: 'business',
        choices: ['core', 'business', 'social'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name: ',
      },
    ],
    actions: ({ position, name }) => {
      return [
        {
          type: 'addMany',
          destination: `${root}/packages/lib/${position}/${name}`,
          skipIfExists: true,
          abortOnFail: true,
          templateFiles: './create-component',
        },
        () => 'Component generate successfully!',
      ];
    },
  });
};
