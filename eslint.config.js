import officeAddins from 'eslint-plugin-office-addins';

export default [
    {
        plugins: {
            'office-addins': officeAddins
        },
        rules: {
            ...officeAddins.configs.react.rules
        }
    }
];
