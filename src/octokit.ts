import { Octokit } from "@octokit/rest";

export class GithubClient {
  public octokit = new Octokit();

  public owner: string;
  public repo: string;
  public tag?: string;

  constructor(owner: string, repo: string) {
    this.owner = owner;
    this.repo = repo;
  }
  setTag = (tag: string) => {
    this.tag = tag;
  };

  listReleases = async () => {
    const res = await this.octokit.repos.listReleases({
      owner: this.owner,
      repo: this.repo,
    });
    return res.data;
  };

  getFileContent = async (path: string) => {
    const res = await this.octokit.rest.repos.getContent({
      owner: this.owner,
      repo: this.repo,
      path,
      ref: this.tag,
    });
    if (Array.isArray(res.data) || res.data.type !== "file") return;
    const text = Buffer.from(res.data.content, "base64").toString();
    return text;
  };

  renderMarkdown = async (text: string) => {
    const res = await this.octokit.rest.markdown.render({ text, mode: "gfm" });
    let html = res.data;
    // Repository内の相対パスを絶対パスに変換
    html = html.replaceAll(
      /".\/(.+?)"/g,
      `"https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.tag}/$1"`,
    );
    return html;
  };
}
