import React, { useState } from 'react';
import { Icons } from './icons';

export const ServerCard = props => {
    const [isHidden, setIsHidden] = useState(false);
    const { server, isDeployed, getMergeRequest, currentTask } = props;

    return (
        <div className="c-card c-card--merge" key={server.id}>
            <div className="c-card__header">
                <span className="c-card__icon">{Icons.server}</span> {server.name}
                <div className="c-card__deploy-status c-card__deploy-status--deployed">{isDeployed(currentTask.id, server.id) ? 'deployed' : 'not deployed'}</div>
                <span onClick={() => setIsHidden(!isHidden)}>{isHidden ? Icons.arrowRight : Icons.arrowDown}</span>
            </div>
            {!isHidden && <header className="c-card__title">{getMergeRequest(server.id)}</header>}
        </div>
    )
}