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

    const { tasks, servers, links } = appData;

    const isDeployed = useCallback(
        (taskId, serverId) => {
            const taskLinks = links.filter(link => link.from.task === taskId);

            if (taskLinks.length) {
                return taskLinks.find(link => link.to.server === serverId) !== undefined
            }
        },
        [tasks, servers, links]
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
                                <div>{server.link}</div>
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
