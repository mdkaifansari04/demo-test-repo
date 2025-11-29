const { Octokit } = require("octokit");
const { config } = require("dotenv")

config();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const owner = "mdkaifansari04";
const repo = "demo-test-repo";
const path = "README.md";

const readFileContent = async () => {

    const res = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
        owner: owner,
        repo: repo,
        path: path,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    const content = Buffer.from(res.data.content, 'base64').toString('utf-8');

    console.log("sha", res);
    console.log("res", content);

}

const updateFileContent = async () => {
    const content = "### Updated Content\nThis is the updated content of the README file.";
    const encodedContent = Buffer.from(content).toString('base64');

    await octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
        owner: owner,
        repo: repo,
        path: path,
        message: 'chore: update README.md via script',
        sha: '5cfe6d6a954c7004988a45bed76ffcea665f3ae5',
        committer: {
            name: 'Md Kaif Ansari',
            email: 'mdkaifansari04@example.com'
        },
        content: encodedContent,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
}

readFileContent()
updateFileContent();        
