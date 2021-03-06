export const data = {
    tasks: [
        {
            id: '83612',
            title: 'Refresh the header design and add supplier section',
            executor: {
                name: 'Anton Leonov',
                avatar: './avatar/anton.png'
            },
            status: 'inProgress',
        },
        {
            id: '83613',
            title: 'Outlisted products loose selling unit',
            executor: {
                name: 'Stas Gridasov',
                avatar: './avatar/stas.png'
            },
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
    mergeRequests: [
        {
            id: '177',
            name: 'Improvement #83613 Improve header',
            link: 'https://gitlab.xiag.ch/hogashop/ui-orders-archive/-/merge_requests/177',
            status: 'merged',
        },
        {
            id: '178',
            name: 'Improvement #83613 Create new elements for header search',
            link: 'https://gitlab.xiag.ch/hogashop/ui-orders-archive/-/merge_requests/178',
            status: 'review',
        },
        {
            id: '179',
            name: 'Fix #83612 Update imports behaviour',
            link: 'https://gitlab.xiag.ch/hogashop/ui-orders-archive/-/merge_requests/179',
            status: 'merged',
        },
    ],
    links: [
        {
            from: {
                task: '83613'
            },
            to: {
                mergeRequest: '177'
            }
        },
        {
            from: {
                task: '83613'
            },
            to: {
                mergeRequest: '178'
            }
        },
        {
            from: {
                task: '83612'
            },
            to: {
                mergeRequest: '179'
            }
        },
        {
            from: {
                mergeRequest: '177'
            },
            to: {
                server: 'proto'
            }
        },
        {
            from: {
                mergeRequest: '178'
            },
            to: {
                server: 'proto'
            }
        },
        {
            from: {
                mergeRequest: '179'
            },
            to: {
                server: 'latest'
            }
        },
    ]
}