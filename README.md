# Chess Tournament Web Site Template

## How to use this template to host a tournament web site

### Create a GitHub account (if you don't have one)
If you don't have a GitHub account, create one. Go to github.com and sign up for a free account.

### Create a GitHub organization (optional, but recommended)
If you want to host your tournament web site under one organization, it's beneficial to create a GitHub organization. Otherwise, the web sites will be tied to your GitHub username.

Under "Organizations", create a new organizaton, with whatever name you want to give it.

### Deploy the web site before the tournament
1. Create a new repository from this template 
   - Click on "Use this template" button, on the top right
   - Select "Create a new repository"
   - Select "Include all branches" (this setting is off by default, you want to turn this on)
   - Under "General", select an "Owner" (your organization, or your individual account)
   - Give your new repository a name
   - Click on "Create Repository". 
1. When your repository gets created, navigate to "Settings" within your repository, to enable GitHub Pages
   - Select "Pages"
   - Under "Build and Deployment", in Source drop-down, select "GitHub Actions"
1. Update the tournament configuration with your tournament specific values. 
   - Navigate to "Code"
   - Select config/tournament-config.json
   - Select "Edit this file" (a pencil icon on the top right of the file)
   - Make the changes with specific values you want to use.
      - name - the name of the tournament
      - primaryColor - Hexadecimal value for the color of the side menu bar. 
      - secondaryColor - Hexadecimal value for the color used to highlight current move when walking through game moves on a chess board (if game moves are present in a pgn file)
      - sponsorName - The name of the tournament sponsor. This is an optional field (remove if there is no sponsor)
      - organizerName - The name of the tournament organizer
      - startDate - When does the tournament begin (date/time)
      - endDate - When does the tournament end (date/time)
      - location - Where does the tournament take place
      - type - What is the style of the tournament (round robin, swiss, etc)
      - prizes - What prizes are awarded for different places (doesn't have to be money, you can just specify 1st, 2nd, 3rd, or different categories of 1st, 2nd, 3rd)
      - rounds - list of file names that the tournament director will upload for each round of the tournament.
      - tournamentRepo - the name of the GitHub repository you created to host this tournament web site. This will be your organiationName/repoName (if you used organization) or your gitHubUserName/repoName (if you didn't use an organization)
      - logoUrl - the URL of a tournament logo you want to use
   - Click on "Commit changes"
   - Click on "Commit changes" again

After updating config/tournament-config.json, a deployment process will begin. You can monitor the deployment process by navigating to "Actions" in your repository. When the deployment processes completes, the associated action will have a green checkmark.

To find the URL for your web-site:
1. Navigating to "Code"
1. Scroll down to "Deployments" (on the right side of the page)
1. Click on "github-pages"

If you need to update the tournament information, go back and update the values in the config/tournament-config.json. After you commit the changes, the web-site will re-deploy.

### Update the data during the tournament
The pgn files for the tournament are stored in the 'data' branch of your repository in a data directory. To open the "data" branch, navigate to "Code". You will see a drop down menu that says "main". Open that menu and switch to the "data" branch. In that branch, open the data folder. Upload your pgn files here. When new files are added, you can refresh the web-site in your web browser and see the updated rounds.

The person who will be uploading pgn files to the data branch will need to have "write" access to the tournament repository. To add users, navigate to "Settings", select "Collaborators and Teams"->"Add people". Find the GitHub username of the people that you want to add. Select "Write" for access level.

## Run Locally (for developers)

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
1. Run the app:
   `npm run dev`
