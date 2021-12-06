import React, { useState } from 'react';
import classNames from 'classnames';
import { Icons } from './icons';

export const ServerCard = props => {
    const [isHidden, setIsHidden] = useState(true);
    const { server, isDeployed, getMergeRequest, currentTask } = props;

    const isTaskDeployed = isDeployed(currentTask.id, server.id);

    const deployedClasses = classNames({
        "c-card__deploy-status": true,
        "c-card__deploy-status--deployed": isTaskDeployed,
        "c-card__deploy-status--not-deployed": !isTaskDeployed,
    });

    return (
        <div className="c-card c-card--merge">
            <div className="c-card__header">
                <span className="c-card__icon">{Icons.server}</span> {server.name}
                <div className={deployedClasses}>{isTaskDeployed ? 'Deployed' : 'Not deployed'}</div>
                <span onClick={() => setIsHidden(!isHidden)}>{isHidden ? Icons.arrowRight : Icons.arrowDown}</span>
            </div>
            {!isHidden && <header className="c-card__title">{getMergeRequest(server.id)}</header>}
        </div>
    )
}