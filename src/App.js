import './App.css';
import { useState, useCallback } from 'react';
import { Icons } from './icons';
import { data } from './fixture/task';

const Statuses = {
    inProgress: 'In progress',
    testing: 'Testing',
};

function App() {
    const [appData, setAppData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);

    const { tasks, mergeRequests, servers, links } = appData;

    const isDeployed = useCallback(
        (taskId, serverId) => {
            const mrsForTask = links
                .filter(link => link.from?.task === taskId)
                .map(link => link.to.mergeRequest);

            const serverLinks = links
                .filter(link =>
                    mrsForTask.includes(link.from.mergeRequest) &&
                    mergeRequests.find(req => req.id === link.from.mergeRequest).status === 'merged' &&
                    link.to.server === serverId
                );

            return serverLinks.length === mrsForTask.length;
        },
        [links, mergeRequests]
    );

    const onEnterTask = useCallback((e) => setTaskId(e.target.value), []);

    const onSearchTask = useCallback(
        () => {
            setIsLoading(true);
            setTimeout(
                () => {
                    setAppData(data);
                    setIsLoading(false);
                    setCurrentTask(data.tasks.find(t => {
                        return t.id === taskId
                    }));
                },
                2000
            );
        },
        [taskId]
    );

    const getMergeRequest = useCallback(
        (serverId) => {
            const mrsForTask = links
                .filter(link => link.from?.task === currentTask.id)
                .map(link => link.to.mergeRequest);

            const result = mergeRequests
                .filter(req => mrsForTask.includes(req.id))
                .map(req => ({
                    ...req,
                    deployedOn: links.reduce(
                        (acc, link) => (link.from.mergeRequest === req.id) ?
                            [...acc, link.to.server] :
                            acc,
                        []
                    )
                }));

            return result.map(req => (
                <div key={req.id}>
                    {req.deployedOn.includes(serverId) && req.status === 'merged' ? <span>&#9989;</span> : <span>&#10060;</span>} <span >{req.link}</span> {Icons.link}
                </div>
            ))
        },
        [currentTask, tasks, links, mergeRequests]
    );

    console.log(taskId);

    return (
        <div className="app">
            <div className="search-container">
                <div className="search-container__title">Check the task deployment status</div>
                <div className="search-container__search">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7C15.2239 7 16.8772 7.68482 18.0962 8.90381C19.3152 10.1228 20 11.7761 20 13.5C20 15.11 19.41 16.59 18.44 17.73L18.71 18H19.5L24.5 23L23 24.5L18 19.5V18.71L17.73 18.44C16.59 19.41 15.11 20 13.5 20C11.7761 20 10.1228 19.3152 8.90381 18.0962C7.68482 16.8772 7 15.2239 7 13.5C7 11.7761 7.68482 10.1228 8.90381 8.90381C10.1228 7.68482 11.7761 7 13.5 7V7ZM13.5 9C11 9 9 11 9 13.5C9 16 11 18 13.5 18C16 18 18 16 18 13.5C18 11 16 9 13.5 9Z" fill="#78909C"/>
                    </svg>
                    <input
                        type="text"
                        className="search-container__input"
                        placeholder="Enter task number..."

                        onChange={onEnterTask}
                    />
                    <button className="search-container__btn" onClick={onSearchTask}>Search task</button>
                </div>
            </div>

            {isLoading && <div className="message message--loading">Please wait...</div>}

            {appData && !currentTask && !isLoading && (
                <div className="message message--error">No information found. Please check if task exists.</div>
            )}

            {currentTask && !isLoading && (
                <div >
                    <div className="search-results">
                        <div className="search-results__block">
                            <div className="c-card c-card--task">
                                <div className="c-card__header">
                                    <span className="c-card__icon">{Icons.ticket}</span> #{currentTask.id}
                                </div>
                                <header className="c-card__title">{currentTask.title}</header>
                                <div className="c-card__status c-card__status--in-progress">{Statuses[currentTask.status]}</div>
                            </div>
                        </div>
                        <div className="search-results__block">
                            {servers.map((server) => (
                                <div className="c-card c-card--merge" key={server.id}>
                                    <div className="c-card__header">
                                        <span className="c-card__icon">{Icons.server}</span> {server.name}
                                        <div className="c-card__deploy-status c-card__deploy-status--deployed">{isDeployed(currentTask.id, server.id) ? 'deployed' : 'not deployed'}</div>
                                    </div>
                                    <header className="c-card__title">{getMergeRequest(server.id)}</header>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
