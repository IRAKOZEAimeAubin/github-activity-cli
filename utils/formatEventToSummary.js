import chalkColors from "./chalkColors.js";

/**
 * Formats a GitHub event into a readable summary string
 * @param {Object} event - The GitHub event object
 * @returns {string|null} Formatted summary string or null if event type is not supported 
 */
export default function fetchEventToSummary ( event ) {
    const repoName = event.repo.name;

    switch ( event.type ) {
        case 'PushEvent': {
            const commitCount = event.payload.commits?.length || 0;
            const commitWord = commitCount === 1 ? 'commit' : 'commits';
            return `Pushed ${ commitCount } ${ commitWord } to ${ chalkColors.yellow( repoName ) }`;
        }

        case 'PullRequestEvent': {
            const action = event.payload.action;
            const prNumber = event.payload.pull_request?.number;
            if ( action === 'opened' ) {
                return `Opened pull request #${ prNumber } in ${ chalkColors.yellow( repoName ) }`;
            } else if ( action === 'closed' ) {
                const merged = event.payload.pull_request?.merged;
                return merged
                    ? `Merged pull request #${ prNumber } in ${ chalkColors.yellow( repoName ) }`
                    : `Closed pull request #${ prNumber } in ${ chalkColors.yellow( repoName ) }`;
            }
            return null;
        }

        case 'IssuesEvent': {
            const action = event.payload.action;
            const issueNumber = event.payload.issue?.number;
            if ( action === 'opened' ) {
                return `Opened issue #${ issueNumber } in ${ chalkColors.yellow( repoName ) }`;
            } else if ( action === 'closed' ) {
                return `Closed issue #${ issueNumber } in ${ chalkColors.yellow( repoName ) }`;
            }
            return null;
        }

        case 'WatchEvent': {
            if ( event.payload.action === 'started' ) {
                return `Starred ${ chalkColors.yellow( repoName ) }`;
            }
            return null;
        }

        case 'ForkEvent': {
            return `Forked ${ chalkColors.yellow( repoName ) }`;
        }

        case 'CreateEvent': {
            const refType = event.payload.ref_type;
            const ref = event.payload.ref;
            if ( refType === 'repository' ) {
                return `Created repository ${ chalkColors.yellow( repoName ) }`;
            } else if ( refType === 'branch' ) {
                return `Created branch ${ chalkColors.yellow( ref ) } in ${ chalkColors.yellow( repoName ) }`;
            }
            return null;
        }

        default:
            return null;
    }
}
