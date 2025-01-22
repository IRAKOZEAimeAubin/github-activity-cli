#!/usr/bin/env node

import { Command } from "commander";
import fetchActivities from "./commands/fetchActivity.js";

const program = new Command();

program
    .name( 'github-activity' )
    .description( 'Fetch and display GitHub user activities.' )
    .version( '1.0.0' );

program
    .command( 'fetch <username>' )
    .description( 'Fetch recent GitHub activities for a user' )
    .option( '-l, --limit <number>', 'number of activities to display', '10' )
    .action( fetchActivities );

program.addHelpText( 'after', `
Examples:
  $ github-activity fetch octocat
  $ github-activity fetch octocat --limit 5
`);

program.parse();
