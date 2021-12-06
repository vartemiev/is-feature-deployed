export const data = {
    tasks: [
        {
            id: '83612',
            title: 'Refresh the header design and add supplier section',
            status: 'inProgress',
        },
        {
            id: '83613',
            title: 'Outlisted products loose selling unit',
            status: 'testing',
        }
    ],
    servers: [
        {
            id: 'proto',
            name: 'Proto',
            link: 'https://proto.hogashop.ch',
        },
        {
            id: 'latest',
            name: 'Latest',
            link: 'https://latest.hogashop.ch',
        }
    ],
    links: [
        {
            from: {
                task: '83613'
            },
            to: {
                server: 'proto'
            }
        },
        {
            from: {
                task: '83612'
            },
            to: {
                server: 'latest'
            }
        }
    ]
}