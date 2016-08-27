import * as esp from 'esp-js';
import React from 'react';
import EventConsts from '../eventConsts';
import EpicListItemView from './epicListItemView.jsx';
import StoryListItemView from './storyListItemView.jsx';
import classnames from 'classnames';
import { ViewBinder, SmartComponent } from 'esp-js-react';
import Workspace from '../models/workspace';
import StoryDetailsView from './storyDetailsView.jsx';

export default class WorkspaceView extends React.Component {
    static propTypes = {
        model: React.PropTypes.instanceOf(Workspace).isRequired,
        router: React.PropTypes.instanceOf(esp.Router).isRequired
    };

    render() {
        let workspace = this.props.model;
        let router = this.props.router;
        let epics = workspace.epics.map(epic => {
            return (<EpicListItemView key={epic.epicId} epic={epic} router={router} />);
        });
        let showAllClassName = classnames({'hide':!workspace.showAllStoriesButton});
        let displayedStories = workspace.displayedStories.map(story => {
            return (<StoryListItemView key={story.storyId} story={story} router={router}/>);
        });
        let storyDetailsView = workspace.selectedStory
            ? (<StoryDetailsView story={workspace.selectedStory} router={router} />)
            : null;
        return (
            <div className="workspace">
                <h1>Agile Workspace (esp-js-react demo)</h1>
                <input
                    type="button"
                    onClick={() => {this.props.router.publishEvent(workspace.modelId, EventConsts.ADD_EPIC, {})}}
                    value="Add Epic"/>
                <input
                    type="button"
                    className={showAllClassName}
                    onClick={() => {this.props.router.publishEvent(workspace.modelId, EventConsts.SHOW_ALL_STORIES, {})}}
                    value="Show All Stories"/>
                <div className="workspace__main-content">
                    <div className="workspace__epic-list">
                        <h3>Epics</h3>
                        {epics}
                    </div>
                    <div className="workspace__story-list">
                        <h3>Stories</h3>
                        {displayedStories}
                    </div>
                    <div className="workspace__story-details">
                        <h3>Story Details</h3>
                        {storyDetailsView}
                    </div>
                </div>
                <SmartComponent modelId={workspace.modal.modelId} />
            </div>
        );
    }
}