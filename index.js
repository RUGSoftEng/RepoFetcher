const GitHub = require("github-api");
const { exec } = require("child_process");

/* The organization name to fetch the repo's from */
const username = "RUGSoftEng";
/* What folder to fetch from the repo */
const folder = "docs";
/* Where we should store the downloaded content */
const destination = "./docs";
/* Prefix to use as a filter for the repo name */
const repoPrefix = (new Date()).getFullYear().toString();
/* What branch to fetch from */
const branch = "master";


const gh = new GitHub();
const org = gh.getOrganization(username);

org.getRepos(function (err, repos) {
	if (err) {
		console.log(err.response.data.message + "\n\n");
		throw err;
	}

	repos = repos.filter(repo => repo.name.substring(0, repoPrefix.length) === repoPrefix);
	console.log(`Found ${repos.length} repo's.`);
	//repos = [repos[repos.length - 1]];
	repos.forEach(function (repo) {
		const name = repo.name;
		console.log(name);
		repo = gh.getRepo(username, repo.name);

		repo.getContents(branch, null, false, function (err, content) {
			content = content.filter(c => c.name === folder);
			if (content.length > 0) {
				const cmd = `svn export --force https://github.com/${username}/${name}/trunk/${folder} ${destination}`;
				exec(cmd, function (error, stdout, stderr) {
					if (error || stderr)
						console.log(`An error occurred running:\n${cmd}\nOutput:\n${error}\n${stderr}`);
					else
						console.log(`Downloading ${name}:\n${stdout}`);
				});
			} else
				console.log(`Error: ${name} does not have a ${folder} folder.`);
		});

	});
});
