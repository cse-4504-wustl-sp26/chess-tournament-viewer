# Chess Tournament Web Site Template

## How to use this template to host a tournament web site

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
   - Make the changes with specific values you want to use. The following fields are optional (remove them if not needed):
      - sponsorName
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

## Run Locally (for developers)

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
1. Run the app:
   `npm run dev`
