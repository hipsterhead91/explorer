interface IAvatarData {
  "name": string | null,
  "path": string | null,
  "sha": string | null,
  "size": number | null,
  "url": string | null,
  "html_url": string | null,
  "git_url": string | null,
  "download_url": string | null,
  "type": string | null,
  "_links": {
      "self": string | null,
      "git": string | null,
      "html": string | null,
  },
}

export default IAvatarData;