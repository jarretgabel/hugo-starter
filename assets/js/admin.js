// import { Octokit } from "octokit";

window.ESPN = window.ESPN || {}

class Admin {

	constructor () {
    // const octokit = new Octokit({
    //   auth: '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'
    // });
    // console.log(octokit)

    this.getData()
	}

  async getData() {
  //   await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
  //     owner: 'jarretgabel',
  //     repo: 'hugo-starter',
  //     headers: {
  //       'X-GitHub-Api-Version': '2022-11-28'
  //     }
  //   })
  }
}

window.onunload = () => {
  window.scrollTo(0, 0)
}

document.addEventListener('DOMContentLoaded', event => {
  window.ESPN.Admin = new Admin()
})
