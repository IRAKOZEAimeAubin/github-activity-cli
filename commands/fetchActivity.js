import { createSpinner } from "nanospinner";
import chalkColors from "../utils/chalkColors.js";
import fetchEventToSummary from "../utils/formatEventToSummary.js";

/**
 * Fetches and displays GitHub activities for a specified user
 * @param {string} username - The Github username to fetch activities for
 * @param {Object} options - Command options
 */
export default async function fetchActivities ( username, options ) {
    const spinner = createSpinner( 'Fetching GitHub activity...' ).start();

    try {
        const response = await fetch( `https://api.github.com/users/${ username }/events`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        } );

        if ( !response.ok ) {
            spinner.error( chalkColors.error( 'Failed to fetch activities' ) );
            if ( response.status === 404 ) {
                console.error( chalkColors.error( `User ${ username } not found` ) );
            } else if ( response.status === 403 ) {
                console.error( chalkColors.error( `Rate limit exceeded. Try again later or use an API token` ) );
            }
            process.exit( 1 );
        }

        const events = await response.json();

        spinner.success( { text: chalkColors.success( `Successfully fetched activities` ) } );

        const summaries = events
            .slice( 0, options.limit || 10 )
            .map( fetchEventToSummary )
            .filter( summary => summary !== null );

        console.log( chalkColors.info( '\nRecent Activities:' ) );
        summaries.forEach( summary => {
            console.log( chalkColors.summary( `• ${ summary }` ) );
        } );

    } catch ( error ) {
        spinner.error( chalkColors.error( `Error fetching user activity: ${ error.message }` ) );
        process.exit( 1 );
    }
}
