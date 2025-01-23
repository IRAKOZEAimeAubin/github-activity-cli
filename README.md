# GitHub User Activity CLI

## Project Note
This project was originally inspired by the [GitHub User Activity Challenge](https://roadmap.sh/projects/github-user-activity).

## Features
- Fetch recent GitHub activities for any public user by their username.
- Display a customizable number of activities using the --limit option.
- Provides a user-friendly command-line interface with helpful examples and documentation.

## Prerequisites
- Node.js installed on your system

## Installation
**Clone the repository**
```bash
git clone https://github.com/IRAKOZEAimeAubin/github-activity-cli

# Navigate to the project
cd github-activity-cli

# Installing dependencies
pnpm install

# Installing the project globally
npm i -g

# Or
npm install -g

# Altenatives to global installation
node index.js       # to run the project locally
npm run <script>    # add a script to package.json
npm link            # to install locally
```

## Usage
> **NOTE:**
> Use `npx github-activity <commands>` to run the diffent commands without installing the project

- **Fetch GitHub activities**
```bash
github-activity fetch <username> # replace <username> with the user's actual username
```

- **Limit the number of activities shown**
```bash
github-activity fetch <username> --limit <number>

# Or
github-activity fetch <username> -l <number>

# replace <username> with the user's actual username and number with the number of activities needed(default is 10)
```

- **Additional commands**
```bash
github-activity 

# Or
github-activity --help

# Or
github-activity -h

# The tool includes built-in help text for easy reference. Use the commands above for more details
```