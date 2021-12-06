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
                .filter(link => mrsForTask.includes(link.from.mergeRequest) && link.to.server === serverId);

            return serverLinks.length === mrsForTask.length;
        },
        [links]
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
                    {req.deployedOn.includes(serverId) && req.status === 'merged' ? <span>&#9989;</span> : <span>&#10060;</span>} <span style={{ fontSize: 11 }}>{req.link}</span> {Icons.link}
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
                    <input
                        type="text"
                        className="search-container__input"
                        placeholder="Enter task number..."

                        onChange={onEnterTask}
                    />
                    <button className="search-container__btn" onClick={onSearchTask}>Search task</button>
                </div>
            </div>

            {isLoading && <div>Please wait</div>}

            {appData && !currentTask && !isLoading && (
                <div>No information found. Please check if task exists</div>
            )}

            {currentTask && !isLoading && (
                <>
                    <div className="search-results">
                        <div className="search-results__block">
                            <div>{Icons.ticket} #{currentTask.id}</div>
                            <h5>{currentTask.title}</h5>
                            <div>{Statuses[currentTask.status]}</div>
                        </div>
                        {servers.map((server) => (
                            <div className="search-results__block" key={server.id}>
                                <div>{Icons.server} {server.name}</div>
                                <div>{getMergeRequest(server.id)}</div>
                                <div>{isDeployed(currentTask.id, server.id) ? 'deployed' : 'not deployed'}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
